var dns_sd       = require('../lib/mdns').dns_sd
  , service_type = "_mdns_test._tcp"
  , test_port    = 4321
  ;

//=== DNSServiceRef ===========================================================

exports['DNSServiceRef'] = function(t) {
  
  var sr = new dns_sd.DNSServiceRef();

  t.ok(sr,
      'DNSServiceRef must be truthy');
  t.strictEqual(sr.fd, -1,
      'File descriptor must be -1');
  t.strictEqual(sr.initialized, false,
      'DNSServiceRef must not be initialized');
  t.done();
}

//=== DNSServiceRegister ======================================================

exports['DNSServiceRegister()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  t.doesNotThrow(function() {
    var /* uses paren scope serviceRef */
        flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister( serviceRef, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  'Call with minimal argumentss must succeed.');

  t.notStrictEqual(serviceRef.fd, -1,
      'File descriptor must not be -1 after initialization');

  t.strictEqual(serviceRef.initialized, true,
      'DNSServiceRef must be initialized');

  t.throws(function() {
    var /* uses parent scope serviceRef */
        flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister( serviceRef, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  'Duplicate initialization of DNSServiceRef must throw');

  t.doesNotThrow(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = 'My sh4red stuff'
      , type   = service_type
      , domain = 'somedomain'
      , host   = 'somehost'
      , port   = test_port
      , txtRec = new Buffer('\0')
      , cb     = function() {}
      , ctx    = {anything: true}
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  'Call with all arguments on must succed.');

  t.throws(function() { dns_sd.DNSServiceRegister(); },
      'Call with zero arguments must throw.');

  t.throws(function() {
    var a1, a2, a3, a4, a5, a6, a7, a8;
    dns_sd.DNSServiceRegister(a1, a2, a3, a4, a5, a6, a7, a7);
  },  'Call with eight arguments must throw.');

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = '=== KAPUTT ===' /* broken */
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'flags' must be a number, not a string.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = '=== KAPUTT ===' /* broken */
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'interfaceIndex' must be a number, not a string.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = 1111111111 /* broken */
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'name' must be a string, not a number.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = null /* broken */
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'regtype' must be a string, not null.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = 1111111111 /* broken */
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'regtype' has to be a string, not a number.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = 1111111111 /* broken */
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'domain' must not be a string, not a number.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = 1111111111 /* broken */
      , port   = test_port
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'host' must be a string, not a number.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = '=== KAPUTT ===' /* broken */
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'port' must be a number, not a string.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = 1111111111 /* broken */
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'txtRecord' must be a TXTRecordRef or buffer, not a number.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = test_port
      , txtRec = null
      , cb     = '=== KAPUTT ===' /* broken */
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  "'callback' must be a function, not a string.");

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = 1 << 16 /* broken */
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  'port number must be <= ' + ((1 << 16) - 1) + '.');

  t.throws(function() {
    var ref    = new dns_sd.DNSServiceRef()
      , flags  = 0
      , iface  = 0
      , name   = null
      , type   = service_type
      , domain = null
      , host   = null
      , port   = -1    /* broken */
      , txtRec = null
      , cb     = null
      , ctx    = null
      ;
    dns_sd.DNSServiceRegister(ref, flags, iface, name, type, domain,
      host, port, txtRec, cb, ctx);
  },  'port number must >= 0.');

  t.done();
};

//=== DNSServiceProcessResult =================================================

exports['DNSServiceProcessResult()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef()
    , IOWatcher  = process.binding('io_watcher').IOWatcher
    , watcher    = new IOWatcher()
    , timeout    = 3000
    , timeoutId  = setTimeout(function() {
        t.ok(false ,"Test did not finish within " + (timeout/1000) + "s");
        watcher.stop();
        t.done();
      }
      , timeout);

  watcher.callback = function() {
    dns_sd.DNSServiceProcessResult(serviceRef);
  }

  function result_callback(sdRef, flags, errorCode, name, serviceType, domain,
      context)
  {
    t.strictEqual(sdRef, serviceRef,
        'serviceRef must be identical');
    t.strictEqual(typeof flags, "number",
        "'flags' must be of type number");
    t.strictEqual(typeof errorCode, "number",
        "'errorCode' must be of type number");
    t.strictEqual(errorCode, dns_sd.kDNSServiceErr_NoError,
        "'errorCode' must be kDNSServiceErr_NoError");
    t.strictEqual(typeof name, "string",
        "'name' must be of type string");
    t.strictEqual(typeof serviceType, "string",
        "'serviceType' must be of type string");
    t.strictEqual(typeof domain, "string",
        "'domain' must be of type string");
    t.strictEqual(typeof context, "string",
        "'context' must be of type string (in this test)");
    t.strictEqual(context, "foobar",
      "expected 'foobar' but got '" + context + "'");

    clearTimeout(timeoutId);
    watcher.stop();
    watcher.callback = null;
    t.done();
  }

  dns_sd.DNSServiceRegister(serviceRef, 0, 0, null, service_type,
      null, null, test_port, null, result_callback, "foobar");

  watcher.set(serviceRef.fd, true, false);
  watcher.start();
}

