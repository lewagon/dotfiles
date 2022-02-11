var allSettled = Promise.allSettled || function ($) {'use strict';
  var self = this;
  return self.all(
    $.map(
      function (value) {
        return self.resolve(value).then(this.$, this._);
      },
      {
        $: function (value) {
          return {status: 'fulfilled', value: value};
        },
        _: function (reason) {
          return {status: 'rejected', reason: reason};
        }
      }
    )
  );
};
export default allSettled;
