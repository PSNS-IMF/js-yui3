# Psns.Common.Javascript.Yui3 [![NuGet Version](http://img.shields.io/nuget/v/Psns.Common.Javascript.Yui3.svg?style=flat)](https://www.nuget.org/packages/Psns.Common.Javascript.Yui3/) [![NuGet Downloads](http://img.shields.io/nuget/dt/Psns.Common.Javascript.Yui3.svg?style=flat)](https://www.nuget.org/packages/Psns.Common.Javascript.Yui3/)

**[YUI](http://yuilibrary.com/)**, an industrial-strength javascript library

## Required Prerequisites

	* Install YUI Locally for Development
	  * From the Git Bash command prompt, change to the Scripts directory:
		cd <Your Local Mvc Project Directory>/Scripts
	  * Then run these:
	    git clone http://github.com/yui/yui3
	    git clone http://github.com/yui/yui3-gallery

## Instructions
	* Install
		* The new files will be copied to the appropriate location with this path as the base: Scripts\yui3-gallery\build\<module name>
		* Files that are replaced with be copied into an archive folder: Scripts\yui3-gallery\build\<module name>\previous
	* Uninstall
		* Files in Scripts\yui3-gallery\build\<module name>\previous will be moved back into Scripts\yui3-gallery\build\<module name>
			over-writing the installed ones

## CI build status
[![Build Status](https://www.myget.org/BuildSource/Badge/)](https://www.myget.org/)