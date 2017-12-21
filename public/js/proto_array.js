Array.prototype.ksort = function(){
	var sorted = {}, key, a = [];

    for (key in this) {
        if (this.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = this[a[key]];
    }

    return sorted;
}