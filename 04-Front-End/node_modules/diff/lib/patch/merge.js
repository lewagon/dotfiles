/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/calcLineCount = calcLineCount;
/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = merge;

var /*istanbul ignore start*/_create = require('./create') /*istanbul ignore end*/;

var /*istanbul ignore start*/_parse = require('./parse') /*istanbul ignore end*/;

var /*istanbul ignore start*/_array = require('../util/array') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*istanbul ignore end*/function calcLineCount(hunk) {
  var conflicted = false;

  hunk.oldLines = 0;
  hunk.newLines = 0;

  hunk.lines.forEach(function (line) {
    if (typeof line !== 'string') {
      conflicted = true;
      return;
    }

    if (line[0] === '+' || line[0] === ' ') {
      hunk.newLines++;
    }
    if (line[0] === '-' || line[0] === ' ') {
      hunk.oldLines++;
    }
  });

  if (conflicted) {
    delete hunk.oldLines;
    delete hunk.newLines;
  }
}

function merge(mine, theirs, base) {
  mine = loadPatch(mine, base);
  theirs = loadPatch(theirs, base);

  var ret = {};

  // For index we just let it pass through as it doesn't have any necessary meaning.
  // Leaving sanity checks on this to the API consumer that may know more about the
  // meaning in their own context.
  if (mine.index || theirs.index) {
    ret.index = mine.index || theirs.index;
  }

  if (mine.newFileName || theirs.newFileName) {
    if (!fileNameChanged(mine)) {
      // No header or no change in ours, use theirs (and ours if theirs does not exist)
      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
      ret.newFileName = theirs.newFileName || mine.newFileName;
      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
      ret.newHeader = theirs.newHeader || mine.newHeader;
    } else if (!fileNameChanged(theirs)) {
      // No header or no change in theirs, use ours
      ret.oldFileName = mine.oldFileName;
      ret.newFileName = mine.newFileName;
      ret.oldHeader = mine.oldHeader;
      ret.newHeader = mine.newHeader;
    } else {
      // Both changed... figure it out
      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
    }
  }

  ret.hunks = [];

  var mineIndex = 0,
      theirsIndex = 0,
      mineOffset = 0,
      theirsOffset = 0;

  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
    var mineCurrent = mine.hunks[mineIndex] || { oldStart: Infinity },
        theirsCurrent = theirs.hunks[theirsIndex] || { oldStart: Infinity };

    if (hunkBefore(mineCurrent, theirsCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
      mineIndex++;
      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
      // This patch does not overlap with any of the others, yay.
      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
      theirsIndex++;
      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
    } else {
      // Overlap, merge as best we can
      var mergedHunk = {
        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
        oldLines: 0,
        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
        newLines: 0,
        lines: []
      };
      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
      theirsIndex++;
      mineIndex++;

      ret.hunks.push(mergedHunk);
    }
  }

  return ret;
}

function loadPatch(param, base) {
  if (typeof param === 'string') {
    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
      return (/*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(param)[0]
      );
    }

    if (!base) {
      throw new Error('Must provide a base reference or pass in a patch');
    }
    return (/*istanbul ignore start*/(0, _create.structuredPatch) /*istanbul ignore end*/(undefined, undefined, base, param)
    );
  }

  return param;
}

function fileNameChanged(patch) {
  return patch.newFileName && patch.newFileName !== patch.oldFileName;
}

function selectField(index, mine, theirs) {
  if (mine === theirs) {
    return mine;
  } else {
    index.conflict = true;
    return { mine: mine, theirs: theirs };
  }
}

function hunkBefore(test, check) {
  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
}

function cloneHunk(hunk, offset) {
  return {
    oldStart: hunk.oldStart, oldLines: hunk.oldLines,
    newStart: hunk.newStart + offset, newLines: hunk.newLines,
    lines: hunk.lines
  };
}

function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
  // This will generally result in a conflicted hunk, but there are cases where the context
  // is the only overlap where we can successfully merge the content here.
  var mine = { offset: mineOffset, lines: mineLines, index: 0 },
      their = { offset: theirOffset, lines: theirLines, index: 0 };

  // Handle any leading content
  insertLeading(hunk, mine, their);
  insertLeading(hunk, their, mine);

  // Now in the overlap content. Scan through and select the best changes from each.
  while (mine.index < mine.lines.length && their.index < their.lines.length) {
    var mineCurrent = mine.lines[mine.index],
        theirCurrent = their.lines[their.index];

    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
      // Both modified ...
      mutualChange(hunk, mine, their);
    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
      /*istanbul ignore start*/
      var _hunk$lines;

      /*istanbul ignore end*/
      // Mine inserted
      /*istanbul ignore start*/(_hunk$lines = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(mine)));
    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
      /*istanbul ignore start*/
      var _hunk$lines2;

      /*istanbul ignore end*/
      // Theirs inserted
      /*istanbul ignore start*/(_hunk$lines2 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(their)));
    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
      // Mine removed or edited
      removal(hunk, mine, their);
    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
      // Their removed or edited
      removal(hunk, their, mine, true);
    } else if (mineCurrent === theirCurrent) {
      // Context identity
      hunk.lines.push(mineCurrent);
      mine.index++;
      their.index++;
    } else {
      // Context mismatch
      conflict(hunk, collectChange(mine), collectChange(their));
    }
  }

  // Now push anything that may be remaining
  insertTrailing(hunk, mine);
  insertTrailing(hunk, their);

  calcLineCount(hunk);
}

