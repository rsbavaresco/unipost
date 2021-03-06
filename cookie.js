'use strict';

var cookie = module.exports = {} ;
var authCookieName = "AuthUser";

cookie.getCookies = (req) => {
	var list = {}, rc = req.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
};

cookie.getAuthCookie = (req) => {
	var list = cookie.getCookies(req);	
	if (!list[authCookieName]) return undefined;
	return new Buffer(list[authCookieName], 'base64').toString("UTF-8");
};

cookie.setAuthCookie = (res, value) => {
	var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000;
	now.setTime(time);
	res.setHeader('Set-Cookie', authCookieName + '=' + new Buffer(value).toString('base64') + "; expires="+ now.toUTCString() + "; path=/;");
	return res;
};