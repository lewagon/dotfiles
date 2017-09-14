/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

var /*istanbul ignore start*/_line = require('../diff/line') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (!options) {
    options = {};
  }
  if (typeof options.context === 'undefined') {
    options.context = 4;
  }

  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr, options);
  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier

  function contextLines(lines) {
    return lines.map(function (entry) {
      return ' ' + entry;
    });
  }

  var hunks = [];
  var oldRangeStart = 0,
      newRangeStart = 0,
      curRange = [],
      oldLine = 1,
      newLine = 1;
  /*istanbul ignore start*/
  var _loop = function _loop( /*istanbul ignore end*/i) {
    var current = diff[i],
        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      /*istanbul ignore start*/
      var _curRange;

      /*istanbul ignore end*/
      // If we have previous context, start with that
      if (!oldRangeStart) {
        var prev = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;

        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      }

      // Output our changes
      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {
        return (current.added ? '+' : '-') + entry;
      })));

      // Track the updated file position
      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      // Identical context lines. Track line changes
      if (oldRangeStart) {
        // Close out any changes that have been output (or join overlapping)
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          /*istanbul ignore start*/
          var _curRange2;

          /*istanbul ignore end*/
          // Overlapping
          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
        } else {
          /*istanbul ignore start*/
          var _curRange3;

          /*istanbul ignore end*/
          // end the range and output
          var contextSize = Math.min(lines.length, options.context);
          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));

          var hunk = {
            oldStart: oldRangeStart,
            oldLines: oldLine - oldRangeStart + contextSize,
            newStart: newRangeStart,
            newLines: newLine - newRangeStart + contextSize,
            lines: curRange
          };
          if (i >= diff.length - 2 && lines.length <= options.context) {
            // EOF is inside this hunk
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            if (lines.length == 0 && !oldEOFNewline) {
              // special case: old has no eol and no trailing context; no-nl can end up before adds
              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
            } else if (!oldEOFNewline || !newEOFNewline) {
              curRange.push('\\ No newline at end of file');
            }
          }
          hunks.push(hunk);

          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }
      oldLine += lines.length;
      newLine += lines.length;
    }
  };

  for (var i = 0; i < diff.length; i++) {
    /*istanbul ignore start*/
    _loop( /*istanbul ignore end*/i);
  }

  return {
    oldFileName: oldFileName, newFileName: newFileName,
    oldHeader: oldHeader, newHeader: newHeader,
    hunks: hunks
  };
}

function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);

  var ret = [];
  if (oldFileName == newFileName) {
    ret.push('Index: ' + oldFileName);
  }
  ret.push('===================================================================');
  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

  for (var i = 0; i < diff.hunks.length; i++) {
    var hunk = diff.hunks[i];
    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
    ret.push.apply(ret, hunk.lines);
  }

  return ret.join('\n') + '\n';
}

