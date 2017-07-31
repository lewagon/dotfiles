(function() {

function Tests(ASSERT, PKI, MD, UTIL) {
  var _pem = {
    privateKey: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
      'MIICXQIBAAKBgQDL0EugUiNGMWscLAVM0VoMdhDZEJOqdsUMpx9U0YZI7szokJqQ\r\n' +
      'NIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMGTkP3VF29vXBo+dLq5e+8VyAy\r\n' +
      'Q3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGtvnM+z0MYDdKo80efzwIDAQAB\r\n' +
      'AoGAIzkGONi5G+JifmXlLJdplom486p3upf4Ce2/7mqfaG9MnkyPSairKD/JXvfh\r\n' +
      'NNWkkN8DKKDKBcVVElPgORYT0qwrWc7ueLBMUCbRXb1ZyfEulimG0R3kjUh7NYau\r\n' +
      'DaIkVgfykXGSQMZx8FoaT6L080zd+0emKDDYRrb+/kgJNJECQQDoUZoiC2K/DWNY\r\n' +
      'h3/ppZ0ane2y4SBmJUHJVMPQ2CEgxsrJTxet668ckNCKaOP/3VFPoWC41f17DvKq\r\n' +
      'noYINNntAkEA4JbZBZBVUrQFhHlrpXT4jzqtO2RlKZzEq8qmFZfEErxOT1WMyyCi\r\n' +
      'lAQ5gUKardo1Kf0omC8Xq/uO9ZYdED55KwJBALs6cJ65UFaq4oLJiQPzLd7yokuE\r\n' +
      'dcj8g71PLBTW6jPxIiMFNA89nz3FU9wIVp+xbMNhSoMMKqIPVPC+m0Rn260CQQDA\r\n' +
      'I83fWK/mZWUjBM33a68KumRiH238v8XyQxj7+C8i6D8G2GXvkigFAehAkb7LZZd+\r\n' +
      'KLuGFyPlWv3fVWHf99KpAkBQFKk3MRMl6IGJZUEFQe4l5whm8LkGU4acSqv9B3xt\r\n' +
      'qROkCrsFrMPqjuuzEmyHoQZ64r2PLJg7FOuyhBnQUOt4\r\n' +
      '-----END RSA PRIVATE KEY-----\r\n',
    publicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL0EugUiNGMWscLAVM0VoMdhDZ\r\n' +
      'EJOqdsUMpx9U0YZI7szokJqQNIwokiQ6EonNnWSMlIvy46AhnlRYn+ezeTeU7eMG\r\n' +
      'TkP3VF29vXBo+dLq5e+8VyAyQ3FzM1wI4ts4hRACF8w6mqygXQ7i/SDu8/rXqRGt\r\n' +
      'vnM+z0MYDdKo80efzwIDAQAB\r\n' +
      '-----END PUBLIC KEY-----\r\n',
    certificate: '-----BEGIN CERTIFICATE-----\r\n' +
      'MIIDIjCCAougAwIBAgIJANE2aHSbwpaRMA0GCSqGSIb3DQEBBQUAMGoxCzAJBgNV\r\n' +
      'BAYTAlVTMREwDwYDVQQIEwhWaXJnaW5pYTETMBEGA1UEBxMKQmxhY2tzYnVyZzEN\r\n' +
      'MAsGA1UEChMEVGVzdDENMAsGA1UECxMEVGVzdDEVMBMGA1UEAxMMbXlzZXJ2ZXIu\r\n' +
      'Y29tMB4XDTEwMDYxOTE3MzYyOFoXDTExMDYxOTE3MzYyOFowajELMAkGA1UEBhMC\r\n' +
      'VVMxETAPBgNVBAgTCFZpcmdpbmlhMRMwEQYDVQQHEwpCbGFja3NidXJnMQ0wCwYD\r\n' +
      'VQQKEwRUZXN0MQ0wCwYDVQQLEwRUZXN0MRUwEwYDVQQDEwxteXNlcnZlci5jb20w\r\n' +
      'gZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMvQS6BSI0YxaxwsBUzRWgx2ENkQ\r\n' +
      'k6p2xQynH1TRhkjuzOiQmpA0jCiSJDoSic2dZIyUi/LjoCGeVFif57N5N5Tt4wZO\r\n' +
      'Q/dUXb29cGj50url77xXIDJDcXMzXAji2ziFEAIXzDqarKBdDuL9IO7z+tepEa2+\r\n' +
      'cz7PQxgN0qjzR5/PAgMBAAGjgc8wgcwwHQYDVR0OBBYEFPV1Y+DHXW6bA/r9sv1y\r\n' +
      'NJ8jAwMAMIGcBgNVHSMEgZQwgZGAFPV1Y+DHXW6bA/r9sv1yNJ8jAwMAoW6kbDBq\r\n' +
      'MQswCQYDVQQGEwJVUzERMA8GA1UECBMIVmlyZ2luaWExEzARBgNVBAcTCkJsYWNr\r\n' +
      'c2J1cmcxDTALBgNVBAoTBFRlc3QxDTALBgNVBAsTBFRlc3QxFTATBgNVBAMTDG15\r\n' +
      'c2VydmVyLmNvbYIJANE2aHSbwpaRMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEF\r\n' +
      'BQADgYEARdH2KOlJWTC1CS2y/PAvg4uiM31PXMC1hqSdJlnLM1MY4hRfuf9VyTeX\r\n' +
      'Y6FdybcyDLSxKn9id+g9229ci9/s9PI+QmD5vXd8yZyScLc2JkYB4GC6+9D1+/+x\r\n' +
      's2hzMxuK6kzZlP+0l9LGcraMQPGRydjCARZZm4Uegln9rh85XFQ=\r\n' +
      '-----END CERTIFICATE-----\r\n'
  };

  describe('x509', function() {
    it('should convert certificate to/from PEM', function() {
      var certificate = PKI.certificateFromPem(_pem.certificate);
      ASSERT.equal(PKI.certificateToPem(certificate), _pem.certificate);
    });

    it('should verify self-signed certificate', function() {
      var certificate = PKI.certificateFromPem(_pem.certificate);
      ASSERT.ok(certificate.verify(certificate));
    });

    it('should generate and verify a self-signed certificate', function() {
      var keys = {
        privateKey: PKI.privateKeyFromPem(_pem.privateKey),
        publicKey: PKI.publicKeyFromPem(_pem.publicKey)
      };
      var attrs = [{
        name: 'commonName',
        value: 'example.org'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var cert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: attrs,
        issuer: attrs,
        isCA: true
      });

      var pem = PKI.certificateToPem(cert);
      cert = PKI.certificateFromPem(pem);

      // verify certificate chain
      var caStore = PKI.createCaStore();
      caStore.addCertificate(cert);
      PKI.verifyCertificateChain(caStore, [cert], function(vfd, depth, chain) {
        ASSERT.equal(vfd, true);
        ASSERT.ok(cert.verifySubjectKeyIdentifier());
        return true;
      });
    });

    it('should generate and fail to verify a self-signed certificate that is not in the CA store', function() {
      var keys = {
        privateKey: PKI.privateKeyFromPem(_pem.privateKey),
        publicKey: PKI.publicKeyFromPem(_pem.publicKey)
      };
      var attrs = [{
        name: 'commonName',
        value: 'example.org'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var cert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: attrs,
        issuer: attrs,
        isCA: true
      });

      var pem = PKI.certificateToPem(cert);
      cert = PKI.certificateFromPem(pem);

      // verify certificate chain
      var caStore = PKI.createCaStore();
      PKI.verifyCertificateChain(caStore, [cert], function(vfd, depth, chain) {
        ASSERT.equal(vfd, PKI.certificateError.unknown_ca);
        return true;
      });
    });

    it('should verify certificate chain ending with intermediate certificate from CA store', function() {
      var keys = {
        privateKey: PKI.privateKeyFromPem(_pem.privateKey),
        publicKey: PKI.publicKeyFromPem(_pem.publicKey)
      };
      var entity = [{
        name: 'commonName',
        value: 'example.org'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var intermediate = [{
        name: 'commonName',
        value: 'intermediate'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var root = [{
        name: 'commonName',
        value: 'root'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];

      var intermediateCert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: intermediate,
        issuer: root,
        isCA: true
      });

      var entityCert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: entity,
        issuer: intermediate,
        isCA: false
      });

      // verify certificate chain
      var caStore = PKI.createCaStore();
      caStore.addCertificate(intermediateCert);
      var chain = [entityCert, intermediateCert];
      PKI.verifyCertificateChain(caStore, chain, function(vfd, depth, chain) {
        ASSERT.equal(vfd, true);
        return true;
      });
    });

    it('should fail to verify certificate chain ending with non-CA intermediate certificate from CA store', function() {
      var keys = {
        privateKey: PKI.privateKeyFromPem(_pem.privateKey),
        publicKey: PKI.publicKeyFromPem(_pem.publicKey)
      };
      var entity = [{
        name: 'commonName',
        value: 'example.org'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var intermediate = [{
        name: 'commonName',
        value: 'intermediate'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];
      var root = [{
        name: 'commonName',
        value: 'root'
      }, {
        name: 'countryName',
        value: 'US'
      }, {
        shortName: 'ST',
        value: 'Virginia'
      }, {
        name: 'localityName',
        value: 'Blacksburg'
      }, {
        name: 'organizationName',
        value: 'Test'
      }, {
        shortName: 'OU',
        value: 'Test'
      }];

      var intermediateCert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: intermediate,
        issuer: root,
        isCA: false
      });

      var entityCert = createCertificate({
        publicKey: keys.publicKey,
        signingKey: keys.privateKey,
        serialNumber: '01',
        subject: entity,
        issuer: intermediate,
        isCA: false
      });

      // verify certificate chain
      var caStore = PKI.createCaStore();
      caStore.addCertificate(intermediateCert);
      var chain = [entityCert, intermediateCert];
      PKI.verifyCertificateChain(caStore, chain, function(vfd, depth, chain) {
        if(depth === 0) {
          ASSERT.equal(vfd, true);
        } else {
          ASSERT.equal(vfd, PKI.certificateError.bad_certificate);
        }
        return true;
      });
    });

    it('should verify certificate with sha1WithRSAEncryption signature', function() {
      var certPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIDZDCCAs2gAwIBAgIKQ8fjjgAAAABh3jANBgkqhkiG9w0BAQUFADBGMQswCQYD\r\n' +
        'VQQGEwJVUzETMBEGA1UEChMKR29vZ2xlIEluYzEiMCAGA1UEAxMZR29vZ2xlIElu\r\n' +
        'dGVybmV0IEF1dGhvcml0eTAeFw0xMjA2MjcxMzU5MTZaFw0xMzA2MDcxOTQzMjda\r\n' +
        'MGcxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1N\r\n' +
        'b3VudGFpbiBWaWV3MRMwEQYDVQQKEwpHb29nbGUgSW5jMRYwFAYDVQQDEw13d3cu\r\n' +
        'Z29vZ2xlLmRlMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw2Hw3vNy5QMSd\r\n' +
        '0/iMCS8lwZk9lnEk2NmrJt6vGJfRGlBprtHp5lpMFMoi+x8m8EwGVxXHGp7hLyN/\r\n' +
        'gXuUjL7/DY9fxxx9l77D+sDZz7jfUfWmhS03Ra1FbT6myF8miVZFChJ8XgWzioJY\r\n' +
        'gyNdRUC9149yrXdPWrSmSVaT0+tUCwIDAQABo4IBNjCCATIwHQYDVR0lBBYwFAYI\r\n' +
        'KwYBBQUHAwEGCCsGAQUFBwMCMB0GA1UdDgQWBBTiQGhrO3785rMPIKZ/zQEl5RyS\r\n' +
        '0TAfBgNVHSMEGDAWgBS/wDDr9UMRPme6npH7/Gra42sSJDBbBgNVHR8EVDBSMFCg\r\n' +
        'TqBMhkpodHRwOi8vd3d3LmdzdGF0aWMuY29tL0dvb2dsZUludGVybmV0QXV0aG9y\r\n' +
        'aXR5L0dvb2dsZUludGVybmV0QXV0aG9yaXR5LmNybDBmBggrBgEFBQcBAQRaMFgw\r\n' +
        'VgYIKwYBBQUHMAKGSmh0dHA6Ly93d3cuZ3N0YXRpYy5jb20vR29vZ2xlSW50ZXJu\r\n' +
        'ZXRBdXRob3JpdHkvR29vZ2xlSW50ZXJuZXRBdXRob3JpdHkuY3J0MAwGA1UdEwEB\r\n' +
        '/wQCMAAwDQYJKoZIhvcNAQEFBQADgYEAVJ0qt/MBvHEPuWHeH51756qy+lBNygLA\r\n' +
        'Xp5Gq+xHUTOzRty61BR05zv142hYAGWvpvnEOJ/DI7V3QlXK8a6dQ+du97obQJJx\r\n' +
        '7ekqtfxVzmlSb23halYSoXmWgP8Tq0VUDsgsSLE7fS8JuO1soXUVKj1/6w189HL6\r\n' +
        'LsngXwZSuL0=\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var issuerPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIICsDCCAhmgAwIBAgIDC2dxMA0GCSqGSIb3DQEBBQUAME4xCzAJBgNVBAYTAlVT\r\n' +
        'MRAwDgYDVQQKEwdFcXVpZmF4MS0wKwYDVQQLEyRFcXVpZmF4IFNlY3VyZSBDZXJ0\r\n' +
        'aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDkwNjA4MjA0MzI3WhcNMTMwNjA3MTk0MzI3\r\n' +
        'WjBGMQswCQYDVQQGEwJVUzETMBEGA1UEChMKR29vZ2xlIEluYzEiMCAGA1UEAxMZ\r\n' +
        'R29vZ2xlIEludGVybmV0IEF1dGhvcml0eTCBnzANBgkqhkiG9w0BAQEFAAOBjQAw\r\n' +
        'gYkCgYEAye23pIucV+eEPkB9hPSP0XFjU5nneXQUr0SZMyCSjXvlKAy6rWxJfoNf\r\n' +
        'NFlOCnowzdDXxFdF7dWq1nMmzq0yE7jXDx07393cCDaob1FEm8rWIFJztyaHNWrb\r\n' +
        'qeXUWaUr/GcZOfqTGBhs3t0lig4zFEfC7wFQeeT9adGnwKziV28CAwEAAaOBozCB\r\n' +
        'oDAOBgNVHQ8BAf8EBAMCAQYwHQYDVR0OBBYEFL/AMOv1QxE+Z7qekfv8atrjaxIk\r\n' +
        'MB8GA1UdIwQYMBaAFEjmaPkr0rKV10fYIyAQTzOYkJ/UMBIGA1UdEwEB/wQIMAYB\r\n' +
        'Af8CAQAwOgYDVR0fBDMwMTAvoC2gK4YpaHR0cDovL2NybC5nZW90cnVzdC5jb20v\r\n' +
        'Y3Jscy9zZWN1cmVjYS5jcmwwDQYJKoZIhvcNAQEFBQADgYEAuIojxkiWsRF8YHde\r\n' +
        'BZqrocb6ghwYB8TrgbCoZutJqOkM0ymt9e8kTP3kS8p/XmOrmSfLnzYhLLkQYGfN\r\n' +
        '0rTw8Ktx5YtaiScRhKqOv5nwnQkhClIZmloJ0pC3+gz4fniisIWvXEyZ2VxVKfml\r\n' +
        'UUIuOss4jHg7y/j7lYe8vJD5UDI=\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var cert = PKI.certificateFromPem(certPem, true);
      var issuer = PKI.certificateFromPem(issuerPem);
      ASSERT.ok(issuer.verify(cert));
    });

    it('should verify certificate with sha256WithRSAEncryption signature', function() {
      var certPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIDuzCCAqOgAwIBAgIEO5vZjDANBgkqhkiG9w0BAQsFADBGMQswCQYDVQQGEwJE\r\n' +
        'RTEPMA0GA1UEChMGRWxzdGVyMQswCQYDVQQLEwJDQTEZMBcGA1UEAxMQRWxzdGVy\r\n' +
        'U29mdFRlc3RDQTAeFw0xMDA5MTUwNTM4MjRaFw0xMzA5MTUwNTM4MjRaMCsxFDAS\r\n' +
        'BgNVBAUTCzEwMDIzMTQ5OTRDMRMwEQYDVQQDEwoxMDAyMzE0OTk0MIGfMA0GCSqG\r\n' +
        'SIb3DQEBAQUAA4GNADCBiQKBgQCLPqjbwjsugzw6+qwwm/pdzDwk7ASIsBYJ17GT\r\n' +
        'qyT0zCnYmdDDGWsYc+xxFVVIi8xBt6Mlq8Rwj+02UJhY9qm6zRA9MqFZC3ih+HoW\r\n' +
        'xq7H8N2d10N0rX6h5PSjkF5fU5ugncZmppsRGJ9DNXgwjpf/CsH2rqThUzK4xfrq\r\n' +
        'jpDS/wIDAQABo4IBTjCCAUowDgYDVR0PAQH/BAQDAgUgMAwGA1UdEwEB/wQCMAAw\r\n' +
        'HQYDVR0OBBYEFF1h7H37OQivS57GD8+nK6VsgMPTMIGXBgNVHR8EgY8wgYwwgYmg\r\n' +
        'gYaggYOGgYBsZGFwOi8vMTkyLjE2OC42LjI0OjM4OS9sJTNkQ0ElMjBaZXJ0aWZp\r\n' +
        'a2F0ZSxvdSUzZENBLGNuJTNkRWxzdGVyU29mdFRlc3RDQSxkYyUzZHdpZXNlbCxk\r\n' +
        'YyUzZGVsc3RlcixkYyUzZGRlPz9iYXNlPyhvYmplY3RDbGFzcz0qKTBxBgNVHSME\r\n' +
        'ajBogBRBILMYmlZu//pj3wjDe2UPkq7jk6FKpEgwRjELMAkGA1UEBhMCREUxDzAN\r\n' +
        'BgNVBAoTBkVsc3RlcjEPMA0GA1UECxMGUm9vdENBMRUwEwYDVQQDEwxFbHN0ZXJS\r\n' +
        'b290Q0GCBDuayikwDQYJKoZIhvcNAQELBQADggEBAK8Z1+/VNyU5w/EiyhFH5aRE\r\n' +
        'Mzxo0DahqKEm4pW5haBgKubJwZGs+CrBZR70TPbZGgJd36eyMgeXb/06lBnxewii\r\n' +
        'I/aY6wMTviQTpqFnz5m0Le8UhH+hY1bqNG/vf6J+1gbOSrZyhAUV+MDJbL/OkzX4\r\n' +
        'voVAfUBqSODod0f5wCW2RhvBmB9E62baP6qizdxyPA4iV16H4C0etd/7coLX6NZC\r\n' +
        'oz3Yu0IRTQCH+YrpfIbxGb0grNhtCTfFpa287fuzu8mIEvLNr8GibhBXmQg7iJ+y\r\n' +
        'q0VIyZLY8k6jEPrUB5Iv5ouSR19Dda/2+xJPlT/bosuNcErEuk/yKAHWAzwm1wQ=\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var issuerPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIESjCCAzKgAwIBAgIEO5rKKTANBgkqhkiG9w0BAQsFADBGMQswCQYDVQQGEwJE\r\n' +
        'RTEPMA0GA1UEChMGRWxzdGVyMQ8wDQYDVQQLEwZSb290Q0ExFTATBgNVBAMTDEVs\r\n' +
        'c3RlclJvb3RDQTAeFw0wOTA3MjgwODE5MTFaFw0xNDA3MjgwODE5MTFaMEYxCzAJ\r\n' +
        'BgNVBAYTAkRFMQ8wDQYDVQQKEwZFbHN0ZXIxCzAJBgNVBAsTAkNBMRkwFwYDVQQD\r\n' +
        'ExBFbHN0ZXJTb2Z0VGVzdENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC\r\n' +
        'AQEAv5uoKLnxXQe75iqwqgyt3H6MDAx/wvUVs26+2+yHpEUb/2gA3L8E+NChSb9E\r\n' +
        'aNgxxoac3Yhvxzq2mPpih3vkY7Xw512Tm8l/OPbT8kbmBJmYZneFALXHytAIZiEf\r\n' +
        'e0ZYNKAlClFIgNP5bE9UjTqVEEoSiUhpTubM6c5xEYVznnwPBoYQ0ari7RTDYnME\r\n' +
        'HK4vMfoeBeWHYPiEygNHnGUG8d3merRC/lQASUtL6ikmLWKCKHfyit5ACzPNKAtw\r\n' +
        'IzHAzD5ek0BpcUTci8hUsKz2ZvmoZcjPyj63veQuMYS5cTMgr3bfz9uz1xuoEDsb\r\n' +
        'Sv9rQX9Iw3N7yMpxTDJTqGKhYwIDAQABo4IBPjCCATowDgYDVR0PAQH/BAQDAgEG\r\n' +
        'MBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFEEgsxiaVm7/+mPfCMN7ZQ+S\r\n' +
        'ruOTMIGXBgNVHR8EgY8wgYwwgYmggYaggYOGgYBsZGFwOi8vMTkyLjE2OC42LjI0\r\n' +
        'OjM4OS9sJTNkQ0ElMjBaZXJ0aWZpa2F0ZSxvdSUzZFJvb3RDQSxjbiUzZEVsc3Rl\r\n' +
        'clJvb3RDQSxkYyUzZHdpZXNlbCxkYyUzZGVsc3RlcixkYyUzZGRlPz9iYXNlPyhv\r\n' +
        'YmplY3RDbGFzcz0qKTBbBgNVHSMEVDBSoUqkSDBGMQswCQYDVQQGEwJERTEPMA0G\r\n' +
        'A1UEChMGRWxzdGVyMQ8wDQYDVQQLEwZSb290Q0ExFTATBgNVBAMTDEVsc3RlclJv\r\n' +
        'b3RDQYIEO5rKADANBgkqhkiG9w0BAQsFAAOCAQEAFauDnfHSbgRmbFkpQUXM5wKi\r\n' +
        'K5STAaVps201iAjacX5EsOs5L37VUMoT9G2DAE8Z6B1pIiR3zcd3UpiHnFlUTC0f\r\n' +
        'ZdOCXzDkOfziKY/RzuUsLNFUhBizCIA0+XcKgm3dSA5ex8fChLJddSYheSLuPua7\r\n' +
        'iNMuzaU2YnevbMwpdEsl55Qr/uzcc0YM/mCuM4vsNFyFml91SQyPPmdR3VvGOoGl\r\n' +
        'qS1R0HSoPJUvr0N0kARwD7kO3ikcJ6FxBCsgVLZHGJC+q8PQNZmVMbfgjH4nAyP8\r\n' +
        'u7Qe03v2WLW0UgKu2g0UcQXWXbovktpZoK0fUOwv3bqsZ0K1IjVvMKG8OysUvA==\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var cert = PKI.certificateFromPem(certPem, true);
      var issuer = PKI.certificateFromPem(issuerPem);
      ASSERT.ok(issuer.verify(cert));
    });

    it('should import certificate with sha256 RSASSA-PSS signature', function() {
      var certPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIERzCCAvugAwIBAgIEO50CcjBBBgkqhkiG9w0BAQowNKAPMA0GCWCGSAFlAwQC\r\n' +
        'AQUAoRwwGgYJKoZIhvcNAQEIMA0GCWCGSAFlAwQCAQUAogMCASAwRjELMAkGA1UE\r\n' +
        'BhMCREUxDzANBgNVBAoTBkVsc3RlcjELMAkGA1UECxMCQ0ExGTAXBgNVBAMTEEVs\r\n' +
        'c3RlclNvZnRUZXN0Q0EwHhcNMTEwNzI4MTIxMzU3WhcNMTQwNzI4MTIxMzU3WjAr\r\n' +
        'MRQwEgYDVQQFEwsxMDAyNzUzMzI1QzETMBEGA1UEAxMKMTAwMjc1MzMyNTCCASIw\r\n' +
        'DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALHCogo7LVUkxWsMIc/0jgH2PCLt\r\n' +
        'ukbATPehxWBG1XUPrz53lWgFJzlZaKLlLVVnXrfULaifuOKlZP6SM1JQlL1JuYgY\r\n' +
        'AdgZyHjderNIk5NsSTmefwonSn/ukri5IRTH420oHtSjxk6+/DXlWnQy5OzTN6Bq\r\n' +
        'jVJo8L+TTmf2jWuEam5cWa+YVP2k3tIqX5yMUDFjKO4znHdtIkHnBE0Kx03rWQRB\r\n' +
        'TSYWDgDm2gttdOs9JVeuW0nnwQj27uo9gOR0iyaUjVrKLZ95p6zpXhM4uMSVRNeo\r\n' +
        'LqkdqP2n+4pDXZVqLNgjkHQUS/xq9Q/kYgT2J7wkGfYxP9to7TG7vra1eOECAwEA\r\n' +
        'AaOB7zCB7DAOBgNVHQ8BAf8EBAMCBSAwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQU\r\n' +
        'NDJ2BZIk6ukLqkdmttH12bu2leswOgYDVR0fBDMwMTAvoC2gK4YpaHR0cDovL2Ny\r\n' +
        'bC5lbHN0ZXIuZGUvRWxzdGVyU29mdFRlc3RDQS5jcmwwcQYDVR0jBGowaIAU1R9A\r\n' +
        'HmpdzaxK3v+ihQsEpAFgzOKhSqRIMEYxCzAJBgNVBAYTAkRFMQ8wDQYDVQQKEwZF\r\n' +
        'bHN0ZXIxDzANBgNVBAsTBlJvb3RDQTEVMBMGA1UEAxMMRWxzdGVyUm9vdENBggQ7\r\n' +
        'msqPMEEGCSqGSIb3DQEBCjA0oA8wDQYJYIZIAWUDBAIBBQChHDAaBgkqhkiG9w0B\r\n' +
        'AQgwDQYJYIZIAWUDBAIBBQCiAwIBIAOCAQEAJBYNRZpe+z3yPPLV539Yci6OfjVg\r\n' +
        'vs1e3rvSvcpFaqRJ8vZ8WNx3uuRQZ6B4Z3YEc00UJAOl3wU6KhamyryK2YvCrPg+\r\n' +
        'TS5QDXNaO2z/rAnY1wWSlwBPlhqpMRrNv9cRXBcgK5YxprjytCVYN0UHdintgYxG\r\n' +
        'fg7QYiFb00UXxAza1AFrpG+RqySFfO1scmu4kgpeb6A3USnQ0r6rZz6dt6NqgZZ6\r\n' +
        'oUpDOCvnS9XSOWuvJirV8hIU0KAagguTbwfTqt9nt0wDlwZpemsJZ4Vvnvy8d9Jf\r\n' +
        'zA68EWHbZLr2QP9hb3sHCWJgplMsTJnUwRfi2hf5KNtP8Xg5DSLMfTEbhw==\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var cert = PKI.certificateFromPem(certPem, true);

      ASSERT.equal(cert.signatureOid, PKI.oids['RSASSA-PSS']);
      ASSERT.equal(cert.signatureParameters.hash.algorithmOid, PKI.oids['sha256']);
      ASSERT.equal(cert.signatureParameters.mgf.algorithmOid, PKI.oids['mgf1']);
      ASSERT.equal(cert.signatureParameters.mgf.hash.algorithmOid, PKI.oids['sha256']);
      ASSERT.equal(cert.siginfo.algorithmOid, PKI.oids['RSASSA-PSS']);
      ASSERT.equal(cert.siginfo.parameters.hash.algorithmOid, PKI.oids['sha256']);
      ASSERT.equal(cert.siginfo.parameters.mgf.algorithmOid, PKI.oids['mgf1']);
      ASSERT.equal(cert.siginfo.parameters.mgf.hash.algorithmOid, PKI.oids['sha256']);
    });

    it('should export certificate with sha256 RSASSA-PSS signature', function() {
      var certPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIERzCCAvugAwIBAgIEO50CcjBBBgkqhkiG9w0BAQowNKAPMA0GCWCGSAFlAwQC\r\n' +
        'AQUAoRwwGgYJKoZIhvcNAQEIMA0GCWCGSAFlAwQCAQUAogMCASAwRjELMAkGA1UE\r\n' +
        'BhMCREUxDzANBgNVBAoTBkVsc3RlcjELMAkGA1UECxMCQ0ExGTAXBgNVBAMTEEVs\r\n' +
        'c3RlclNvZnRUZXN0Q0EwHhcNMTEwNzI4MTIxMzU3WhcNMTQwNzI4MTIxMzU3WjAr\r\n' +
        'MRQwEgYDVQQFEwsxMDAyNzUzMzI1QzETMBEGA1UEAxMKMTAwMjc1MzMyNTCCASIw\r\n' +
        'DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALHCogo7LVUkxWsMIc/0jgH2PCLt\r\n' +
        'ukbATPehxWBG1XUPrz53lWgFJzlZaKLlLVVnXrfULaifuOKlZP6SM1JQlL1JuYgY\r\n' +
        'AdgZyHjderNIk5NsSTmefwonSn/ukri5IRTH420oHtSjxk6+/DXlWnQy5OzTN6Bq\r\n' +
        'jVJo8L+TTmf2jWuEam5cWa+YVP2k3tIqX5yMUDFjKO4znHdtIkHnBE0Kx03rWQRB\r\n' +
        'TSYWDgDm2gttdOs9JVeuW0nnwQj27uo9gOR0iyaUjVrKLZ95p6zpXhM4uMSVRNeo\r\n' +
        'LqkdqP2n+4pDXZVqLNgjkHQUS/xq9Q/kYgT2J7wkGfYxP9to7TG7vra1eOECAwEA\r\n' +
        'AaOB7zCB7DAOBgNVHQ8BAf8EBAMCBSAwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQU\r\n' +
        'NDJ2BZIk6ukLqkdmttH12bu2leswOgYDVR0fBDMwMTAvoC2gK4YpaHR0cDovL2Ny\r\n' +
        'bC5lbHN0ZXIuZGUvRWxzdGVyU29mdFRlc3RDQS5jcmwwcQYDVR0jBGowaIAU1R9A\r\n' +
        'HmpdzaxK3v+ihQsEpAFgzOKhSqRIMEYxCzAJBgNVBAYTAkRFMQ8wDQYDVQQKEwZF\r\n' +
        'bHN0ZXIxDzANBgNVBAsTBlJvb3RDQTEVMBMGA1UEAxMMRWxzdGVyUm9vdENBggQ7\r\n' +
        'msqPMEEGCSqGSIb3DQEBCjA0oA8wDQYJYIZIAWUDBAIBBQChHDAaBgkqhkiG9w0B\r\n' +
        'AQgwDQYJYIZIAWUDBAIBBQCiAwIBIAOCAQEAJBYNRZpe+z3yPPLV539Yci6OfjVg\r\n' +
        'vs1e3rvSvcpFaqRJ8vZ8WNx3uuRQZ6B4Z3YEc00UJAOl3wU6KhamyryK2YvCrPg+\r\n' +
        'TS5QDXNaO2z/rAnY1wWSlwBPlhqpMRrNv9cRXBcgK5YxprjytCVYN0UHdintgYxG\r\n' +
        'fg7QYiFb00UXxAza1AFrpG+RqySFfO1scmu4kgpeb6A3USnQ0r6rZz6dt6NqgZZ6\r\n' +
        'oUpDOCvnS9XSOWuvJirV8hIU0KAagguTbwfTqt9nt0wDlwZpemsJZ4Vvnvy8d9Jf\r\n' +
        'zA68EWHbZLr2QP9hb3sHCWJgplMsTJnUwRfi2hf5KNtP8Xg5DSLMfTEbhw==\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var cert = PKI.certificateFromPem(certPem, true);
      ASSERT.equal(PKI.certificateToPem(cert), certPem);
    });

    it('should verify certificate with sha256 RSASSA-PSS signature', function() {
      var certPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIERzCCAvugAwIBAgIEO50CcjBBBgkqhkiG9w0BAQowNKAPMA0GCWCGSAFlAwQC\r\n' +
        'AQUAoRwwGgYJKoZIhvcNAQEIMA0GCWCGSAFlAwQCAQUAogMCASAwRjELMAkGA1UE\r\n' +
        'BhMCREUxDzANBgNVBAoTBkVsc3RlcjELMAkGA1UECxMCQ0ExGTAXBgNVBAMTEEVs\r\n' +
        'c3RlclNvZnRUZXN0Q0EwHhcNMTEwNzI4MTIxMzU3WhcNMTQwNzI4MTIxMzU3WjAr\r\n' +
        'MRQwEgYDVQQFEwsxMDAyNzUzMzI1QzETMBEGA1UEAxMKMTAwMjc1MzMyNTCCASIw\r\n' +
        'DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALHCogo7LVUkxWsMIc/0jgH2PCLt\r\n' +
        'ukbATPehxWBG1XUPrz53lWgFJzlZaKLlLVVnXrfULaifuOKlZP6SM1JQlL1JuYgY\r\n' +
        'AdgZyHjderNIk5NsSTmefwonSn/ukri5IRTH420oHtSjxk6+/DXlWnQy5OzTN6Bq\r\n' +
        'jVJo8L+TTmf2jWuEam5cWa+YVP2k3tIqX5yMUDFjKO4znHdtIkHnBE0Kx03rWQRB\r\n' +
        'TSYWDgDm2gttdOs9JVeuW0nnwQj27uo9gOR0iyaUjVrKLZ95p6zpXhM4uMSVRNeo\r\n' +
        'LqkdqP2n+4pDXZVqLNgjkHQUS/xq9Q/kYgT2J7wkGfYxP9to7TG7vra1eOECAwEA\r\n' +
        'AaOB7zCB7DAOBgNVHQ8BAf8EBAMCBSAwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQU\r\n' +
        'NDJ2BZIk6ukLqkdmttH12bu2leswOgYDVR0fBDMwMTAvoC2gK4YpaHR0cDovL2Ny\r\n' +
        'bC5lbHN0ZXIuZGUvRWxzdGVyU29mdFRlc3RDQS5jcmwwcQYDVR0jBGowaIAU1R9A\r\n' +
        'HmpdzaxK3v+ihQsEpAFgzOKhSqRIMEYxCzAJBgNVBAYTAkRFMQ8wDQYDVQQKEwZF\r\n' +
        'bHN0ZXIxDzANBgNVBAsTBlJvb3RDQTEVMBMGA1UEAxMMRWxzdGVyUm9vdENBggQ7\r\n' +
        'msqPMEEGCSqGSIb3DQEBCjA0oA8wDQYJYIZIAWUDBAIBBQChHDAaBgkqhkiG9w0B\r\n' +
        'AQgwDQYJYIZIAWUDBAIBBQCiAwIBIAOCAQEAJBYNRZpe+z3yPPLV539Yci6OfjVg\r\n' +
        'vs1e3rvSvcpFaqRJ8vZ8WNx3uuRQZ6B4Z3YEc00UJAOl3wU6KhamyryK2YvCrPg+\r\n' +
        'TS5QDXNaO2z/rAnY1wWSlwBPlhqpMRrNv9cRXBcgK5YxprjytCVYN0UHdintgYxG\r\n' +
        'fg7QYiFb00UXxAza1AFrpG+RqySFfO1scmu4kgpeb6A3USnQ0r6rZz6dt6NqgZZ6\r\n' +
        'oUpDOCvnS9XSOWuvJirV8hIU0KAagguTbwfTqt9nt0wDlwZpemsJZ4Vvnvy8d9Jf\r\n' +
        'zA68EWHbZLr2QP9hb3sHCWJgplMsTJnUwRfi2hf5KNtP8Xg5DSLMfTEbhw==\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var issuerPem = '-----BEGIN CERTIFICATE-----\r\n' +
        'MIIEZDCCAxigAwIBAgIEO5rKjzBBBgkqhkiG9w0BAQowNKAPMA0GCWCGSAFlAwQC\r\n' +
        'AQUAoRwwGgYJKoZIhvcNAQEIMA0GCWCGSAFlAwQCAQUAogMCASAwRjELMAkGA1UE\r\n' +
        'BhMCREUxDzANBgNVBAoTBkVsc3RlcjEPMA0GA1UECxMGUm9vdENBMRUwEwYDVQQD\r\n' +
        'EwxFbHN0ZXJSb290Q0EwHhcNMTEwNzI4MTExNzI4WhcNMTYwNzI4MTExNzI4WjBG\r\n' +
        'MQswCQYDVQQGEwJERTEPMA0GA1UEChMGRWxzdGVyMQswCQYDVQQLEwJDQTEZMBcG\r\n' +
        'A1UEAxMQRWxzdGVyU29mdFRlc3RDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC\r\n' +
        'AQoCggEBAMFpz3sXnXq4ZUBdYdpG5DJVfITLXYwXPfEJzr1pLRfJ2eMPn7k3B/2g\r\n' +
        'bvuH30zKmDRjlfV51sFw4l1l+cQugzy5FEOrfE6g7IvhpBUf9SQujVWtE3BoSRR5\r\n' +
        'pSGbIWC7sm2SG0drpoCRpL0xmWZlAUS5mz7hBecJC/kKkKeOxUg5h492XQgWd0ow\r\n' +
        '6GlyQBxJCmxgQBMnLS0stecs234hR5gvTHic50Ey+gRMPsTyco2Fm0FqvXtBuOsj\r\n' +
        'zAW7Nk2hnM6awFHVMDBLm+ClE1ww0dLW0ujkdoGsTEbvmM/w8MBI6WAiWaanjK/x\r\n' +
        'lStmQeUVXKd+AfuzT/FIPrwANcC1qGUCAwEAAaOB8TCB7jAOBgNVHQ8BAf8EBAMC\r\n' +
        'AQYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQU1R9AHmpdzaxK3v+ihQsE\r\n' +
        'pAFgzOIwNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2NybC5lbHN0ZXIuZGUvRWxz\r\n' +
        'dGVyUm9vdENBLmNybDBxBgNVHSMEajBogBS3zfTokckL2H/fTojW02K+metEcaFK\r\n' +
        'pEgwRjELMAkGA1UEBhMCREUxDzANBgNVBAoTBkVsc3RlcjEPMA0GA1UECxMGUm9v\r\n' +
        'dENBMRUwEwYDVQQDEwxFbHN0ZXJSb290Q0GCBDuaylowQQYJKoZIhvcNAQEKMDSg\r\n' +
        'DzANBglghkgBZQMEAgEFAKEcMBoGCSqGSIb3DQEBCDANBglghkgBZQMEAgEFAKID\r\n' +
        'AgEgA4IBAQBjT107fBmSfQNUYCpXIlaS/pogPoCahuC1g8QDtq6IEVXoEgXCzfVN\r\n' +
        'JYHyYOQOraP4O2LEcXpo/oc0MMpVF06QLKG/KieUE0mrZnsCJ3GLSJkM8tI8bRHj\r\n' +
        '8tAhlViMacUqnKKufCs/rIN25JB57+sCyFqjtRbSt88e+xqFJ5I79Btp/bNtoj2G\r\n' +
        'OJGl997EPua9/yJuvdA9W67WO/KwEh+FqylB1pAapccOHqttwu4QJIc/XJfG5rrf\r\n' +
        '8QZz8HIuOcroA4zIrprQ1nJRCuMII04ueDtBVz1eIEmqNEUkr09JdK8M0LKH0lMK\r\n' +
        'Ysgjai/P2mPVVwhVw6dHzUVRLXh3xIQr\r\n' +
        '-----END CERTIFICATE-----\r\n';
      var cert = PKI.certificateFromPem(certPem, true);
      var issuer = PKI.certificateFromPem(issuerPem);
      ASSERT.ok(issuer.verify(cert));
    });
  });

  describe('public key fingerprints', function() {
    it('should get a SHA-1 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(publicKey, {type: 'RSAPublicKey'});
      ASSERT.equal(fp.toHex(), 'f57563e0c75d6e9b03fafdb2fd72349f23030300');
    });

    it('should get a SHA-1 SubjectPublicKeyInfo fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {type: 'SubjectPublicKeyInfo'});
      ASSERT.equal(fp.toHex(), '984724bc548bbc2c8acbac044bd8d518abd26dd8');
    });

    it('should get a hex SHA-1 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {type: 'RSAPublicKey', encoding: 'hex'});
      ASSERT.equal(fp, 'f57563e0c75d6e9b03fafdb2fd72349f23030300');
    });

    it('should get a hex, colon-delimited SHA-1 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {type: 'RSAPublicKey', encoding: 'hex', delimiter: ':'});
      ASSERT.equal(
        fp, 'f5:75:63:e0:c7:5d:6e:9b:03:fa:fd:b2:fd:72:34:9f:23:03:03:00');
    });

    it('should get a hex, colon-delimited SHA-1 SubjectPublicKeyInfo fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {
          type: 'SubjectPublicKeyInfo',
          encoding: 'hex',
          delimiter: ':'
        });
      ASSERT.equal(
        fp, '98:47:24:bc:54:8b:bc:2c:8a:cb:ac:04:4b:d8:d5:18:ab:d2:6d:d8');
    });

    it('should get an MD5 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {md: MD.md5.create(), type: 'RSAPublicKey'});
      ASSERT.equal(fp.toHex(), 'c7da180cc48d31a071d31a78bc43d9d7');
    });

    it('should get an MD5 SubjectPublicKeyInfo fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {md: MD.md5.create(), type: 'SubjectPublicKeyInfo'});
      ASSERT.equal(fp.toHex(), 'e5c5ba577fe24fb8a678d8d58f539cd7');
    });

    it('should get a hex MD5 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey,
        {md: MD.md5.create(), type: 'RSAPublicKey', encoding: 'hex'});
      ASSERT.equal(fp, 'c7da180cc48d31a071d31a78bc43d9d7');
    });

    it('should get a hex, colon-delimited MD5 RSAPublicKey fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {
          md: MD.md5.create(),
          type: 'RSAPublicKey',
          encoding: 'hex',
          delimiter: ':'
        });
      ASSERT.equal(fp, 'c7:da:18:0c:c4:8d:31:a0:71:d3:1a:78:bc:43:d9:d7');
    });

    it('should get a hex, colon-delimited MD5 SubjectPublicKeyInfo fingerprint', function() {
      var publicKey = PKI.publicKeyFromPem(_pem.publicKey);
      var fp = PKI.getPublicKeyFingerprint(
        publicKey, {
          md: MD.md5.create(),
          type: 'SubjectPublicKeyInfo',
          encoding: 'hex',
          delimiter: ':'
        });
      ASSERT.equal(fp, 'e5:c5:ba:57:7f:e2:4f:b8:a6:78:d8:d5:8f:53:9c:d7');
    });
  });

  function createCertificate(options) {
    var publicKey = options.publicKey;
    var signingKey = options.signingKey;
    var subject = options.subject;
    var issuer = options.issuer;
    var isCA = options.isCA;
    var serialNumber = options.serialNumber || '01';

    var cert = PKI.createCertificate();
    cert.publicKey = publicKey;
    cert.serialNumber = serialNumber;
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(
      cert.validity.notBefore.getFullYear() + 1);
    cert.setSubject(subject);
    cert.setIssuer(issuer);
    var extensions = [];
    if(isCA) {
      extensions.push({
        name: 'basicConstraints',
        cA: true
      });
    }
    extensions.push({
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true
    }, {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true
    }, {
      name: 'subjectAltName',
      altNames: [{
        type: 6, // URI
        value: 'http://example.org/webid#me'
      }]
    }, {
      name: 'subjectKeyIdentifier'
    });
    // FIXME: add authorityKeyIdentifier extension
    cert.setExtensions(extensions);

    cert.sign(signingKey);

    return cert;
  }
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/pki',
    'forge/md',
    'forge/util'
  ], function(PKI, MD, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      PKI(),
      MD(),
      UTIL()
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/pki')(),
    require('../../js/md')(),
    require('../../js/util')());
}

})();
