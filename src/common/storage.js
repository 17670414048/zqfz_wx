const setCookie = (c_name, value) => {
	document.cookie = c_name + "=" + encodeURIComponent(value);
	//console.log(document.cookie)
}

const getCookie = (c_name) => {
	if (document.cookie.length > 0) {
		let c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			let c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

// const delCookie = (c_name) => {
// 	setCookie(c_name, "", -1)
// }

const userInfo = () => {
	var cookie = decodeURIComponent(document.cookie);
	var user = getCookie('user_params');
	//console.log(user);
	return JSON.parse(user || '{}');
}

// const registrationInfo = () => {
//     return JSON.parse(localStorage.getItem('registrationInfo') || '{}')
// }

const unixToDate = (unixTime, isFull, style) => {
	isFull = isFull || false;
	style = style || '-';
	var time = new Date(unixTime * 1000);
	var ymdhis = "";
	ymdhis += time.getFullYear() + style;
	var month = time.getMonth() + 1;
	if (month <= 9) {
		month = '0' + month;
	}
	ymdhis += month + style;
	var day = time.getDate();
	if (day <= 9) {
		day = '0' + day;
	}
	ymdhis += day;
	if (isFull === true) {
		var h = time.getHours();
		if (h <= 9) {
			h = '0' + h;
		}
		var m = time.getMinutes();
		if (m <= 9) {
			m = '0' + m;
		}
		var s = time.getSeconds();
		if (s <= 9) {
			s = '0' + s;
		}
		ymdhis += " " + h + ":";
		ymdhis += m + ":";
		ymdhis += s;
	}
	return ymdhis;
}
const dateToUnix = (String) => {
	var f = string.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(
		parseInt(d[0], 10) || null,
		(parseInt(d[1], 10) || 1) - 1,
		parseInt(d[2], 10) || null,
		parseInt(t[0], 10) || null,
		parseInt(t[1], 10) || null,
		parseInt(t[2], 10) || null
	)).getTime() / 1000;
}
export {
	setCookie,
	getCookie,
	userInfo,
	unixToDate,
	dateToUnix
	// registrationInfo
}