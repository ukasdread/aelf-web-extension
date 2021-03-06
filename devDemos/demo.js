# 1.CONNECT_AELF_CHAIN
nightElf.action.send({
    appName: 'hzzTest',
    method: 'CONNECT_AELF_CHAIN',
    hostname: 'aelf.io', // TODO: 这个需要content.js 主动获取
    payload: {
        httpProvider: 'http://localhost:1234/chain'
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 2.CALL_AELF_CHAIN
nightElf.action.send({
    appName: 'hzzTest',
    method: 'CALL_AELF_CHAIN',
    chainId: 'AELF',
    hostname: 'aelf.io',
    payload: {
        method: 'getTxResult',
        params: ['5feb4d3175b4144e54f5f4d0a12b19559633a2aede0e87dc42322efe1aac12c9']
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

// SET_PERMISSION
// {
//     appName: 'hzz Test',
//     domain: 'aelf.io',
//     address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK',
//     contracts: [{
//         chainId: 'AELF',
//         contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx',
//         contractName: 'token',
//         description: 'token contract'
//     }]
// }

# 3.OPEN_PROMPT -> other method
// TODO: param check
nightElf.action.send({
    appName: 'hzzTest',
    method: 'OPEN_PROMPT',
    chainId: 'AELF',
    hostname: 'aelf.io',
    payload: {
        method: 'SET_PERMISSION',
        // 在中间层会补齐
        // appName: 'hzzTest',
        // method 使用payload的
        // chainId: 'AELF',
        // hostname: 'aelf.io',
        payload: {
            // appName: message.appName,
            // domain: message.hostname
            address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK',
            contracts: [{
                chainId: 'AELF',
                contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx',
                contractName: 'token',
                description: 'token contract'
            }, {
                chainId: 'AELF TEST',
                contractAddress: 'TEST contractAddress',
                contractName: 'TEST contractName',
                description: 'contract description'
            }]
        }
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 4.OPEN_PROMPT
nightElf.action.send({
    appName: 'hzzTest',
    method: 'OPEN_PROMPT',
    chainId: 'AELF',
    hostname: 'aelf.io',
    route: '#/prompt',
    payload: {
        message: 'xxxxxxx'
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 5.INIT_AELF_CONTRACT
nightElf.action.send({
    appName: 'hzzTest',
    method: 'INIT_AELF_CONTRACT',
    // hostname: 'aelf.io',
    chainId: 'AELF',
    payload: {
        address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK',
        contractName: 'token',
        contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx'
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 5.INIT_AELF_CONTRACT Wrong
nightElf.action.send({
    appName: 'hzzTest', // do not
    method: 'INIT_AELF_CONTRACT',
    // hostname: 'aelf.io',
    chainId: 'AELF11',
    payload: {
        address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK',
        contractName: 'token',
        contractAddress: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx'
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 6.CALL_AELF_CONTRACT
nightElf.action.send({
    appName: 'hzzTest',
    method: 'CALL_AELF_CONTRACT',
    hostname: 'aelf.io',
    chainId: 'AELF',
    payload: {
        contractName: 'token',
        method: 'BalanceOf',
        params: ['ELF_2rAp1aiE3VMwR6SEx5dJYR2Sh8NHsJ2euJoxNaT7uF7XfeB']
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 6.CALL_AELF_CONTRACT Wrong
nightElf.action.send({
    appName: 'hzzTest',
    method: 'CALL_AELF_CONTRACT',
    hostname: 'aelf.io',
    chainId: 'AELF',
    payload: {
        contractName: 'token',
        method: 'BalanceOf1111',
        params: ['ELF_2rAp1aiE3VMwR6SEx5dJYR2Sh8NHsJ2euJoxNaT7uF7XfeB']
    }
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 7.CHECK_PERMISSION Wrong
nightElf.action.send({
    appName: 'hzzTest',
    method: 'CHECK_PERMISSION',
    address: 'ELF_4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK'
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})

# 8.GET_ADDRESS
nightElf.action.send({
    appName: 'hzzTest',
    method: 'GET_ADDRESS'
}).then(result => {
    console.log('>>>>>>>>>>>>>>>>>>>', result);
})