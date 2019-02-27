/**
 * @file Lock.js
 * @author huangzongzhe, zhouminghui
 */

import React, {
    Component
} from 'react';
import {hashHistory} from 'react-router';
import {createHmac} from 'crypto';
import {
    Toast,
    List,
    InputItem,
    Picker
} from 'antd-mobile';

import style from './Lock.scss';
// Replace antd style
import './TimingLock.css';
import AelfButton from '../../../components/Button/Button';
import {getPageContainerStyle, moneyKeyboardWrapProps, getParam} from '../../../utils/utils';
import Password from '../../../components/Password/Password';
import NavNormal from '../../../components/NavNormal/NavNormal';

import * as InternalMessageTypes from '../../../messages/InternalMessageTypes';
import InternalMessage from '../../../messages/InternalMessage';

import {
    FormattedMessage
} from 'react-intl';

function getSeed(password) {
    if (password) {
        const hmac = createHmac('sha512', password);
        const seed = hmac.update(password).digest('hex');
        return seed;
    }
    Toast.fail('Please input password', 3, () => {}, false);
    return false;
}

export default class Lock extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            walletStatus: false,
            timingLockTimes: [0],
            agreement: false
        };
        const action = getParam('action', location.href);
        const isClear = action === 'clear_wallet';
        const isBackup = action === 'backup_wallet';
        const isTimingLock = action === 'timing_lock';
        this.isClear = isClear;
        this.isBackup = isBackup;
        this.isTimingLock = isTimingLock;
        this.timingLockData = [
            {
                label: 'never lock',
                value: 0
            },
            {
                label: '1 minutes',
                value: 60000
            },
            {
                label: '5 minutes',
                value: 300000
            },
            {
                label: '15 minutes',
                value: 900000
            },
            {
                label: '1 hour',
                value: 3600000
            },
            {
                label: '2 hours',
                value: 7200000
            },
            {
                label: '4 hours',
                value: 14400000
            }
        ];
    }


    setPassword(password) {
        console.log(password);
        this.setState({
            password
        });
    }

    turnToHomePage(walletStatus, callback) {
        const {
            nightElfEncrypto,
            nightElf
        } = walletStatus || {};

        if (nightElfEncrypto && nightElf && !this.isClear && !this.isBackup && !this.isTimingLock) {
            hashHistory.push('/home');
        }
        else {
            callback();
        }
    }

    checkWallet() {
        InternalMessage.payload(InternalMessageTypes.CHECK_WALLET).send().then(result => {
            this.turnToHomePage(result, () => {
                this.setState({
                    walletStatus: result
                });
            });
        });
    }

    componentDidMount() {
        this.checkWallet();
        this.checkTime();
    }

    componentWillUnmount() {
        this.setState = () => {};
    }

    createWallet() {
        const seed = getSeed(this.state.password);
        if (seed) {
            InternalMessage.payload(InternalMessageTypes.CREAT_WALLET, seed).send().then(result => {
                console.log(InternalMessageTypes.SET_SEED, seed, result);
                if (result && result.error === 0) {
                    Toast.success('Create Success', 1, () => {
                        this.setState({
                            agreement: false
                        });
                        hashHistory.push('/home');
                    });
                }
                else {
                    Toast.fail('Create Wallet Failed.', 3, () => {}, false);
                }
            });
        }
    }

    unlockWallet() {
        const seed = getSeed(this.state.password);
        if (seed) {
            InternalMessage.payload(InternalMessageTypes.UNLOCK_WALLET, seed).send().then(result => {
                console.log(InternalMessageTypes.UNLOCK_WALLET, seed, result);
                if (result && result.error === 0) {
                    hashHistory.push('/home');
                }
                else {
                    console.log(result.error);
                    Toast.fail('Unlock Wallet Failed.', 3, () => {}, false);
                }
            }).catch(error => {
                console.log('unlock error: ', error);
                Toast.fail('Unlock Wallet Failed.', 3, () => {}, false);
            });
        }
    }

    // lockWallet() {
    //     InternalMessage.payload(InternalMessageTypes.LOCK_WALLET).send().then(result => {
    //         console.log(InternalMessageTypes.LOCK_WALLET, result);
    //         location.reload();
    //     });
    // }

    clearWallet() {
        const seed = getSeed(this.state.password);
        if (seed) {
            InternalMessage.payload(InternalMessageTypes.CLEAR_WALLET, seed).send().then(result => {
                console.log(InternalMessageTypes.CLEAR_WALLET, seed, result);
                if (result.error) {
                    Toast.fail('Clear failed!');
                    this.clearFailed = true;
                    return;
                }
                location.href = '/popup.html';
            });
        }
    }

    backClick() {
        if (this.clearFailed) {
            this.checkWallet();
        }
        else if (this.backupFailed) {
            this.checkWallet();
        }
        else {
            hashHistory.push('/extensionManager');
        }
    }

    updateWallet() {
        const seed = getSeed(this.state.password);
        if (seed) {
            InternalMessage.payload(InternalMessageTypes.UPDATE_WALLET, seed).send().then(result => {
                console.log(InternalMessageTypes.UPDATE_WALLET, seed, result);
            });
        }
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >         Backup  wallet        >
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    backupWallet() {
        const seed = getSeed(this.state.password);
        if (seed) {
            InternalMessage.payload(InternalMessageTypes.BACKUP_WALLET, seed).send().then(result => {
                if (result && result.error === 0) {
                    hashHistory.push('/extensionManager');
                }
                else {
                    Toast.fail('Backup failed!');
                    InternalMessage.payload(InternalMessageTypes.LOCK_WALLET).send().then(result => {
                        this.backupFailed = true;
                    });
                    return;
                }
            }).catch(error => {
                Toast.fail('Backup Wallet Failed.', 3, () => {}, false);
            });
        }
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >      Load From Backupt        >
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    loadFromBackup() {
        hashHistory.push('/loadFromBackup');
    }


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >         Timing  lock          >
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    


    getLockTime(value) {
        console.log(value);
        this.setState({
            timingLockTimes: value
        });
    }

    getTimingLock() {
        const {timingLockTimes} = this.state;
        let time = timingLockTimes[0];
        InternalMessage.payload(InternalMessageTypes.GET_TIMING_LOCK, time).send().then(result => {
            console.log(InternalMessageTypes.GET_TIMING_LOCK, time, result);
            if (result.error !== 0) {
                Toast.fail('Timing Lock Setting Failed.', 3, () => {}, false);
            }
            else {
                Toast.success('Timing Lock Setting Success.', 3, () => {}, false);
            }
        });
    }

    checkTime() {
        InternalMessage.payload(InternalMessageTypes.CHECK_INACTIVITY_INTERVAL).send().then(result => {
            if (result) {
                this.setState({
                    timingLockTimes: [result.result.inactivityInterval]
                });
            }
        });
    }


    getAgreement() {
        const {password} = this.state;
        if (password) {
            this.setState({
                agreement: true
            });
        }
        else {
            Toast.fail('Please re-enter your password and confirm it.', 3, () => {}, false);
        }
    }

    // if there is no wallet in browser.storage [chrome.storage]
    // We need create a wallet and insert it into storage.
    renderCreate() {
        return <div>
            <Password
                setPassword={password => this.setPassword(password)}
            ></Password>
            <div className={style.createBottom}>
                <div className='aelf-blank12'></div>
                <AelfButton
                    text='Create Wallet'
                    aelficon='add_purple20'
                    onClick={() => this.getAgreement()}
                    style={{marginBottom: '10px'}}
                >
                </AelfButton>
                <AelfButton
                    text='Load From Backup'
                    aelficon='add_purple20'
                    onClick={() => this.loadFromBackup()}>
                </AelfButton>
            </div>
        </div>;
    }

    renderClear() {
        return <div>
            <div className="aelf-input-container aelf-dash">
                <List>
                    <div className="aelf-input-title">
                        <div><FormattedMessage id = 'aelf.Password' /></div>
                    </div>
                    <InputItem
                        value={this.state.password}
                        type="password"
                        placeholder=""
                        onChange={password => this.setPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>
            </div>
            <div className={style.bottom}>
                <div className='aelf-blank12'></div>
                <AelfButton
                    text='Clear Wallet'
                    aelficon='add_purple20'
                    onClick={() => this.clearWallet()}>
                </AelfButton>
            </div>
        </div>;
    }

    renderUnlock() {
        const {
            nightElfEncrypto,
            nightElf
        } = this.state.walletStatus || {};

        if (this.state.walletStatus && nightElfEncrypto && !nightElf) {
            return <div>
                <div className="aelf-input-container aelf-dash">
                    <List>
                        <div className="aelf-input-title">
                            <div><FormattedMessage id = 'aelf.Password' /></div>
                        </div>
                        <InputItem
                            value={this.state.password}
                            type="password"
                            placeholder=""
                            onChange={password => this.setPassword(password)}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        ></InputItem>
                    </List>
                </div>
                <div className={style.bottom}>
                    <div className='aelf-blank12'></div>
                    <AelfButton
                        text='Unlock Wallet'
                        aelficon='add_purple20'
                        onClick={() => this.unlockWallet()}>
                    </AelfButton>
                </div>
            </div>;
        }
        return <div></div>;
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >         Backup  wallet        >
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    renderBackup() {
        return <div>
            <div className="aelf-input-container aelf-dash">
                <List>
                    <div className="aelf-input-title">
                        <div><FormattedMessage id = 'aelf.Password' /></div>
                    </div>
                    <InputItem
                        value={this.state.password}
                        type="password"
                        placeholder=""
                        onChange={password => this.setPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>
            </div>
            <div className={style.bottom}>
                <div className='aelf-blank12'></div>
                <AelfButton
                    text='Backup NightELF'
                    aelficon='add_purple20'
                    onClick={() => this.backupWallet()}>
                </AelfButton>
            </div>
        </div>;
    }


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >      Timing  lock  render     >
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    renderTimingLock() {
        return <div>
            <div className="aelf-input-container aelf-dash">
                <List>
                    <Picker
                        data={this.timingLockData}
                        cols={1}
                        onChange={e => this.getLockTime(e)}
                        value={this.state.timingLockTimes}
                    >
                        <List.Item arrow='horizontal' >
                            <FormattedMessage
                                id='aelf.Timing Lock Settings'
                            />>
                        </List.Item>
                    </Picker>
                </List>
            </div>
            <div className={style.bottom}>
                <div className='aelf-blank12'></div>
                <AelfButton
                    text='Commit'
                    aelficon='add_purple20'
                    onClick={() => this.getTimingLock()}>
                </AelfButton>
            </div>
        </div>;
    }

    renderTestButtons() {
        return <div>
            <button onClick={() => this.checkWallet()}>checkWallet</button>
            {/* <button onClick={() => this.lockWallet()}>lockWallet</button> */}
            <button onClick={() => this.updateWallet()}>updateWallet</button>
            {/* <button onClick={() => this.clearWallet()}>clearWallet</button> */}
        </div>;
    }

    renderAgreement() {
        let titleText = 'Agreement';
        return <div>
                    <div className={style.top}>
                        <div className={style.blank}></div>
                        <p className={style.welcome}>{titleText}</p>
                        <p className={style.wallet}>Night ELF</p>
                        <p className={style.agreementContent}>
                            balabalabalabalabalabalabalabalabalabalabalabalabalabalabala
                        </p>
                        <p className={style.agreementContent}>
                            balabalabalabalabalabalabalabalabalabalabalabalabalabalabala
                        </p>
                        <p className={style.agreementContent}>
                            balabalabalabalabalabalabalabalabalabalabalabalabalabalabala
                        </p>
                        <div className={style.bottom}>
                            <div className='aelf-blank12'></div>
                            <AelfButton
                                text='Agree'
                                aelficon='add_purple20'
                                onClick={() => this.createWallet()}>
                            </AelfButton>
                            <div className='aelf-blank12'></div>
                            <AelfButton
                                text='Refuse'
                                aelficon='add_purple20'
                                onClick={() => this.setState({agreement: false})}>
                            </AelfButton>
                        </div>
                        {/* <p className={style.description}>offcial</p> */}
                    </div>
                </div>;
    }

    render() {
        const {agreement} = this.state;
        let titleText = 'Welcome';
        let buttonHTML = '';
        let navHTML = '';
        let bodyHTML = '';
        const walletStatus = this.state.walletStatus;
        const {
            nightElfEncrypto,
            nightElf
        } = walletStatus || {};
        if (walletStatus) {
            if (!nightElfEncrypto) {
                buttonHTML = this.renderCreate();
            }
            else {
                if (!nightElf) {
                    buttonHTML = this.renderUnlock();
                }
                // else if (!this.isClear) {
                //     hashHistory.push('/home');
                //     return <div></div>;
                // }
                else if (this.isClear) {
                    buttonHTML = this.renderClear();
                    titleText = 'Delete';
                    navHTML = <NavNormal
                            onLeftClick={() => this.backClick()}
                        ></NavNormal>;
                }
                else if (this.isBackup) {
                    buttonHTML = this.renderBackup();
                    titleText = 'Backup';
                    navHTML = <NavNormal
                            onLeftClick={() => this.backClick()}
                        ></NavNormal>;
                }
                else if (this.isTimingLock) {
                    buttonHTML = this.renderTimingLock();
                    titleText = 'Timing Lock';
                    navHTML = <NavNormal
                            onLeftClick={() => this.backClick()}
                        ></NavNormal>;
                }
            }
        }

        const containerStyle = getPageContainerStyle();
        if (agreement) {
            bodyHTML = this.renderAgreement();
        }
        else {
            bodyHTML = <div>
                            {navHTML}
                            <div className={style.top}>
                                <div className={style.blank}></div>
                                <p className={style.welcome}>{titleText}</p>
                                <p className={style.wallet}>Night ELF</p>
                                {/* <p className={style.description}>offcial</p> */}
                            </div>
                            {buttonHTML}
                            {/* {testHTML} */}
                        </div>;
        }

        // const testHTML = this.renderTestButtons();
        return (
            <div className={style.container} style={containerStyle}>
                {bodyHTML}
            </div>
        );
    }
}