function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}
//# sourceMappingURL=data:application/json;base64,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QixHQUR6QixHQUMrQixLQUFLLFFBRHBDLEdBRUUsS0FISjtBQUtBLFFBQUksSUFBSixDQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLEtBQUssS0FBekI7QUFDRDs7QUFFRCxTQUFPLElBQUksSUFBSixDQUFTLElBQVQsSUFBaUIsSUFBeEI7QUFDRDs7QUFFTSxTQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0IsTUFBL0IsRUFBdUMsTUFBdkMsRUFBK0MsU0FBL0MsRUFBMEQsU0FBMUQsRUFBcUUsT0FBckUsRUFBOEU7QUFDbkYsU0FBTyxvQkFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsTUFBeEMsRUFBZ0QsTUFBaEQsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsT0FBOUUsQ0FBUDtBQUNEIiwiZmlsZSI6ImNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGlmZkxpbmVzfSBmcm9tICcuLi9kaWZmL2xpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RydWN0dXJlZFBhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMuY29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zLmNvbnRleHQgPSA0O1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IGRpZmZMaW5lcyhvbGRTdHIsIG5ld1N0ciwgb3B0aW9ucyk7XG4gIGRpZmYucHVzaCh7dmFsdWU6ICcnLCBsaW5lczogW119KTsgICAvLyBBcHBlbmQgYW4gZW1wdHkgdmFsdWUgdG8gbWFrZSBjbGVhbnVwIGVhc2llclxuXG4gIGZ1bmN0aW9uIGNvbnRleHRMaW5lcyhsaW5lcykge1xuICAgIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24oZW50cnkpIHsgcmV0dXJuICcgJyArIGVudHJ5OyB9KTtcbiAgfVxuXG4gIGxldCBodW5rcyA9IFtdO1xuICBsZXQgb2xkUmFuZ2VTdGFydCA9IDAsIG5ld1JhbmdlU3RhcnQgPSAwLCBjdXJSYW5nZSA9IFtdLFxuICAgICAgb2xkTGluZSA9IDEsIG5ld0xpbmUgPSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmYubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gZGlmZltpXSxcbiAgICAgICAgICBsaW5lcyA9IGN1cnJlbnQubGluZXMgfHwgY3VycmVudC52YWx1ZS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKTtcbiAgICBjdXJyZW50LmxpbmVzID0gbGluZXM7XG5cbiAgICBpZiAoY3VycmVudC5hZGRlZCB8fCBjdXJyZW50LnJlbW92ZWQpIHtcbiAgICAgIC8vIElmIHdlIGhhdmUgcHJldmlvdXMgY29udGV4dCwgc3RhcnQgd2l0aCB0aGF0XG4gICAgICBpZiAoIW9sZFJhbmdlU3RhcnQpIHtcbiAgICAgICAgY29uc3QgcHJldiA9IGRpZmZbaSAtIDFdO1xuICAgICAgICBvbGRSYW5nZVN0YXJ0ID0gb2xkTGluZTtcbiAgICAgICAgbmV3UmFuZ2VTdGFydCA9IG5ld0xpbmU7XG5cbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICBjdXJSYW5nZSA9IG9wdGlvbnMuY29udGV4dCA+IDAgPyBjb250ZXh0TGluZXMocHJldi5saW5lcy5zbGljZSgtb3B0aW9ucy5jb250ZXh0KSkgOiBbXTtcbiAgICAgICAgICBvbGRSYW5nZVN0YXJ0IC09IGN1clJhbmdlLmxlbmd0aDtcbiAgICAgICAgICBuZXdSYW5nZVN0YXJ0IC09IGN1clJhbmdlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBPdXRwdXQgb3VyIGNoYW5nZXNcbiAgICAgIGN1clJhbmdlLnB1c2goLi4uIGxpbmVzLm1hcChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICByZXR1cm4gKGN1cnJlbnQuYWRkZWQgPyAnKycgOiAnLScpICsgZW50cnk7XG4gICAgICB9KSk7XG5cbiAgICAgIC8vIFRyYWNrIHRoZSB1cGRhdGVkIGZpbGUgcG9zaXRpb25cbiAgICAgIGlmIChjdXJyZW50LmFkZGVkKSB7XG4gICAgICAgIG5ld0xpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2xkTGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElkZW50aWNhbCBjb250ZXh0IGxpbmVzLiBUcmFjayBsaW5lIGNoYW5nZXNcbiAgICAgIGlmIChvbGRSYW5nZVN0YXJ0KSB7XG4gICAgICAgIC8vIENsb3NlIG91dCBhbnkgY2hhbmdlcyB0aGF0IGhhdmUgYmVlbiBvdXRwdXQgKG9yIGpvaW4gb3ZlcmxhcHBpbmcpXG4gICAgICAgIGlmIChsaW5lcy5sZW5ndGggPD0gb3B0aW9ucy5jb250ZXh0ICogMiAmJiBpIDwgZGlmZi5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgLy8gT3ZlcmxhcHBpbmdcbiAgICAgICAgICBjdXJSYW5nZS5wdXNoKC4uLiBjb250ZXh0TGluZXMobGluZXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlbmQgdGhlIHJhbmdlIGFuZCBvdXRwdXRcbiAgICAgICAgICBsZXQgY29udGV4dFNpemUgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIG9wdGlvbnMuY29udGV4dCk7XG4gICAgICAgICAgY3VyUmFuZ2UucHVzaCguLi4gY29udGV4dExpbmVzKGxpbmVzLnNsaWNlKDAsIGNvbnRleHRTaXplKSkpO1xuXG4gICAgICAgICAgbGV0IGh1bmsgPSB7XG4gICAgICAgICAgICBvbGRTdGFydDogb2xkUmFuZ2VTdGFydCxcbiAgICAgICAgICAgIG9sZExpbmVzOiAob2xkTGluZSAtIG9sZFJhbmdlU3RhcnQgKyBjb250ZXh0U2l6ZSksXG4gICAgICAgICAgICBuZXdTdGFydDogbmV3UmFuZ2VTdGFydCxcbiAgICAgICAgICAgIG5ld0xpbmVzOiAobmV3TGluZSAtIG5ld1JhbmdlU3RhcnQgKyBjb250ZXh0U2l6ZSksXG4gICAgICAgICAgICBsaW5lczogY3VyUmFuZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChpID49IGRpZmYubGVuZ3RoIC0gMiAmJiBsaW5lcy5sZW5ndGggPD0gb3B0aW9ucy5jb250ZXh0KSB7XG4gICAgICAgICAgICAvLyBFT0YgaXMgaW5zaWRlIHRoaXMgaHVua1xuICAgICAgICAgICAgbGV0IG9sZEVPRk5ld2xpbmUgPSAoL1xcbiQvLnRlc3Qob2xkU3RyKSk7XG4gICAgICAgICAgICBsZXQgbmV3RU9GTmV3bGluZSA9ICgvXFxuJC8udGVzdChuZXdTdHIpKTtcbiAgICAgICAgICAgIGlmIChsaW5lcy5sZW5ndGggPT0gMCAmJiAhb2xkRU9GTmV3bGluZSkge1xuICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IG9sZCBoYXMgbm8gZW9sIGFuZCBubyB0cmFpbGluZyBjb250ZXh0OyBuby1ubCBjYW4gZW5kIHVwIGJlZm9yZSBhZGRzXG4gICAgICAgICAgICAgIGN1clJhbmdlLnNwbGljZShodW5rLm9sZExpbmVzLCAwLCAnXFxcXCBObyBuZXdsaW5lIGF0IGVuZCBvZiBmaWxlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFvbGRFT0ZOZXdsaW5lIHx8ICFuZXdFT0ZOZXdsaW5lKSB7XG4gICAgICAgICAgICAgIGN1clJhbmdlLnB1c2goJ1xcXFwgTm8gbmV3bGluZSBhdCBlbmQgb2YgZmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBodW5rcy5wdXNoKGh1bmspO1xuXG4gICAgICAgICAgb2xkUmFuZ2VTdGFydCA9IDA7XG4gICAgICAgICAgbmV3UmFuZ2VTdGFydCA9IDA7XG4gICAgICAgICAgY3VyUmFuZ2UgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2xkTGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgICBuZXdMaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9sZEZpbGVOYW1lOiBvbGRGaWxlTmFtZSwgbmV3RmlsZU5hbWU6IG5ld0ZpbGVOYW1lLFxuICAgIG9sZEhlYWRlcjogb2xkSGVhZGVyLCBuZXdIZWFkZXI6IG5ld0hlYWRlcixcbiAgICBodW5rczogaHVua3NcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVR3b0ZpbGVzUGF0Y2gob2xkRmlsZU5hbWUsIG5ld0ZpbGVOYW1lLCBvbGRTdHIsIG5ld1N0ciwgb2xkSGVhZGVyLCBuZXdIZWFkZXIsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGlmZiA9IHN0cnVjdHVyZWRQYXRjaChvbGRGaWxlTmFtZSwgbmV3RmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgcmV0ID0gW107XG4gIGlmIChvbGRGaWxlTmFtZSA9PSBuZXdGaWxlTmFtZSkge1xuICAgIHJldC5wdXNoKCdJbmRleDogJyArIG9sZEZpbGVOYW1lKTtcbiAgfVxuICByZXQucHVzaCgnPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICByZXQucHVzaCgnLS0tICcgKyBkaWZmLm9sZEZpbGVOYW1lICsgKHR5cGVvZiBkaWZmLm9sZEhlYWRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6ICdcXHQnICsgZGlmZi5vbGRIZWFkZXIpKTtcbiAgcmV0LnB1c2goJysrKyAnICsgZGlmZi5uZXdGaWxlTmFtZSArICh0eXBlb2YgZGlmZi5uZXdIZWFkZXIgPT09ICd1bmRlZmluZWQnID8gJycgOiAnXFx0JyArIGRpZmYubmV3SGVhZGVyKSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmLmh1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaHVuayA9IGRpZmYuaHVua3NbaV07XG4gICAgcmV0LnB1c2goXG4gICAgICAnQEAgLScgKyBodW5rLm9sZFN0YXJ0ICsgJywnICsgaHVuay5vbGRMaW5lc1xuICAgICAgKyAnICsnICsgaHVuay5uZXdTdGFydCArICcsJyArIGh1bmsubmV3TGluZXNcbiAgICAgICsgJyBAQCdcbiAgICApO1xuICAgIHJldC5wdXNoLmFwcGx5KHJldCwgaHVuay5saW5lcyk7XG4gIH1cblxuICByZXR1cm4gcmV0LmpvaW4oJ1xcbicpICsgJ1xcbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXRjaChmaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIHJldHVybiBjcmVhdGVUd29GaWxlc1BhdGNoKGZpbGVOYW1lLCBmaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKTtcbn1cbiJdfQ==
