/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/parsePatch = parsePatch;
function parsePatch(uniDiff) {
  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      list = [],
      i = 0;

  function parseIndex() {
    var index = {};
    list.push(index);

    // Parse diff metadata
    while (i < diffstr.length) {
      var line = diffstr[i];

      // File header found, end parsing diff metadata
      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      }

      // Diff index
      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
      if (header) {
        index.index = header[1];
      }

      i++;
    }

    // Parse file headers if they are defined. Unified diff requires them, but
    // there's no technical issues to have an isolated hunk without file header
    parseFileHeader(index);
    parseFileHeader(index);

    // Parse hunks
    index.hunks = [];

    while (i < diffstr.length) {
      var _line = diffstr[i];

      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else if (/^@@/.test(_line)) {
        index.hunks.push(parseHunk());
      } else if (_line && options.strict) {
        // Ignore unexpected content unless in strict mode
        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
      } else {
        i++;
      }
    }
  }

  // Parses the --- and +++ headers, if none are found, no lines
  // are consumed.
  function parseFileHeader(index) {
    var headerPattern = /^(---|\+\+\+)\s+([\S ]*)(?:\t(.*?)\s*)?$/;
    var fileHeader = headerPattern.exec(diffstr[i]);
    if (fileHeader) {
      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      index[keyPrefix + 'FileName'] = fileHeader[2];
      index[keyPrefix + 'Header'] = fileHeader[3];

      i++;
    }
  }

  // Parses a hunk
  // This assumes that we are at the start of a hunk.
  function parseHunk() {
    var chunkHeaderIndex = i,
        chunkHeaderLine = diffstr[i++],
        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);

    var hunk = {
      oldStart: +chunkHeader[1],
      oldLines: +chunkHeader[2] || 1,
      newStart: +chunkHeader[3],
      newLines: +chunkHeader[4] || 1,
      lines: [],
      linedelimiters: []
    };

    var addCount = 0,
        removeCount = 0;
    for (; i < diffstr.length; i++) {
      // Lines starting with '---' could be mistaken for the "remove line" operation
      // But they could be the header for the next file. Therefore prune such cases out.
      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
        break;
      }
      var operation = diffstr[i][0];

      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || '\n');

        if (operation === '+') {
          addCount++;
        } else if (operation === '-') {
          removeCount++;
        } else if (operation === ' ') {
          addCount++;
          removeCount++;
        }
      } else {
        break;
      }
    }

    // Handle the empty block count case
    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }
    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    }

    // Perform optional sanity checking
    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
      if (removeCount !== hunk.oldLines) {
        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
      }
    }

    return hunk;
  }

  while (i < diffstr.length) {
    parseIndex();
  }

  return list;
}
//# sourceMappingURL=data:application/json;base64,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LEtBQUosQ0FBVSx3REFBd0QsbUJBQW1CLENBQTNFLENBQVYsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBTyxJQUFJLFFBQVEsTUFBbkIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJwYXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhdGNoKHVuaURpZmYsIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgZGlmZnN0ciA9IHVuaURpZmYuc3BsaXQoL1xcclxcbnxbXFxuXFx2XFxmXFxyXFx4ODVdLyksXG4gICAgICBkZWxpbWl0ZXJzID0gdW5pRGlmZi5tYXRjaCgvXFxyXFxufFtcXG5cXHZcXGZcXHJcXHg4NV0vZykgfHwgW10sXG4gICAgICBsaXN0ID0gW10sXG4gICAgICBpID0gMDtcblxuICBmdW5jdGlvbiBwYXJzZUluZGV4KCkge1xuICAgIGxldCBpbmRleCA9IHt9O1xuICAgIGxpc3QucHVzaChpbmRleCk7XG5cbiAgICAvLyBQYXJzZSBkaWZmIG1ldGFkYXRhXG4gICAgd2hpbGUgKGkgPCBkaWZmc3RyLmxlbmd0aCkge1xuICAgICAgbGV0IGxpbmUgPSBkaWZmc3RyW2ldO1xuXG4gICAgICAvLyBGaWxlIGhlYWRlciBmb3VuZCwgZW5kIHBhcnNpbmcgZGlmZiBtZXRhZGF0YVxuICAgICAgaWYgKC9eKFxcLVxcLVxcLXxcXCtcXCtcXCt8QEApXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBEaWZmIGluZGV4XG4gICAgICBsZXQgaGVhZGVyID0gKC9eKD86SW5kZXg6fGRpZmYoPzogLXIgXFx3KykrKVxccysoLis/KVxccyokLykuZXhlYyhsaW5lKTtcbiAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgaW5kZXguaW5kZXggPSBoZWFkZXJbMV07XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICAvLyBQYXJzZSBmaWxlIGhlYWRlcnMgaWYgdGhleSBhcmUgZGVmaW5lZC4gVW5pZmllZCBkaWZmIHJlcXVpcmVzIHRoZW0sIGJ1dFxuICAgIC8vIHRoZXJlJ3Mgbm8gdGVjaG5pY2FsIGlzc3VlcyB0byBoYXZlIGFuIGlzb2xhdGVkIGh1bmsgd2l0aG91dCBmaWxlIGhlYWRlclxuICAgIHBhcnNlRmlsZUhlYWRlcihpbmRleCk7XG4gICAgcGFyc2VGaWxlSGVhZGVyKGluZGV4KTtcblxuICAgIC8vIFBhcnNlIGh1bmtzXG4gICAgaW5kZXguaHVua3MgPSBbXTtcblxuICAgIHdoaWxlIChpIDwgZGlmZnN0ci5sZW5ndGgpIHtcbiAgICAgIGxldCBsaW5lID0gZGlmZnN0cltpXTtcblxuICAgICAgaWYgKC9eKEluZGV4OnxkaWZmfFxcLVxcLVxcLXxcXCtcXCtcXCspXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICgvXkBALy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGluZGV4Lmh1bmtzLnB1c2gocGFyc2VIdW5rKCkpO1xuICAgICAgfSBlbHNlIGlmIChsaW5lICYmIG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIC8vIElnbm9yZSB1bmV4cGVjdGVkIGNvbnRlbnQgdW5sZXNzIGluIHN0cmljdCBtb2RlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsaW5lICcgKyAoaSArIDEpICsgJyAnICsgSlNPTi5zdHJpbmdpZnkobGluZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlcyB0aGUgLS0tIGFuZCArKysgaGVhZGVycywgaWYgbm9uZSBhcmUgZm91bmQsIG5vIGxpbmVzXG4gIC8vIGFyZSBjb25zdW1lZC5cbiAgZnVuY3Rpb24gcGFyc2VGaWxlSGVhZGVyKGluZGV4KSB7XG4gICAgY29uc3QgaGVhZGVyUGF0dGVybiA9IC9eKC0tLXxcXCtcXCtcXCspXFxzKyhbXFxTIF0qKSg/OlxcdCguKj8pXFxzKik/JC87XG4gICAgY29uc3QgZmlsZUhlYWRlciA9IGhlYWRlclBhdHRlcm4uZXhlYyhkaWZmc3RyW2ldKTtcbiAgICBpZiAoZmlsZUhlYWRlcikge1xuICAgICAgbGV0IGtleVByZWZpeCA9IGZpbGVIZWFkZXJbMV0gPT09ICctLS0nID8gJ29sZCcgOiAnbmV3JztcbiAgICAgIGluZGV4W2tleVByZWZpeCArICdGaWxlTmFtZSddID0gZmlsZUhlYWRlclsyXTtcbiAgICAgIGluZGV4W2tleVByZWZpeCArICdIZWFkZXInXSA9IGZpbGVIZWFkZXJbM107XG5cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICAvLyBQYXJzZXMgYSBodW5rXG4gIC8vIFRoaXMgYXNzdW1lcyB0aGF0IHdlIGFyZSBhdCB0aGUgc3RhcnQgb2YgYSBodW5rLlxuICBmdW5jdGlvbiBwYXJzZUh1bmsoKSB7XG4gICAgbGV0IGNodW5rSGVhZGVySW5kZXggPSBpLFxuICAgICAgICBjaHVua0hlYWRlckxpbmUgPSBkaWZmc3RyW2krK10sXG4gICAgICAgIGNodW5rSGVhZGVyID0gY2h1bmtIZWFkZXJMaW5lLnNwbGl0KC9AQCAtKFxcZCspKD86LChcXGQrKSk/IFxcKyhcXGQrKSg/OiwoXFxkKykpPyBAQC8pO1xuXG4gICAgbGV0IGh1bmsgPSB7XG4gICAgICBvbGRTdGFydDogK2NodW5rSGVhZGVyWzFdLFxuICAgICAgb2xkTGluZXM6ICtjaHVua0hlYWRlclsyXSB8fCAxLFxuICAgICAgbmV3U3RhcnQ6ICtjaHVua0hlYWRlclszXSxcbiAgICAgIG5ld0xpbmVzOiArY2h1bmtIZWFkZXJbNF0gfHwgMSxcbiAgICAgIGxpbmVzOiBbXSxcbiAgICAgIGxpbmVkZWxpbWl0ZXJzOiBbXVxuICAgIH07XG5cbiAgICBsZXQgYWRkQ291bnQgPSAwLFxuICAgICAgICByZW1vdmVDb3VudCA9IDA7XG4gICAgZm9yICg7IGkgPCBkaWZmc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoICctLS0nIGNvdWxkIGJlIG1pc3Rha2VuIGZvciB0aGUgXCJyZW1vdmUgbGluZVwiIG9wZXJhdGlvblxuICAgICAgLy8gQnV0IHRoZXkgY291bGQgYmUgdGhlIGhlYWRlciBmb3IgdGhlIG5leHQgZmlsZS4gVGhlcmVmb3JlIHBydW5lIHN1Y2ggY2FzZXMgb3V0LlxuICAgICAgaWYgKGRpZmZzdHJbaV0uaW5kZXhPZignLS0tICcpID09PSAwXG4gICAgICAgICAgICAmJiAoaSArIDIgPCBkaWZmc3RyLmxlbmd0aClcbiAgICAgICAgICAgICYmIGRpZmZzdHJbaSArIDFdLmluZGV4T2YoJysrKyAnKSA9PT0gMFxuICAgICAgICAgICAgJiYgZGlmZnN0cltpICsgMl0uaW5kZXhPZignQEAnKSA9PT0gMCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGV0IG9wZXJhdGlvbiA9IGRpZmZzdHJbaV1bMF07XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICcrJyB8fCBvcGVyYXRpb24gPT09ICctJyB8fCBvcGVyYXRpb24gPT09ICcgJyB8fCBvcGVyYXRpb24gPT09ICdcXFxcJykge1xuICAgICAgICBodW5rLmxpbmVzLnB1c2goZGlmZnN0cltpXSk7XG4gICAgICAgIGh1bmsubGluZWRlbGltaXRlcnMucHVzaChkZWxpbWl0ZXJzW2ldIHx8ICdcXG4nKTtcblxuICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgICBhZGRDb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJy0nKSB7XG4gICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICcgJykge1xuICAgICAgICAgIGFkZENvdW50Kys7XG4gICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRoZSBlbXB0eSBibG9jayBjb3VudCBjYXNlXG4gICAgaWYgKCFhZGRDb3VudCAmJiBodW5rLm5ld0xpbmVzID09PSAxKSB7XG4gICAgICBodW5rLm5ld0xpbmVzID0gMDtcbiAgICB9XG4gICAgaWYgKCFyZW1vdmVDb3VudCAmJiBodW5rLm9sZExpbmVzID09PSAxKSB7XG4gICAgICBodW5rLm9sZExpbmVzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIG9wdGlvbmFsIHNhbml0eSBjaGVja2luZ1xuICAgIGlmIChvcHRpb25zLnN0cmljdCkge1xuICAgICAgaWYgKGFkZENvdW50ICE9PSBodW5rLm5ld0xpbmVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWRkZWQgbGluZSBjb3VudCBkaWQgbm90IG1hdGNoIGZvciBodW5rIGF0IGxpbmUgJyArIChjaHVua0hlYWRlckluZGV4ICsgMSkpO1xuICAgICAgfVxuICAgICAgaWYgKHJlbW92ZUNvdW50ICE9PSBodW5rLm9sZExpbmVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVtb3ZlZCBsaW5lIGNvdW50IGRpZCBub3QgbWF0Y2ggZm9yIGh1bmsgYXQgbGluZSAnICsgKGNodW5rSGVhZGVySW5kZXggKyAxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bms7XG4gIH1cblxuICB3aGlsZSAoaSA8IGRpZmZzdHIubGVuZ3RoKSB7XG4gICAgcGFyc2VJbmRleCgpO1xuICB9XG5cbiAgcmV0dXJuIGxpc3Q7XG59XG4iXX0=