function mutualChange(hunk, mine, their) {
  var myChanges = collectChange(mine),
      theirChanges = collectChange(their);

  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
    // Special case for remove changes that are supersets of one another
    if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
      /*istanbul ignore start*/
      var _hunk$lines3;

      /*istanbul ignore end*/
      /*istanbul ignore start*/(_hunk$lines3 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
      return;
    } else if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
      /*istanbul ignore start*/
      var _hunk$lines4;

      /*istanbul ignore end*/
      /*istanbul ignore start*/(_hunk$lines4 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines4 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges));
      return;
    }
  } else if ( /*istanbul ignore start*/(0, _array.arrayEqual) /*istanbul ignore end*/(myChanges, theirChanges)) {
    /*istanbul ignore start*/
    var _hunk$lines5;

    /*istanbul ignore end*/
    /*istanbul ignore start*/(_hunk$lines5 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines5 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
    return;
  }

  conflict(hunk, myChanges, theirChanges);
}

function removal(hunk, mine, their, swap) {
  var myChanges = collectChange(mine),
      theirChanges = collectContext(their, myChanges);
  if (theirChanges.merged) {
    /*istanbul ignore start*/
    var _hunk$lines6;

    /*istanbul ignore end*/
    /*istanbul ignore start*/(_hunk$lines6 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines6 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges.merged));
  } else {
    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
  }
}

function conflict(hunk, mine, their) {
  hunk.conflict = true;
  hunk.lines.push({
    conflict: true,
    mine: mine,
    theirs: their
  });
}

function insertLeading(hunk, insert, their) {
  while (insert.offset < their.offset && insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
    insert.offset++;
  }
}
function insertTrailing(hunk, insert) {
  while (insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
  }
}

function collectChange(state) {
  var ret = [],
      operation = state.lines[state.index][0];
  while (state.index < state.lines.length) {
    var line = state.lines[state.index];

    // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.
    if (operation === '-' && line[0] === '+') {
      operation = '+';
    }

    if (operation === line[0]) {
      ret.push(line);
      state.index++;
    } else {
      break;
    }
  }

  return ret;
}
function collectContext(state, matchChanges) {
  var changes = [],
      merged = [],
      matchIndex = 0,
      contextChanges = false,
      conflicted = false;
  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
    var change = state.lines[state.index],
        match = matchChanges[matchIndex];

    // Once we've hit our add, then we are done
    if (match[0] === '+') {
      break;
    }

    contextChanges = contextChanges || change[0] !== ' ';

    merged.push(match);
    matchIndex++;

    // Consume any additions in the other block as a conflict to attempt
    // to pull in the remaining context after this
    if (change[0] === '+') {
      conflicted = true;

      while (change[0] === '+') {
        changes.push(change);
        change = state.lines[++state.index];
      }
    }

    if (match.substr(1) === change.substr(1)) {
      changes.push(change);
      state.index++;
    } else {
      conflicted = true;
    }
  }

  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
    conflicted = true;
  }

  if (conflicted) {
    return changes;
  }

  while (matchIndex < matchChanges.length) {
    merged.push(matchChanges[matchIndex++]);
  }

  return {
    merged: merged,
    changes: changes
  };
}

