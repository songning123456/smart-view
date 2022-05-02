import CryptoJS from 'crypto-js';

let crypto = {};

/**
 * AES加密方法
 * @param srcContent 要加密的字符串
 * @param secretKey 密钥，必须由16位字符组成
 * @returns {string} 加密结果
 */
crypto.aesEncrypt = (srcContent, secretKey) => {
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(srcContent), CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

/**
 * AES解密方法
 * @param encryptContent 要解密的字符串
 * @param secretKey 密钥，必须由16位字符组成
 * @returns {string} 加密结果
 */
crypto.aesDecrypt = (encryptContent, secretKey) => {
    let decrypt = CryptoJS.AES.decrypt(encryptContent, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export default crypto;