//=== DNSServiceRefSockFD =====================================================

exports['DNSServiceRefSockFD()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  t.throws(function() {dns_sd.DNSServiceRefSockFD(serviceRef)},
      'call with uninitialized serviceRef must throw');

  dns_sd.DNSServiceRegister(serviceRef, 0, 0, null, service_type,
      null, null, test_port, null, null, null);

  var fd;
  t.doesNotThrow(function() {fd = dns_sd.DNSServiceRefSockFD(serviceRef)},
    "DNSServiceRefSockFD() must not throw");

  t.notEqual(fd, -1, 'file descriptor must not be -1');

  t.strictEqual(serviceRef.fd, fd,
      'result of DNSServiceRefSockFD() and fd getter must be the same');

  t.throws(function() { dns_sd.DNSServiceRefSockFD("narf"); },
      'argument must be a DNSServiceRef');

  t.done();
}

//=== DNSServiceBrowse ========================================================

exports['DNSServiceBrowse()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  t.doesNotThrow(function() {
    dns_sd.DNSServiceBrowse(serviceRef, 0, 0, service_type, null,
      function() {}, null);
  }, "DNSServiceBrowse() must not throw");

  t.throws(function() {
    dns_sd.DNSServiceBrowse(serviceRef, 0, 0, service_type, null,
      function() {}, null);
  },  'serviceRef already initialized');

  t.throws(function() {
    dns_sd.DNSServiceBrowse();
  }, 'not enough arguments');

  t.throws(function() {
    dns_sd.DNSServiceBrowse("", 0, 0, service_type, null,
      function() {}, null);
  }, "'serviceRef' must not be a string");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, "", 0, service_type, null,
      function() {}, null);
  }, "'flags' must be a number, not a string");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, 0, "", service_type, null,
      function() {}, null);
  }, "'interfaceIndex' must be a number, not a string");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, 0, 0, null, null, function() {}, null);
  }, "'regtype' must be a string, not null");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, 0, 0, 0, null, function() {}, null);
  }, "'regtype' must be a string, not a number");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, 0, 0, service_type, 0,
      function() {}, null);
  }, "'domain' must be a string, not a number");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceBrowse(ref, 0, 0, service_type, null, 0, null);
  }, "'callback' must be a function, not a number");

  t.done();
}

//=== DNSServiceRefDeallocate =================================================

exports['DNSServiceRefDeallocate()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  dns_sd.DNSServiceRegister(serviceRef, 0, 0, null, "_node-mdns-test._tcp",
      null, null, test_port, null, null, null);

  t.strictEqual(serviceRef.initialized, true,
      "'initialized' must be true after inititalization");

  dns_sd.DNSServiceRefDeallocate(serviceRef);

  t.strictEqual(serviceRef.initialized, false,
      "'initialized' must be false after deallocation");

  t.strictEqual(serviceRef.fd, -1,
      "'fd' must be -1 after deallocation");

  t.throws(function() { dns_sd.DNSServiceRefDeallocate(serviceRef); },
      "serviceRef is already deallocated");

  t.throws(function() { dns_sd.DNSServiceRefDeallocate(); },
      "not enough arguments");

  t.throws(function() { dns_sd.DNSServiceRefDeallocate(undefined); },
      "argument must be DNSServiceRef, not undefined");

  t.throws(function() { dns_sd.DNSServiceRefDeallocate(serviceRef, serviceRef); },
      "to many arguments");

  t.done();
}

//=== DNSServiceResolve =======================================================

