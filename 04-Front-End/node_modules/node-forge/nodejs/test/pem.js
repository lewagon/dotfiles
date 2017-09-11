(function() {

function Tests(ASSERT, PEM) {
  var _input = '-----BEGIN PRIVACY-ENHANCED MESSAGE-----\r\n' +
    'Proc-Type: 4,ENCRYPTED\r\n' +
    'Content-Domain: RFC822\r\n' +
    'DEK-Info: DES-CBC,F8143EDE5960C597\r\n' +
    'Originator-ID-Symmetric: linn@zendia.enet.dec.com,,\r\n' +
    'Recipient-ID-Symmetric: linn@zendia.enet.dec.com,ptf-kmc,3\r\n' +
    'Key-Info: DES-ECB,RSA-MD2,9FD3AAD2F2691B9A,\r\n' +
    ' B70665BB9BF7CBCDA60195DB94F727D3\r\n' +
    'Recipient-ID-Symmetric: pem-dev@tis.com,ptf-kmc,4\r\n' +
    'Key-Info: DES-ECB,RSA-MD2,161A3F75DC82EF26,\r\n' +
    ' E2EF532C65CBCFF79F83A2658132DB47\r\n' +
    '\r\n' +
    'LLrHB0eJzyhP+/fSStdW8okeEnv47jxe7SJ/iN72ohNcUk2jHEUSoH1nvNSIWL9M\r\n' +
    '8tEjmF/zxB+bATMtPjCUWbz8Lr9wloXIkjHUlBLpvXR0UrUzYbkNpk0agV2IzUpk\r\n' +
    'J6UiRRGcDSvzrsoK+oNvqu6z7Xs5Xfz5rDqUcMlK1Z6720dcBWGGsDLpTpSCnpot\r\n' +
    'dXd/H5LMDWnonNvPCwQUHg==\r\n' +
    '-----END PRIVACY-ENHANCED MESSAGE-----\r\n' +
    '-----BEGIN PRIVACY-ENHANCED MESSAGE-----\r\n' +
    'Proc-Type: 4,ENCRYPTED\r\n' +
    'Content-Domain: RFC822\r\n' +
    'DEK-Info: DES-CBC,BFF968AA74691AC1\r\n' +
    'Originator-Certificate:\r\n' +
    ' MIIBlTCCAScCAWUwDQYJKoZIhvcNAQECBQAwUTELMAkGA1UEBhMCVVMxIDAeBgNV\r\n' +
    ' BAoTF1JTQSBEYXRhIFNlY3VyaXR5LCBJbmMuMQ8wDQYDVQQLEwZCZXRhIDExDzAN\r\n' +
    ' BgNVBAsTBk5PVEFSWTAeFw05MTA5MDQxODM4MTdaFw05MzA5MDMxODM4MTZaMEUx\r\n' +
    ' CzAJBgNVBAYTAlVTMSAwHgYDVQQKExdSU0EgRGF0YSBTZWN1cml0eSwgSW5jLjEU\r\n' +
    ' MBIGA1UEAxMLVGVzdCBVc2VyIDEwWTAKBgRVCAEBAgICAANLADBIAkEAwHZHl7i+\r\n' +
    ' yJcqDtjJCowzTdBJrdAiLAnSC+CnnjOJELyuQiBgkGrgIh3j8/x0fM+YrsyF1u3F\r\n' +
    ' LZPVtzlndhYFJQIDAQABMA0GCSqGSIb3DQEBAgUAA1kACKr0PqphJYw1j+YPtcIq\r\n' +
    ' iWlFPuN5jJ79Khfg7ASFxskYkEMjRNZV/HZDZQEhtVaU7Jxfzs2wfX5byMp2X3U/\r\n' +
    ' 5XUXGx7qusDgHQGs7Jk9W8CW1fuSWUgN4w==\r\n' +
    'Key-Info: RSA,\r\n' +
    ' I3rRIGXUGWAF8js5wCzRTkdhO34PTHdRZY9Tuvm03M+NM7fx6qc5udixps2Lng0+\r\n' +
    ' wGrtiUm/ovtKdinz6ZQ/aQ==\r\n' +
    'Issuer-Certificate:\r\n' +
    ' MIIB3DCCAUgCAQowDQYJKoZIhvcNAQECBQAwTzELMAkGA1UEBhMCVVMxIDAeBgNV\r\n' +
    ' BAoTF1JTQSBEYXRhIFNlY3VyaXR5LCBJbmMuMQ8wDQYDVQQLEwZCZXRhIDExDTAL\r\n' +
    ' BgNVBAsTBFRMQ0EwHhcNOTEwOTAxMDgwMDAwWhcNOTIwOTAxMDc1OTU5WjBRMQsw\r\n' +
    ' CQYDVQQGEwJVUzEgMB4GA1UEChMXUlNBIERhdGEgU2VjdXJpdHksIEluYy4xDzAN\r\n' +
    ' BgNVBAsTBkJldGEgMTEPMA0GA1UECxMGTk9UQVJZMHAwCgYEVQgBAQICArwDYgAw\r\n' +
    ' XwJYCsnp6lQCxYykNlODwutF/jMJ3kL+3PjYyHOwk+/9rLg6X65B/LD4bJHtO5XW\r\n' +
    ' cqAz/7R7XhjYCm0PcqbdzoACZtIlETrKrcJiDYoP+DkZ8k1gCk7hQHpbIwIDAQAB\r\n' +
    ' MA0GCSqGSIb3DQEBAgUAA38AAICPv4f9Gx/tY4+p+4DB7MV+tKZnvBoy8zgoMGOx\r\n' +
    ' dD2jMZ/3HsyWKWgSF0eH/AJB3qr9zosG47pyMnTf3aSy2nBO7CMxpUWRBcXUpE+x\r\n' +
    ' EREZd9++32ofGBIXaialnOgVUn0OzSYgugiQ077nJLDUj0hQehCizEs5wUJ35a5h\r\n' +
    'MIC-Info: RSA-MD5,RSA,\r\n' +
    ' UdFJR8u/TIGhfH65ieewe2lOW4tooa3vZCvVNGBZirf/7nrgzWDABz8w9NsXSexv\r\n' +
    ' AjRFbHoNPzBuxwmOAFeA0HJszL4yBvhG\r\n' +
    'Recipient-ID-Asymmetric:\r\n' +
    ' MFExCzAJBgNVBAYTAlVTMSAwHgYDVQQKExdSU0EgRGF0YSBTZWN1cml0eSwgSW5j\r\n' +
    ' LjEPMA0GA1UECxMGQmV0YSAxMQ8wDQYDVQQLEwZOT1RBUlk=,66\r\n' +
    'Key-Info: RSA,\r\n' +
    ' O6BS1ww9CTyHPtS3bMLD+L0hejdvX6Qv1HK2ds2sQPEaXhX8EhvVphHYTjwekdWv\r\n' +
    ' 7x0Z3Jx2vTAhOYHMcqqCjA==\r\n' +
    '\r\n' +
    'qeWlj/YJ2Uf5ng9yznPbtD0mYloSwIuV9FRYx+gzY+8iXd/NQrXHfi6/MhPfPF3d\r\n' +
    'jIqCJAxvld2xgqQimUzoS1a4r7kQQ5c/Iua4LqKeq3ciFzEv/MbZhA==\r\n' +
    '-----END PRIVACY-ENHANCED MESSAGE-----\r\n' +
    '-----BEGIN RSA PRIVATE KEY-----\r\n' +
    'MIIBPAIBAAJBALjXU+IdHkSkdBscgXf+EBoa55ruAIsU50uDFjFBkp+rWFt5AOGF\r\n' +
    '9xL1/HNIby5M64BCw021nJTZKEOmXKdmzYsCAwEAAQJBAApyYRNOgf9vLAC8Q7T8\r\n' +
    'bvyKuLxQ50b1D319EywFgLv1Yn0s/F9F+Rew6c04Q0pIqmuOGUM7z94ul/y5OlNJ\r\n' +
    '2cECIQDveEW1ib2+787l7Y0tMeDzf/HQl4MAWdcxXWOeUFK+7QIhAMWZsukutEn9\r\n' +
    '9/yqFMt8bL/dclfNn1IAgUL4+dMJ7zdXAiEAhaxGhVKxN28XuCOFhe/s2R/XdQ/O\r\n' +
    'UZjU1bqCzDGcLvUCIGYmxu71Tg7SVFkyM/3eHPozKOFrU2m5CRnuTHhlMl2RAiEA\r\n' +
    '0vhM5TEmmNWz0anPVabqDj9TA0z5MsDJQcn5NmO9xnw=\r\n' +
    '-----END RSA PRIVATE KEY-----\r\n';

  describe('pem', function() {
    it('should decode and re-encode PEM messages', function() {
      var msgs = PEM.decode(_input);

      var output = '';
      for(var i = 0; i < msgs.length; ++i) {
        output += PEM.encode(msgs[i]);
      }

      ASSERT.equal(output, _input);
    });
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/pem'
  ], function(PEM) {
    Tests(
      // Global provided by test harness
      ASSERT,
      PEM()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/pem')());
}

})();
