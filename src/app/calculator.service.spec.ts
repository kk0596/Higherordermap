import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(CalculatorService);
  });

  it('should add two number', () => {
   
    const logger =jasmine.createSpyObj('LoggerService', ["log"]);

    // const logger = new LoggerService();
    // spyOn(logger,'log');

    const calculator = new CalculatorService(logger);
    const result = calculator.add(10,30);
    expect(result).toBe(40);

    expect(logger.log).toHaveBeenCalledTimes(1);
    
  });

  it('should subtract two number', () => {
    const calculator = new CalculatorService(new LoggerService() )
    const result = calculator.sub(30,10);
    expect(result).toBe(20);
  });

});
