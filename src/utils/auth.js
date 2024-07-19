// 입력값 클래스
class InputValue {
  constructor(value = '', isValid = false, errorMsg = '') {
    this.value = value;
    this.isValid = isValid;
    this.errorMsg = errorMsg;
  }
}

// 타이머 클래스
class ValidationTimer {
  constructor(Inputvalue) {
    this.inputValue = Inputvalue;
    this.timeLeft = null;
    this.interval = null;
  }

  startTimer(onTimerEnd) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    this.timeLeft = 180;
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.inputValue.errorMsg = `남은 시간 : ${this.timeLeft}초`;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        onTimerEnd();
        this.inputValue.errorMsg = `입력 시간 초과`;
      }
    }, 1000);
  }
}


export { InputValue, ValidationTimer }