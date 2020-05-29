class jQuery{
    constructor(selector, context = document){
        this.elements = Array.from(context.querySelectorAll(selector));
        return this
    }

    each(fn){
        this.elements.forEach((element, index) => fn.call(element, element, index));
        return this;
    }

    click(fn, par){
        this.each(element => element.addEventListener('click', fn.bind(par)))
        return this
    }

    hide(){
        this.each(element => element.style.display = 'none')
      return this;
    }

    show(){
        this.each(element => element.style.display = '')
      return this;
    }

     text(text = null) {
        let exit_arr = [];
        (text == null) ? this.each(element => exit_arr.push(element.textContent)) : this.each(element => element.textContent = text)
     return exit_arr
     }
}

const $ = (e) => new jQuery(e);

class Timer {
    constructor(minutes, seconds) {
            this.time = new Date(0, 0, 0, 0, +minutes, +seconds, 30);
            this.hide_result.call(this);
            this.timer_is_active = true;
            this.show_time.call(this);
            return this;
    }

    show_time() {
        $('#minutes-data span').text(((0 + String(this.time.getMinutes())).slice(-2)));
        $('#seconds-data span').text(((0 + String(this.time.getSeconds())).slice(-2)));
        return this;
    }

    minus_second() {
        this.time.setSeconds(this.time.getSeconds() - 1);
        this.show_time.call(this);
        return this;
    }

    plus_second() {
        this.time.setSeconds(this.time.getSeconds() + 1);
        this.show_time.call(this);
        return this;
    }

    plus_minute() {
        this.time.setMinutes(this.time.getMinutes() + 1);
        this.show_time.call(this);
        return this;
    }

    start_timer() {
        if (+this.time.getMinutes() == 0 && +this.time.getSeconds() == 0 &&
            +this.time.getMilliseconds() < 90){
            this.timer_is_active = false;
            this.show_result.call(this);
            return this;
        }

        else {
            this.start_t = this.start_timer.bind(this);
            (this.timer_is_active == true) ? setTimeout(this.start_t, 1000) : console.log('stopped')
            this.minus_second.call(this);
            return this;
        }
    }

    new_timer() {
        this.hide_result(this);
        if (+document.getElementById('input_minutes').value == 0 && +document.getElementById('input_seconds').value == 0) {
            this.timer_is_active = true;
            this.start_timer.call(this);
            return this;
        }

        else    {
            this.time = new Date(0, 0, 0, 0, document.getElementById('input_minutes').value, document.getElementById('input_seconds').value);
            this.timer_is_active = true;
            this.start_timer.call(this);
            return this;
        }
    }

    stop_timer = function() {
        this.show_result.call(this);
        this.time = new Date(0, 0, 0, 0, 0, 0);
        this.show_time.call(this);
        this.timer_is_active = false;
        return this;
    }

    show_result = function() {
        $('#complete').show();
        return this;
    }

    hide_result = function() {
        $('#complete').hide();
        return this;
    }
}
ready = function() {
    timer = new Timer(0, 0);

    $('#submit_time').click(timer.new_timer, timer);
    $('#minutes-cover').click(timer.plus_minute, timer);
    $('#seconds-cover').click(timer.plus_second, timer);
    $('#stop_timer').click(timer.stop_timer, timer);
    $('#again').click(timer.hide_result, timer)
}



document.addEventListener("DOMContentLoaded", ready )