'use strict';

describe('Service: Fetchtracks', function () {

  // load the service's module
  beforeEach(module('DscovermeApp'));

  // instantiate service
  var Fetchtracks;
  beforeEach(inject(function (_Fetchtracks_) {
    Fetchtracks = _Fetchtracks_;
  }));

  it('should do something', function () {
    expect(!!Fetchtracks).toBe(true);
  });

});
