import $ from 'jquery';

class Global {
    
    static globalSliderWidth;
    static globalSliderButtonWidth;

    static setValues() {
        Global.globalSliderWidth= $('.HorizontalSliderBar').width();
        Global.globalSliderButtonWidth= $('.HorizontalSliderButton').width();
    }
}

export default Global;

