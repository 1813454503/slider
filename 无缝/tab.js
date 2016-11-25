class MarqueeTab {
    constructor(id, time) {
        this.box = document.getElementById(id);
        this.ulBox = this.box.getElementsByTagName('ul')[0];
        this.aLi = '';
        this.olBox = this.box.getElementsByTagName('ol')[0];
        this.aBtn = this.olBox.children;
        this.aBtnLen = this.aBtn.length;
        this.nextBtn = document.getElementById('next');
        this.prevBtn = document.getElementById('prev');
        this.li_width = this.ulBox.children[0].offsetWidth;
        this.ul_width = '';
        this.iNow = 0;
        this.left = 0;
        this.time = time || 3000;
        this.init();
    }

    init() {
        let _this = this;

        this.ulBox.innerHTML += this.ulBox.innerHTML;
        this.aLi = this.ulBox.children;
        this.ulBox.style.width = this.aLi.length * this.li_width + 'px';
        this.ul_width = this.ulBox.offsetWidth / 2;

        this.box.onmouseover = function () {
            _this.nextBtn.style.display = 'block';
            _this.prevBtn.style.display = 'block';
            clearInterval(this.timer);
        };

        this.box.onmouseout = function () {
            _this.nextBtn.style.display = 'none';
            _this.prevBtn.style.display = 'none';
            this.timer = setInterval(function () {
                _this.next();
            }, _this.time);
        };

        for (var i = 0; i < this.aBtnLen; i++) {
            (function (index) {
                _this.aBtn[i].onclick = function () {
                    if ((_this.iNow % _this.aBtnLen == 4 || _this.iNow % _this.aBtnLen == -1) && index == 0) {
                        _this.iNow++;
                    }
                    if (_this.iNow % _this.aBtnLen == 0 && index == 4) {
                        _this.iNow--;
                    }
                    _this.iNow = parseInt(_this.iNow / _this.aBtnLen) * _this.aBtnLen + index;
                    _this.tab();
                };
            })(i);
        }

        this.prevBtn.onclick = function () {
            _this.iNow--;
            _this.tab();
        };

        this.nextBtn.onclick = function () {
            _this.next();
        };

        this.box.timer = setInterval(function () {
            _this.next();
        }, _this.time);

    }

    next() {
        this.iNow++;
        this.tab();
    }

    tab() {
        for (var i = 0; i < this.aBtnLen; i++) {
            this.aBtn[i].className = '';
        }

        if (this.iNow > 0) {
            this.aBtn[this.iNow % this.aBtnLen].className = 'on';
        } else {
            this.aBtn[(this.iNow % this.aBtnLen + this.aBtnLen) % this.aBtnLen].className = 'on';
        }

        this.move(this.ulBox, -this.iNow * this.li_width);
    }

    move(obj, iTarget) {
        let start = this.left,
            dis = iTarget - start,
            count = Math.floor(700 / 30),
            n = 0,
            _this = this;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            n++;
            let a = 1 - n / count;
            _this.left = start + dis * (1 - Math.pow(a, 3));
            if (_this.left < 0) {
                obj.style.left = _this.left % _this.ul_width + 'px';
            } else {
                obj.style.left = (_this.left % _this.ul_width - _this.ul_width) % _this.ul_width + 'px';
            }
            if (n == count) {
                clearInterval(obj.timer);
            }
        }, 30);
    }

}
