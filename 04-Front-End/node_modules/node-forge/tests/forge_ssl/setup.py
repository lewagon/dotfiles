#!/usr/bin/env python

from distutils.core import setup, Extension

ssl = Extension('_forge_ssl',
        sources = ['forge/_ssl.c'])

setup (name = 'Forge SSL',
        version = '1.0',
        description = 'Python SSL with session cache support.',
        ext_modules = [ssl],
        py_modules = ['forge.ssl'])
