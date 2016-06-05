'use strict';

var assert = require('assert')

describe('absolute.js', function() {
  var absolute = require('./index')

  // Non-changing string, should not get replaced
  var ok = ''
    + '<img src="www.foo.com" />'
    + '<img src="google.com" />'
    + '<img src="http://www.bar.com" />'
    + '<img src="//baz.com" />'

  it('string replace', function() {
    assert.strictEqual(
      absolute(
        '<a href="/relative">Heyo</a>' + ok
      , 'http://www.example.com'
      )
    , '<a href="http://www.example.com/relative">Heyo</a>' + ok
    )

    assert.strictEqual(
      absolute(
        '<a href="../relative">Heyo</a>' + ok
      , 'http://www.example.com'
      )
    , '<a href="http://www.example.com/../relative">Heyo</a>' + ok
    )
  })

  it('string replace single quote', function() {
    assert.strictEqual(
      absolute(
        "<a href='../relative'>Heyo</a>" + ok
      , 'http://www.example.com'
      )
    , "<a href='http://www.example.com/../relative'>Heyo</a>" + ok
    )
  })

  it('string multi-replace', function() {
    assert.strictEqual(
      absolute(
        '<a href="/relative">Heyo</a><form action="/index.php">' + ok
      , 'http://www.example.com'
      )
    , '<a href="http://www.example.com/relative">Heyo</a><form action="http://www.example.com/index.php">' + ok
    )
  })

  it('function replace', function() {
    assert.strictEqual(
      absolute(
        '<a href="/relative">Heyo</a>' + ok
      , function(url, attr) {
          return 'http://www.example.com' + url
        }
      )
    , '<a href="http://www.example.com/relative">Heyo</a>' + ok
    )

    assert.strictEqual(
      absolute(
        '<a href="../two">Heyo</a>' + ok
      , function(url, attr) {
          return 'http://www.example.com/public/' + url
        }
      )
    , '<a href="http://www.example.com/public/../two">Heyo</a>' + ok
    )

    assert.strictEqual(
      absolute(
        '<a href="./three">Heyo</a>' + ok
      , function(url, attr) {
          return 'http://www.example.com/' + url
        }
      )
    , '<a href="http://www.example.com/./three">Heyo</a>' + ok
    )
  })

  it('function multi-replace', function() {
    assert.strictEqual(
      absolute(
        '<a href="/relative">Heyo</a><form action="/index.php">' + ok
      , function(url, attr) {
          return 'http://www.example.com' + url
        }
      )
    , '<a href="http://www.example.com/relative">Heyo</a><form action="http://www.example.com/index.php">' + ok
    )
  })
})