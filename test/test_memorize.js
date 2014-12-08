var memo   = require('..'),
	should = require('should'),
	sinon  = require('sinon');

var fn,
	res;

describe('function without a callback', function() {

	before(function() {
		fn = memo(function(num) { return num * 2 })
	})

/*
	it('crashes', function() {
		(function() {
			fn()
		}).should.throw()
	})
*/

})

describe('function with just a callback', function() {

	before(function() {
		fn = memo(function(cb) { 
			called++;
			setTimeout(function() { cb(res) }, 100);
		})
	})

	describe('when returning a null value', function() {

		before(function() {
			res = null;
		})

		it('returns null / memorized value', function(done) {
			called = 0;

			fn(function(res) {
				called.should.eql(1);
				(null === res).should.be.true;

				fn(function(res) {
					called.should.eql(1);
					done();
				})
			})
		})

	})

	describe('when returning an error', function() {

		before(function() {
			res = new Error('No sire.');
		})

		it('does not memorize value', function(done) {

			fn.reset();
			called = 0;

			fn(function(res) {
				called.should.eql(1);
				res.should.be.a.Error;
				fn(function(res) {
					called.should.eql(2);
          res.should.be.a.Error;
					done();
				})
			})

		})

	})

})

describe('function with one argument and a callback', function() {

  before(function() {
    fn = memo(function(num, cb) { 
      called++;
      num.should.be.a.Number;
      setTimeout(function() { cb(res) }, 100);
    })
  })

  describe('when returning a null value', function() {

    before(function() {
      res = null;
    })

    describe('and called with same arguments', function() {

      it('returns null / memorized value', function(done) {
        called = 0;

        fn(100, function(res) {
          called.should.eql(1);
          (null === res).should.be.true;

          fn(100, function(res) {
            called.should.eql(1);
            done();
          })
        })
      })

    })

    describe('and called with different arguments', function() {

      it('calls function again', function(done) {
        fn.reset();
        called = 0;

        fn(100, function(res) {
          called.should.eql(1);
          (null === res).should.be.true;

          fn(200, function(res) {
            called.should.eql(2);
            done();
          })
        })
      })

    })

  })

  describe('when returning an error', function() {

    before(function() {
      res = new Error('No sire.');
    })

    describe('and called with same arguments', function() {

      it('does not memorize value', function(done) {

        fn.reset();
        called = 0;

        fn(100, function(res) {
          called.should.eql(1);
          res.should.be.a.Error;
          fn(100, function(res) {
            called.should.eql(2);
            res.should.be.a.Error;
            done();
          })
        })

      })

    })

  })

})

describe('function with two arguments and a callback', function() {


  before(function() {
    fn = memo(function(num, word, cb) { 
      called++;
      num.should.be.a.Number;
      word.should.be.a.String;
      setTimeout(function() { cb(res) }, 100);
    })
  })

  describe('when returning a null value', function() {

    before(function() {
      res = null;
    })

    describe('and called with same arguments', function() {

      it('returns null / memorized value', function(done) {
        called = 0;

        fn(100, 'foo', function(res) {
          called.should.eql(1);
          (null === res).should.be.true;

          fn(100, 'foo', function(res) {
            called.should.eql(1);
            (null === res).should.be.true;
            done();
          })
        })
      })

    })

    describe('and called with different arguments', function() {

      it('calls function again', function(done) {
        fn.reset();
        called = 0;

        fn(100, 'foo', function(res) {
          called.should.eql(1);
          (null === res).should.be.true;

          fn(200, 'foo', function(res) {
            called.should.eql(2);
            (null === res).should.be.true;
            done();
          })
        })
      })

    })

  })

  describe('when returning an error', function() {

    before(function() {
      res = new Error('No sire.');
    })

    describe('and called with same arguments', function() {

      it('does not memorize value', function(done) {

        fn.reset();
        called = 0;

        fn(100, 'foo', function(res) {
          called.should.eql(1);
          res.should.be.a.Error;
          fn(100, 'foo', function(res) {
            called.should.eql(2);
            res.should.be.a.Error;
            done();
          })
        })

      })

    })

  })
	
})