function allRemoves(changes) {
  return changes.reduce(function (prev, change) {
    return prev && change[0] === '-';
  }, true);
}
function skipRemoveSuperset(state, removeChanges, delta) {
  for (var i = 0; i < delta; i++) {
    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
    if (state.lines[state.index + i] !== ' ' + changeContent) {
      return false;
    }
  }

  state.index += delta;
  return true;
}
//# sourceMappingURL=data:application/json;base64,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ZmlsZSI6Im1lcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzdHJ1Y3R1cmVkUGF0Y2h9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7cGFyc2VQYXRjaH0gZnJvbSAnLi9wYXJzZSc7XG5cbmltcG9ydCB7YXJyYXlFcXVhbCwgYXJyYXlTdGFydHNXaXRofSBmcm9tICcuLi91dGlsL2FycmF5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNMaW5lQ291bnQoaHVuaykge1xuICBsZXQgY29uZmxpY3RlZCA9IGZhbHNlO1xuXG4gIGh1bmsub2xkTGluZXMgPSAwO1xuICBodW5rLm5ld0xpbmVzID0gMDtcblxuICBodW5rLmxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgIGlmICh0eXBlb2YgbGluZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZsaWN0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChsaW5lWzBdID09PSAnKycgfHwgbGluZVswXSA9PT0gJyAnKSB7XG4gICAgICBodW5rLm5ld0xpbmVzKys7XG4gICAgfVxuICAgIGlmIChsaW5lWzBdID09PSAnLScgfHwgbGluZVswXSA9PT0gJyAnKSB7XG4gICAgICBodW5rLm9sZExpbmVzKys7XG4gICAgfVxuICB9KTtcblxuICBpZiAoY29uZmxpY3RlZCkge1xuICAgIGRlbGV0ZSBodW5rLm9sZExpbmVzO1xuICAgIGRlbGV0ZSBodW5rLm5ld0xpbmVzO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShtaW5lLCB0aGVpcnMsIGJhc2UpIHtcbiAgbWluZSA9IGxvYWRQYXRjaChtaW5lLCBiYXNlKTtcbiAgdGhlaXJzID0gbG9hZFBhdGNoKHRoZWlycywgYmFzZSk7XG5cbiAgbGV0IHJldCA9IHt9O1xuXG4gIC8vIEZvciBpbmRleCB3ZSBqdXN0IGxldCBpdCBwYXNzIHRocm91Z2ggYXMgaXQgZG9lc24ndCBoYXZlIGFueSBuZWNlc3NhcnkgbWVhbmluZy5cbiAgLy8gTGVhdmluZyBzYW5pdHkgY2hlY2tzIG9uIHRoaXMgdG8gdGhlIEFQSSBjb25zdW1lciB0aGF0IG1heSBrbm93IG1vcmUgYWJvdXQgdGhlXG4gIC8vIG1lYW5pbmcgaW4gdGhlaXIgb3duIGNvbnRleHQuXG4gIGlmIChtaW5lLmluZGV4IHx8IHRoZWlycy5pbmRleCkge1xuICAgIHJldC5pbmRleCA9IG1pbmUuaW5kZXggfHwgdGhlaXJzLmluZGV4O1xuICB9XG5cbiAgaWYgKG1pbmUubmV3RmlsZU5hbWUgfHwgdGhlaXJzLm5ld0ZpbGVOYW1lKSB7XG4gICAgaWYgKCFmaWxlTmFtZUNoYW5nZWQobWluZSkpIHtcbiAgICAgIC8vIE5vIGhlYWRlciBvciBubyBjaGFuZ2UgaW4gb3VycywgdXNlIHRoZWlycyAoYW5kIG91cnMgaWYgdGhlaXJzIGRvZXMgbm90IGV4aXN0KVxuICAgICAgcmV0Lm9sZEZpbGVOYW1lID0gdGhlaXJzLm9sZEZpbGVOYW1lIHx8IG1pbmUub2xkRmlsZU5hbWU7XG4gICAgICByZXQubmV3RmlsZU5hbWUgPSB0aGVpcnMubmV3RmlsZU5hbWUgfHwgbWluZS5uZXdGaWxlTmFtZTtcbiAgICAgIHJldC5vbGRIZWFkZXIgPSB0aGVpcnMub2xkSGVhZGVyIHx8IG1pbmUub2xkSGVhZGVyO1xuICAgICAgcmV0Lm5ld0hlYWRlciA9IHRoZWlycy5uZXdIZWFkZXIgfHwgbWluZS5uZXdIZWFkZXI7XG4gICAgfSBlbHNlIGlmICghZmlsZU5hbWVDaGFuZ2VkKHRoZWlycykpIHtcbiAgICAgIC8vIE5vIGhlYWRlciBvciBubyBjaGFuZ2UgaW4gdGhlaXJzLCB1c2Ugb3Vyc1xuICAgICAgcmV0Lm9sZEZpbGVOYW1lID0gbWluZS5vbGRGaWxlTmFtZTtcbiAgICAgIHJldC5uZXdGaWxlTmFtZSA9IG1pbmUubmV3RmlsZU5hbWU7XG4gICAgICByZXQub2xkSGVhZGVyID0gbWluZS5vbGRIZWFkZXI7XG4gICAgICByZXQubmV3SGVhZGVyID0gbWluZS5uZXdIZWFkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJvdGggY2hhbmdlZC4uLiBmaWd1cmUgaXQgb3V0XG4gICAgICByZXQub2xkRmlsZU5hbWUgPSBzZWxlY3RGaWVsZChyZXQsIG1pbmUub2xkRmlsZU5hbWUsIHRoZWlycy5vbGRGaWxlTmFtZSk7XG4gICAgICByZXQubmV3RmlsZU5hbWUgPSBzZWxlY3RGaWVsZChyZXQsIG1pbmUubmV3RmlsZU5hbWUsIHRoZWlycy5uZXdGaWxlTmFtZSk7XG4gICAgICByZXQub2xkSGVhZGVyID0gc2VsZWN0RmllbGQocmV0LCBtaW5lLm9sZEhlYWRlciwgdGhlaXJzLm9sZEhlYWRlcik7XG4gICAgICByZXQubmV3SGVhZGVyID0gc2VsZWN0RmllbGQocmV0LCBtaW5lLm5ld0hlYWRlciwgdGhlaXJzLm5ld0hlYWRlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0Lmh1bmtzID0gW107XG5cbiAgbGV0IG1pbmVJbmRleCA9IDAsXG4gICAgICB0aGVpcnNJbmRleCA9IDAsXG4gICAgICBtaW5lT2Zmc2V0ID0gMCxcbiAgICAgIHRoZWlyc09mZnNldCA9IDA7XG5cbiAgd2hpbGUgKG1pbmVJbmRleCA8IG1pbmUuaHVua3MubGVuZ3RoIHx8IHRoZWlyc0luZGV4IDwgdGhlaXJzLmh1bmtzLmxlbmd0aCkge1xuICAgIGxldCBtaW5lQ3VycmVudCA9IG1pbmUuaHVua3NbbWluZUluZGV4XSB8fCB7b2xkU3RhcnQ6IEluZmluaXR5fSxcbiAgICAgICAgdGhlaXJzQ3VycmVudCA9IHRoZWlycy5odW5rc1t0aGVpcnNJbmRleF0gfHwge29sZFN0YXJ0OiBJbmZpbml0eX07XG5cbiAgICBpZiAoaHVua0JlZm9yZShtaW5lQ3VycmVudCwgdGhlaXJzQ3VycmVudCkpIHtcbiAgICAgIC8vIFRoaXMgcGF0Y2ggZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIGFueSBvZiB0aGUgb3RoZXJzLCB5YXkuXG4gICAgICByZXQuaHVua3MucHVzaChjbG9uZUh1bmsobWluZUN1cnJlbnQsIG1pbmVPZmZzZXQpKTtcbiAgICAgIG1pbmVJbmRleCsrO1xuICAgICAgdGhlaXJzT2Zmc2V0ICs9IG1pbmVDdXJyZW50Lm5ld0xpbmVzIC0gbWluZUN1cnJlbnQub2xkTGluZXM7XG4gICAgfSBlbHNlIGlmIChodW5rQmVmb3JlKHRoZWlyc0N1cnJlbnQsIG1pbmVDdXJyZW50KSkge1xuICAgICAgLy8gVGhpcyBwYXRjaCBkb2VzIG5vdCBvdmVybGFwIHdpdGggYW55IG9mIHRoZSBvdGhlcnMsIHlheS5cbiAgICAgIHJldC5odW5rcy5wdXNoKGNsb25lSHVuayh0aGVpcnNDdXJyZW50LCB0aGVpcnNPZmZzZXQpKTtcbiAgICAgIHRoZWlyc0luZGV4Kys7XG4gICAgICBtaW5lT2Zmc2V0ICs9IHRoZWlyc0N1cnJlbnQubmV3TGluZXMgLSB0aGVpcnNDdXJyZW50Lm9sZExpbmVzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdmVybGFwLCBtZXJnZSBhcyBiZXN0IHdlIGNhblxuICAgICAgbGV0IG1lcmdlZEh1bmsgPSB7XG4gICAgICAgIG9sZFN0YXJ0OiBNYXRoLm1pbihtaW5lQ3VycmVudC5vbGRTdGFydCwgdGhlaXJzQ3VycmVudC5vbGRTdGFydCksXG4gICAgICAgIG9sZExpbmVzOiAwLFxuICAgICAgICBuZXdTdGFydDogTWF0aC5taW4obWluZUN1cnJlbnQubmV3U3RhcnQgKyBtaW5lT2Zmc2V0LCB0aGVpcnNDdXJyZW50Lm9sZFN0YXJ0ICsgdGhlaXJzT2Zmc2V0KSxcbiAgICAgICAgbmV3TGluZXM6IDAsXG4gICAgICAgIGxpbmVzOiBbXVxuICAgICAgfTtcbiAgICAgIG1lcmdlTGluZXMobWVyZ2VkSHVuaywgbWluZUN1cnJlbnQub2xkU3RhcnQsIG1pbmVDdXJyZW50LmxpbmVzLCB0aGVpcnNDdXJyZW50Lm9sZFN0YXJ0LCB0aGVpcnNDdXJyZW50LmxpbmVzKTtcbiAgICAgIHRoZWlyc0luZGV4Kys7XG4gICAgICBtaW5lSW5kZXgrKztcblxuICAgICAgcmV0Lmh1bmtzLnB1c2gobWVyZ2VkSHVuayk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gbG9hZFBhdGNoKHBhcmFtLCBiYXNlKSB7XG4gIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKC9eQEAvbS50ZXN0KHBhcmFtKSB8fCAoL15JbmRleDovbS50ZXN0KHBhcmFtKSkpIHtcbiAgICAgIHJldHVybiBwYXJzZVBhdGNoKHBhcmFtKVswXTtcbiAgICB9XG5cbiAgICBpZiAoIWJhc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBwcm92aWRlIGEgYmFzZSByZWZlcmVuY2Ugb3IgcGFzcyBpbiBhIHBhdGNoJyk7XG4gICAgfVxuICAgIHJldHVybiBzdHJ1Y3R1cmVkUGF0Y2godW5kZWZpbmVkLCB1bmRlZmluZWQsIGJhc2UsIHBhcmFtKTtcbiAgfVxuXG4gIHJldHVybiBwYXJhbTtcbn1cblxuZnVuY3Rpb24gZmlsZU5hbWVDaGFuZ2VkKHBhdGNoKSB7XG4gIHJldHVybiBwYXRjaC5uZXdGaWxlTmFtZSAmJiBwYXRjaC5uZXdGaWxlTmFtZSAhPT0gcGF0Y2gub2xkRmlsZU5hbWU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEZpZWxkKGluZGV4LCBtaW5lLCB0aGVpcnMpIHtcbiAgaWYgKG1pbmUgPT09IHRoZWlycykge1xuICAgIHJldHVybiBtaW5lO1xuICB9IGVsc2Uge1xuICAgIGluZGV4LmNvbmZsaWN0ID0gdHJ1ZTtcbiAgICByZXR1cm4ge21pbmUsIHRoZWlyc307XG4gIH1cbn1cblxuZnVuY3Rpb24gaHVua0JlZm9yZSh0ZXN0LCBjaGVjaykge1xuICByZXR1cm4gdGVzdC5vbGRTdGFydCA8IGNoZWNrLm9sZFN0YXJ0XG4gICAgJiYgKHRlc3Qub2xkU3RhcnQgKyB0ZXN0Lm9sZExpbmVzKSA8IGNoZWNrLm9sZFN0YXJ0O1xufVxuXG5mdW5jdGlvbiBjbG9uZUh1bmsoaHVuaywgb2Zmc2V0KSB7XG4gIHJldHVybiB7XG4gICAgb2xkU3RhcnQ6IGh1bmsub2xkU3RhcnQsIG9sZExpbmVzOiBodW5rLm9sZExpbmVzLFxuICAgIG5ld1N0YXJ0OiBodW5rLm5ld1N0YXJ0ICsgb2Zmc2V0LCBuZXdMaW5lczogaHVuay5uZXdMaW5lcyxcbiAgICBsaW5lczogaHVuay5saW5lc1xuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZUxpbmVzKGh1bmssIG1pbmVPZmZzZXQsIG1pbmVMaW5lcywgdGhlaXJPZmZzZXQsIHRoZWlyTGluZXMpIHtcbiAgLy8gVGhpcyB3aWxsIGdlbmVyYWxseSByZXN1bHQgaW4gYSBjb25mbGljdGVkIGh1bmssIGJ1dCB0aGVyZSBhcmUgY2FzZXMgd2hlcmUgdGhlIGNvbnRleHRcbiAgLy8gaXMgdGhlIG9ubHkgb3ZlcmxhcCB3aGVyZSB3ZSBjYW4gc3VjY2Vzc2Z1bGx5IG1lcmdlIHRoZSBjb250ZW50IGhlcmUuXG4gIGxldCBtaW5lID0ge29mZnNldDogbWluZU9mZnNldCwgbGluZXM6IG1pbmVMaW5lcywgaW5kZXg6IDB9LFxuICAgICAgdGhlaXIgPSB7b2Zmc2V0OiB0aGVpck9mZnNldCwgbGluZXM6IHRoZWlyTGluZXMsIGluZGV4OiAwfTtcblxuICAvLyBIYW5kbGUgYW55IGxlYWRpbmcgY29udGVudFxuICBpbnNlcnRMZWFkaW5nKGh1bmssIG1pbmUsIHRoZWlyKTtcbiAgaW5zZXJ0TGVhZGluZyhodW5rLCB0aGVpciwgbWluZSk7XG5cbiAgLy8gTm93IGluIHRoZSBvdmVybGFwIGNvbnRlbnQuIFNjYW4gdGhyb3VnaCBhbmQgc2VsZWN0IHRoZSBiZXN0IGNoYW5nZXMgZnJvbSBlYWNoLlxuICB3aGlsZSAobWluZS5pbmRleCA8IG1pbmUubGluZXMubGVuZ3RoICYmIHRoZWlyLmluZGV4IDwgdGhlaXIubGluZXMubGVuZ3RoKSB7XG4gICAgbGV0IG1pbmVDdXJyZW50ID0gbWluZS5saW5lc1ttaW5lLmluZGV4XSxcbiAgICAgICAgdGhlaXJDdXJyZW50ID0gdGhlaXIubGluZXNbdGhlaXIuaW5kZXhdO1xuXG4gICAgaWYgKChtaW5lQ3VycmVudFswXSA9PT0gJy0nIHx8IG1pbmVDdXJyZW50WzBdID09PSAnKycpXG4gICAgICAgICYmICh0aGVpckN1cnJlbnRbMF0gPT09ICctJyB8fCB0aGVpckN1cnJlbnRbMF0gPT09ICcrJykpIHtcbiAgICAgIC8vIEJvdGggbW9kaWZpZWQgLi4uXG4gICAgICBtdXR1YWxDaGFuZ2UoaHVuaywgbWluZSwgdGhlaXIpO1xuICAgIH0gZWxzZSBpZiAobWluZUN1cnJlbnRbMF0gPT09ICcrJyAmJiB0aGVpckN1cnJlbnRbMF0gPT09ICcgJykge1xuICAgICAgLy8gTWluZSBpbnNlcnRlZFxuICAgICAgaHVuay5saW5lcy5wdXNoKC4uLiBjb2xsZWN0Q2hhbmdlKG1pbmUpKTtcbiAgICB9IGVsc2UgaWYgKHRoZWlyQ3VycmVudFswXSA9PT0gJysnICYmIG1pbmVDdXJyZW50WzBdID09PSAnICcpIHtcbiAgICAgIC8vIFRoZWlycyBpbnNlcnRlZFxuICAgICAgaHVuay5saW5lcy5wdXNoKC4uLiBjb2xsZWN0Q2hhbmdlKHRoZWlyKSk7XG4gICAgfSBlbHNlIGlmIChtaW5lQ3VycmVudFswXSA9PT0gJy0nICYmIHRoZWlyQ3VycmVudFswXSA9PT0gJyAnKSB7XG4gICAgICAvLyBNaW5lIHJlbW92ZWQgb3IgZWRpdGVkXG4gICAgICByZW1vdmFsKGh1bmssIG1pbmUsIHRoZWlyKTtcbiAgICB9IGVsc2UgaWYgKHRoZWlyQ3VycmVudFswXSA9PT0gJy0nICYmIG1pbmVDdXJyZW50WzBdID09PSAnICcpIHtcbiAgICAgIC8vIFRoZWlyIHJlbW92ZWQgb3IgZWRpdGVkXG4gICAgICByZW1vdmFsKGh1bmssIHRoZWlyLCBtaW5lLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKG1pbmVDdXJyZW50ID09PSB0aGVpckN1cnJlbnQpIHtcbiAgICAgIC8vIENvbnRleHQgaWRlbnRpdHlcbiAgICAgIGh1bmsubGluZXMucHVzaChtaW5lQ3VycmVudCk7XG4gICAgICBtaW5lLmluZGV4Kys7XG4gICAgICB0aGVpci5pbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDb250ZXh0IG1pc21hdGNoXG4gICAgICBjb25mbGljdChodW5rLCBjb2xsZWN0Q2hhbmdlKG1pbmUpLCBjb2xsZWN0Q2hhbmdlKHRoZWlyKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTm93IHB1c2ggYW55dGhpbmcgdGhhdCBtYXkgYmUgcmVtYWluaW5nXG4gIGluc2VydFRyYWlsaW5nKGh1bmssIG1pbmUpO1xuICBpbnNlcnRUcmFpbGluZyhodW5rLCB0aGVpcik7XG5cbiAgY2FsY0xpbmVDb3VudChodW5rKTtcbn1cblxuZnVuY3Rpb24gbXV0dWFsQ2hhbmdlKGh1bmssIG1pbmUsIHRoZWlyKSB7XG4gIGxldCBteUNoYW5nZXMgPSBjb2xsZWN0Q2hhbmdlKG1pbmUpLFxuICAgICAgdGhlaXJDaGFuZ2VzID0gY29sbGVjdENoYW5nZSh0aGVpcik7XG5cbiAgaWYgKGFsbFJlbW92ZXMobXlDaGFuZ2VzKSAmJiBhbGxSZW1vdmVzKHRoZWlyQ2hhbmdlcykpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHJlbW92ZSBjaGFuZ2VzIHRoYXQgYXJlIHN1cGVyc2V0cyBvZiBvbmUgYW5vdGhlclxuICAgIGlmIChhcnJheVN0YXJ0c1dpdGgobXlDaGFuZ2VzLCB0aGVpckNoYW5nZXMpXG4gICAgICAgICYmIHNraXBSZW1vdmVTdXBlcnNldCh0aGVpciwgbXlDaGFuZ2VzLCBteUNoYW5nZXMubGVuZ3RoIC0gdGhlaXJDaGFuZ2VzLmxlbmd0aCkpIHtcbiAgICAgIGh1bmsubGluZXMucHVzaCguLi4gbXlDaGFuZ2VzKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGFycmF5U3RhcnRzV2l0aCh0aGVpckNoYW5nZXMsIG15Q2hhbmdlcylcbiAgICAgICAgJiYgc2tpcFJlbW92ZVN1cGVyc2V0KG1pbmUsIHRoZWlyQ2hhbmdlcywgdGhlaXJDaGFuZ2VzLmxlbmd0aCAtIG15Q2hhbmdlcy5sZW5ndGgpKSB7XG4gICAgICBodW5rLmxpbmVzLnB1c2goLi4uIHRoZWlyQ2hhbmdlcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2UgaWYgKGFycmF5RXF1YWwobXlDaGFuZ2VzLCB0aGVpckNoYW5nZXMpKSB7XG4gICAgaHVuay5saW5lcy5wdXNoKC4uLiBteUNoYW5nZXMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbmZsaWN0KGh1bmssIG15Q2hhbmdlcywgdGhlaXJDaGFuZ2VzKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZhbChodW5rLCBtaW5lLCB0aGVpciwgc3dhcCkge1xuICBsZXQgbXlDaGFuZ2VzID0gY29sbGVjdENoYW5nZShtaW5lKSxcbiAgICAgIHRoZWlyQ2hhbmdlcyA9IGNvbGxlY3RDb250ZXh0KHRoZWlyLCBteUNoYW5nZXMpO1xuICBpZiAodGhlaXJDaGFuZ2VzLm1lcmdlZCkge1xuICAgIGh1bmsubGluZXMucHVzaCguLi4gdGhlaXJDaGFuZ2VzLm1lcmdlZCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmxpY3QoaHVuaywgc3dhcCA/IHRoZWlyQ2hhbmdlcyA6IG15Q2hhbmdlcywgc3dhcCA/IG15Q2hhbmdlcyA6IHRoZWlyQ2hhbmdlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29uZmxpY3QoaHVuaywgbWluZSwgdGhlaXIpIHtcbiAgaHVuay5jb25mbGljdCA9IHRydWU7XG4gIGh1bmsubGluZXMucHVzaCh7XG4gICAgY29uZmxpY3Q6IHRydWUsXG4gICAgbWluZTogbWluZSxcbiAgICB0aGVpcnM6IHRoZWlyXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRMZWFkaW5nKGh1bmssIGluc2VydCwgdGhlaXIpIHtcbiAgd2hpbGUgKGluc2VydC5vZmZzZXQgPCB0aGVpci5vZmZzZXQgJiYgaW5zZXJ0LmluZGV4IDwgaW5zZXJ0LmxpbmVzLmxlbmd0aCkge1xuICAgIGxldCBsaW5lID0gaW5zZXJ0LmxpbmVzW2luc2VydC5pbmRleCsrXTtcbiAgICBodW5rLmxpbmVzLnB1c2gobGluZSk7XG4gICAgaW5zZXJ0Lm9mZnNldCsrO1xuICB9XG59XG5mdW5jdGlvbiBpbnNlcnRUcmFpbGluZyhodW5rLCBpbnNlcnQpIHtcbiAgd2hpbGUgKGluc2VydC5pbmRleCA8IGluc2VydC5saW5lcy5sZW5ndGgpIHtcbiAgICBsZXQgbGluZSA9IGluc2VydC5saW5lc1tpbnNlcnQuaW5kZXgrK107XG4gICAgaHVuay5saW5lcy5wdXNoKGxpbmUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RDaGFuZ2Uoc3RhdGUpIHtcbiAgbGV0IHJldCA9IFtdLFxuICAgICAgb3BlcmF0aW9uID0gc3RhdGUubGluZXNbc3RhdGUuaW5kZXhdWzBdO1xuICB3aGlsZSAoc3RhdGUuaW5kZXggPCBzdGF0ZS5saW5lcy5sZW5ndGgpIHtcbiAgICBsZXQgbGluZSA9IHN0YXRlLmxpbmVzW3N0YXRlLmluZGV4XTtcblxuICAgIC8vIEdyb3VwIGFkZGl0aW9ucyB0aGF0IGFyZSBpbW1lZGlhdGVseSBhZnRlciBzdWJ0cmFjdGlvbnMgYW5kIHRyZWF0IHRoZW0gYXMgb25lIFwiYXRvbWljXCIgbW9kaWZ5IGNoYW5nZS5cbiAgICBpZiAob3BlcmF0aW9uID09PSAnLScgJiYgbGluZVswXSA9PT0gJysnKSB7XG4gICAgICBvcGVyYXRpb24gPSAnKyc7XG4gICAgfVxuXG4gICAgaWYgKG9wZXJhdGlvbiA9PT0gbGluZVswXSkge1xuICAgICAgcmV0LnB1c2gobGluZSk7XG4gICAgICBzdGF0ZS5pbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gY29sbGVjdENvbnRleHQoc3RhdGUsIG1hdGNoQ2hhbmdlcykge1xuICBsZXQgY2hhbmdlcyA9IFtdLFxuICAgICAgbWVyZ2VkID0gW10sXG4gICAgICBtYXRjaEluZGV4ID0gMCxcbiAgICAgIGNvbnRleHRDaGFuZ2VzID0gZmFsc2UsXG4gICAgICBjb25mbGljdGVkID0gZmFsc2U7XG4gIHdoaWxlIChtYXRjaEluZGV4IDwgbWF0Y2hDaGFuZ2VzLmxlbmd0aFxuICAgICAgICAmJiBzdGF0ZS5pbmRleCA8IHN0YXRlLmxpbmVzLmxlbmd0aCkge1xuICAgIGxldCBjaGFuZ2UgPSBzdGF0ZS5saW5lc1tzdGF0ZS5pbmRleF0sXG4gICAgICAgIG1hdGNoID0gbWF0Y2hDaGFuZ2VzW21hdGNoSW5kZXhdO1xuXG4gICAgLy8gT25jZSB3ZSd2ZSBoaXQgb3VyIGFkZCwgdGhlbiB3ZSBhcmUgZG9uZVxuICAgIGlmIChtYXRjaFswXSA9PT0gJysnKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb250ZXh0Q2hhbmdlcyA9IGNvbnRleHRDaGFuZ2VzIHx8IGNoYW5nZVswXSAhPT0gJyAnO1xuXG4gICAgbWVyZ2VkLnB1c2gobWF0Y2gpO1xuICAgIG1hdGNoSW5kZXgrKztcblxuICAgIC8vIENvbnN1bWUgYW55IGFkZGl0aW9ucyBpbiB0aGUgb3RoZXIgYmxvY2sgYXMgYSBjb25mbGljdCB0byBhdHRlbXB0XG4gICAgLy8gdG8gcHVsbCBpbiB0aGUgcmVtYWluaW5nIGNvbnRleHQgYWZ0ZXIgdGhpc1xuICAgIGlmIChjaGFuZ2VbMF0gPT09ICcrJykge1xuICAgICAgY29uZmxpY3RlZCA9IHRydWU7XG5cbiAgICAgIHdoaWxlIChjaGFuZ2VbMF0gPT09ICcrJykge1xuICAgICAgICBjaGFuZ2VzLnB1c2goY2hhbmdlKTtcbiAgICAgICAgY2hhbmdlID0gc3RhdGUubGluZXNbKytzdGF0ZS5pbmRleF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoLnN1YnN0cigxKSA9PT0gY2hhbmdlLnN1YnN0cigxKSkge1xuICAgICAgY2hhbmdlcy5wdXNoKGNoYW5nZSk7XG4gICAgICBzdGF0ZS5pbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25mbGljdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoKG1hdGNoQ2hhbmdlc1ttYXRjaEluZGV4XSB8fCAnJylbMF0gPT09ICcrJ1xuICAgICAgJiYgY29udGV4dENoYW5nZXMpIHtcbiAgICBjb25mbGljdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChjb25mbGljdGVkKSB7XG4gICAgcmV0dXJuIGNoYW5nZXM7XG4gIH1cblxuICB3aGlsZSAobWF0Y2hJbmRleCA8IG1hdGNoQ2hhbmdlcy5sZW5ndGgpIHtcbiAgICBtZXJnZWQucHVzaChtYXRjaENoYW5nZXNbbWF0Y2hJbmRleCsrXSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1lcmdlZCxcbiAgICBjaGFuZ2VzXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFsbFJlbW92ZXMoY2hhbmdlcykge1xuICByZXR1cm4gY2hhbmdlcy5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY2hhbmdlKSB7XG4gICAgcmV0dXJuIHByZXYgJiYgY2hhbmdlWzBdID09PSAnLSc7XG4gIH0sIHRydWUpO1xufVxuZnVuY3Rpb24gc2tpcFJlbW92ZVN1cGVyc2V0KHN0YXRlLCByZW1vdmVDaGFuZ2VzLCBkZWx0YSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbHRhOyBpKyspIHtcbiAgICBsZXQgY2hhbmdlQ29udGVudCA9IHJlbW92ZUNoYW5nZXNbcmVtb3ZlQ2hhbmdlcy5sZW5ndGggLSBkZWx0YSArIGldLnN1YnN0cigxKTtcbiAgICBpZiAoc3RhdGUubGluZXNbc3RhdGUuaW5kZXggKyBpXSAhPT0gJyAnICsgY2hhbmdlQ29udGVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLmluZGV4ICs9IGRlbHRhO1xuICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==