exports['DNSServiceResolve()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  t.doesNotThrow(function() {
    dns_sd.DNSServiceResolve(serviceRef, 0, 0, 'hostname',
      service_type, 'local.', function() {}, null);
  }, 'DNSServiceResolve() must not throw');

  t.strictEqual(serviceRef.initialized, true,
      "'initialized' must be true after inititalization");

  t.throws(function() {
    dns_sd.DNSServiceResolve();
  }, "not enough arguments");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, "", 0, 'hostname',
      service_type, 'local.', function() {}, null);
  }, "'flags' must be a number, not a string");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, 0, null, 'hostname',
      service_type, 'local.', function() {}, null);
  }, "'interfaceIndex' must be a number, not null");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, 0, 0, null,
      service_type, 'local.', function() {}, null);
  }, "'name' must be a string, not null");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, 0, 0, 'hostname', null,
      'local.', function() {}, null);
  }, "'regtype' must be a string, not null");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, 0, 0, 'hostname',
      service_type, null, function() {}, null);
  }, "'domain' must be a string, not null");

  t.throws(function() {
    var ref = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceResolve(ref, 0, 0, 'hostname',
      service_type, 'local.', null, null);
  }, "'callback' must be a function, not null");

  t.done();
}

//=== DNSServiceEnumerateDomains ==============================================

exports['DNSServiceEnumerateDomains()'] = function(t) {
  var serviceRef = new dns_sd.DNSServiceRef();

  t.doesNotThrow( function() {
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      dns_sd.kDNSServiceFlagsBrowseDomains, 0, function() {}, null);
  }, 'DNSServiceEnumerateDomains() must not throw');

  t.notEqual(serviceRef.fd, -1,
      "'fd' must not be -1 after inititalization");
  t.strictEqual(serviceRef.initialized, true,
      "'initialized' must be true after inititalization");

  t.throws(function() {
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      dns_sd.kDNSServiceFlagsBrowseDomains, 0, function() {}, null);
  }, 'dupliate inititalization of serviceRef must throw');

  t.throws(function() {
    var serviceRef = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      'flags', 0, function() {}, null);
  }, "'flags' must be a number, not a string");

  t.throws(function() {
    var serviceRef = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      0, 0, function() {}, null);
  }, "'flags' must be kDNSServiceFlagsBrowseDomains or " +
     "kDNSServiceFlagsRegistrationDomains");

  t.throws(function() {
    var serviceRef = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      dns_sd.kDNSServiceFlagsBrowseDomains, 'interfaceIndex', function() {}, null);
  }, "'interfaceIndex' must be number, not a string");

  t.throws(function() {
    var serviceRef = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      dns_sd.kDNSServiceFlagsBrowseDomains, 0, 'function', null);
  }, "'callback' must be function, not a string");

  t.throws(function() {
    var serviceRef = new dns_sd.DNSServiceRef();
    dns_sd.DNSServiceEnumerateDomains(serviceRef,
      dns_sd.kDNSServiceFlagsBrowseDomains, 0, null, null);
  }, "'callback' must be function, not null");

  t.done();
}

//=== TXTRecordRef ============================================================

exports['TXTRecordRef'] = function(t) {
  var txtRecord = new dns_sd.TXTRecordRef();
  dns_sd.TXTRecordCreate(txtRecord, null);

  var txtRecord = new dns_sd.TXTRecordRef();
  var buffer = new Buffer(256);
  dns_sd.TXTRecordCreate(txtRecord, buffer);
  txtRecord.buffer = buffer;

  dns_sd.TXTRecordSetValue(txtRecord, 'foo', 'bar');
  t.strictEqual(dns_sd.TXTRecordGetLength(txtRecord), 8,
      "length must be 8 bytes after adding 'foo=bar'");

  dns_sd.TXTRecordSetValue(txtRecord, 'foobar', 'foobar');
  t.strictEqual(dns_sd.TXTRecordGetLength(txtRecord), 22,
      "length must be 22 bytes after adding 'foobar=foobar'");

  dns_sd.TXTRecordSetValue(txtRecord, 'buffer', new Buffer('raw'));
  t.strictEqual(dns_sd.TXTRecordGetLength(txtRecord), 33,
      "length must be 33 bytes after adding 'buffer=raw'");

  t.throws(function() { dns_sd.TXTRecordCreate() },
      'TXTRecordCreate() must throw when called without arguments');
  t.throws(function() { dns_sd.TXTRecordCreate('narf') },
      'TXTRecordCreate() must throw when called with a string');
  t.throws(function() { dns_sd.TXTRecordCreate(txtRecord) },
      'duplicate call to TXTRecordCreate() must throw');

  t.doesNotThrow(function() { dns_sd.TXTRecordDeallocate( txtRecord ); });
  t.throws(function() { dns_sd.TXTRecordDeallocate(); });
  t.throws(function() { dns_sd.TXTRecordDeallocate(null, null); });

t.ok(false, "'flags' must be a number, not a string");

  t.done();
}

// vim: filetype=javascript:
