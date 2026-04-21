import { Shape, ShapeType } from '../types';

export const createShape = (type: ShapeType, x: number, y: number): Shape => {
  const newShape: Shape = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    x,
    y,
    width: 100,
    height: 50,
    label: type,
    inputs: [],
    outputs: [],
    name: `Shape_${Math.random().toString(36).substr(2, 5)}`,
    color: 'gray',
    font: '14px Orbitron'
  };

  // Initialize inputs/outputs based on type
  if (type === 'AND' || type === 'OR' || type === 'NAND' || type === 'NOR' || type === 'XOR' || type === 'XNOR') {
    newShape.inputs = [
      { x: 0, y: 10, label: 'A', value: 0, name: 'in_a' },
      { x: 0, y: 40, label: 'B', value: 0, name: 'in_b' }
    ];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
  } else if (type === 'AND3' || type === 'OR3' || type === 'NAND3' || type === 'NOR3') {
    newShape.inputs = [
      { x: 0, y: 10, label: 'A', value: 0, name: 'in_a' },
      { x: 0, y: 25, label: 'B', value: 0, name: 'in_b' },
      { x: 0, y: 40, label: 'C', value: 0, name: 'in_c' }
    ];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
    newShape.width = 100;
    newShape.height = 50;
  } else if (type === 'AND4' || type === 'OR4') {
    newShape.inputs = [
      { x: 0, y: 5, label: 'A', value: 0, name: 'in_a' },
      { x: 0, y: 18, label: 'B', value: 0, name: 'in_b' },
      { x: 0, y: 32, label: 'C', value: 0, name: 'in_c' },
      { x: 0, y: 45, label: 'D', value: 0, name: 'in_d' }
    ];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
    newShape.width = 100;
    newShape.height = 50;
  } else if (type === 'AND5' || type === 'OR5') {
    newShape.inputs = [
      { x: 0, y: 5, label: 'A', value: 0, name: 'in_a' },
      { x: 0, y: 15, label: 'B', value: 0, name: 'in_b' },
      { x: 0, y: 25, label: 'C', value: 0, name: 'in_c' },
      { x: 0, y: 35, label: 'D', value: 0, name: 'in_d' },
      { x: 0, y: 45, label: 'E', value: 0, name: 'in_e' }
    ];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
    newShape.width = 100;
    newShape.height = 60;
  } else if (type === 'NOT' || type === 'Buffer') {
    newShape.inputs = [{ x: 0, y: 25, label: 'A', value: 0, name: 'in_a' }];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
  } else if (type === 'ThreeState') {
    newShape.inputs = [
      { x: 0, y: 25, label: 'A', value: 0, name: 'in_a' },
      { x: 50, y: 0, label: 'E', value: 0, name: 'in_e' }
    ];
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }];
  } else if (type === 'InputL') {
    newShape.outputs = [{ x: 85, y: 25, label: 'Out', value: 0, name: 'out' }];
    newShape.color = 'red';
  } else if (type === 'OutPutL') {
    newShape.inputs = [{ x: 50, y: 60, label: 'In', value: 0, name: 'in' }];
    newShape.color = 'blue';
  } else if (type === 'Clock') {
    newShape.outputs = [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }];
    newShape.frequency = 1;
  } else if (type === 'Clock_ms') {
    newShape.outputs = [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }];
    newShape.frequency = 1; // We'll use this as 1000ms initially
  } else if (type === 'Clock_Hz_Adj') {
    newShape.outputs = [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }];
    newShape.frequency = 1;
    newShape.width = 120; // Extra width for arrows
  } else if (type === 'Clock_ms_Adj') {
    newShape.outputs = [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }];
    newShape.frequency = 1; // 1000ms
    newShape.width = 120;
  } else if (type === 'GatedClock') {
    newShape.inputs = [{ x: 0, y: 25, label: 'E', value: 0, name: 'in_e' }];
    newShape.outputs = [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }];
    newShape.frequency = 1;
  } else if (type === 'InputControl') {
    newShape.outputs = Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `O${i}`, value: 0, name: `o${i}` }));
    newShape.width = 100;
    newShape.height = 160;
  } else if (type === 'Oscilloscope') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'CH1', value: 0, name: 'ch1' },
      { x: 0, y: 35, label: 'CH2', value: 0, name: 'ch2' },
      { x: 0, y: 55, label: 'CH3', value: 0, name: 'ch3' },
      { x: 0, y: 75, label: 'CH4', value: 0, name: 'ch4' },
    ];
    newShape.width = 160;
    newShape.height = 100;
    newShape.history = [];
  } else if (type === 'IC74160' || type === 'IC74161') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' },
      { x: 0, y: 35, label: 'CLR', value: 1, name: 'clr' },
      { x: 0, y: 55, label: 'LD', value: 1, name: 'ld' },
      { x: 0, y: 75, label: 'ENP', value: 1, name: 'enp' },
      { x: 0, y: 95, label: 'ENT', value: 1, name: 'ent' },
      { x: 0, y: 115, label: 'D0', value: 0, name: 'd0' },
      { x: 0, y: 135, label: 'D1', value: 0, name: 'd1' },
      { x: 0, y: 155, label: 'D2', value: 0, name: 'd2' },
      { x: 0, y: 175, label: 'D3', value: 0, name: 'd3' },
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: 'Q0', value: 0, name: 'q0' },
      { x: 120, y: 65, label: 'Q1', value: 0, name: 'q1' },
      { x: 120, y: 105, label: 'Q2', value: 0, name: 'q2' },
      { x: 120, y: 145, label: 'Q3', value: 0, name: 'q3' },
      { x: 120, y: 185, label: 'RCO', value: 0, name: 'rco' },
    ];
    newShape.height = 220;
    newShape.width = 120;
  } else if (type === 'IC7448') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 45, label: 'B', value: 0, name: 'b' },
      { x: 0, y: 70, label: 'C', value: 0, name: 'c' },
      { x: 0, y: 95, label: 'D', value: 0, name: 'd' },
      { x: 0, y: 120, label: 'LT', value: 1, name: 'lt' },
      { x: 0, y: 145, label: 'RBI', value: 1, name: 'rbi' },
      { x: 0, y: 170, label: 'BI', value: 1, name: 'bi' },
    ];
    newShape.outputs = [
      { x: 120, y: 20, label: 'a', value: 0, name: 'out_a' },
      { x: 120, y: 45, label: 'b', value: 0, name: 'out_b' },
      { x: 120, y: 70, label: 'c', value: 0, name: 'out_c' },
      { x: 120, y: 95, label: 'd', value: 0, name: 'out_d' },
      { x: 120, y: 120, label: 'e', value: 0, name: 'out_e' },
      { x: 120, y: 145, label: 'f', value: 0, name: 'out_f' },
      { x: 120, y: 170, label: 'g', value: 0, name: 'out_g' },
    ];
    newShape.height = 200;
    newShape.width = 120;
  } else if (type === 'IC74192' || type === 'IC74193') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'UP', value: 1, name: 'up' },
      { x: 0, y: 35, label: 'DN', value: 1, name: 'dn' },
      { x: 0, y: 55, label: 'PL', value: 1, name: 'pl' },
      { x: 0, y: 75, label: 'MR', value: 0, name: 'mr' },
      { x: 0, y: 95, label: 'D0', value: 0, name: 'd0' },
      { x: 0, y: 115, label: 'D1', value: 0, name: 'd1' },
      { x: 0, y: 135, label: 'D2', value: 0, name: 'd2' },
      { x: 0, y: 155, label: 'D3', value: 0, name: 'd3' },
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: 'Q0', value: 0, name: 'q0' },
      { x: 120, y: 50, label: 'Q1', value: 0, name: 'q1' },
      { x: 120, y: 75, label: 'Q2', value: 0, name: 'q2' },
      { x: 120, y: 100, label: 'Q3', value: 0, name: 'q3' },
      { x: 120, y: 130, label: 'TCU', value: 1, name: 'tcu' },
      { x: 120, y: 155, label: 'TCD', value: 1, name: 'tcd' },
    ];
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'IC7493') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'CKA', value: 0, name: 'cka' },
      { x: 0, y: 35, label: 'CKB', value: 0, name: 'ckb' },
      { x: 0, y: 55, label: 'R0(1)', value: 0, name: 'r01' },
      { x: 0, y: 75, label: 'R0(2)', value: 0, name: 'r02' },
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: 'QA', value: 0, name: 'qa' },
      { x: 120, y: 45, label: 'QB', value: 0, name: 'qb' },
      { x: 120, y: 65, label: 'QC', value: 0, name: 'qc' },
      { x: 120, y: 85, label: 'QD', value: 0, name: 'qd' },
    ];
    newShape.height = 120;
    newShape.width = 120;
  } else if (type === 'IC74138') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 35, label: 'B', value: 0, name: 'b' },
      { x: 0, y: 55, label: 'C', value: 0, name: 'c' },
      { x: 0, y: 75, label: 'G1', value: 0, name: 'g1' },
      { x: 0, y: 95, label: 'G2A', value: 0, name: 'g2a' },
      { x: 0, y: 115, label: 'G2B', value: 0, name: 'g2b' },
    ];
    newShape.outputs = Array.from({ length: 8 }, (_, i) => ({
      x: 120, y: 15 + i * 20, label: `Y${i}`, value: 1, name: `y${i}`
    }));
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'IC74151') {
    newShape.inputs = [
      ...Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })),
      { x: 0, y: 175, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 195, label: 'B', value: 0, name: 'b' },
      { x: 0, y: 215, label: 'C', value: 0, name: 'c' },
      { x: 0, y: 235, label: 'S', value: 0, name: 's' },
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: 'Y', value: 0, name: 'y' },
      { x: 120, y: 45, label: 'W', value: 1, name: 'w' },
    ];
    newShape.height = 260;
    newShape.width = 120;
  } else if (type === 'IC555') {
    newShape.inputs = [
      { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
      { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
      { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
      { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
      { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
      { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
      { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 120;
    newShape.height = 160;
    newShape.mode = 'astable';
    newShape.frequency = 1;
    newShape.resistance = 10000; // 10k
    newShape.capacitance = 0.00001; // 10uF
    newShape.state = { lastTrigger: 0, pulseEndTime: 0, q: 0 };
  } else if (type === 'IC555_Simple') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'TRIG', value: 0, name: 'trig' },
      { x: 0, y: 40, label: 'THRES', value: 0, name: 'thres' },
      { x: 0, y: 60, label: 'RESET', value: 1, name: 'reset' }
    ];
    newShape.outputs = [{ x: 100, y: 40, label: 'OUT', value: 1, name: 'out' }];
    newShape.width = 100;
    newShape.height = 80;
    newShape.mode = 'astable';
    newShape.frequency = 1;
    newShape.resistance = 10000;
    newShape.capacitance = 0.00001;
    newShape.state = { q: 1, lastTrig: 1, pulseEndTime: 0 };
  } else if (type === 'LM741') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'In+', value: 0, name: 'in_p' },
      { x: 0, y: 60, label: 'In-', value: 0, name: 'in_m' },
    ];
    newShape.outputs = [{ x: 100, y: 40, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 80;
  } else if (type === 'LGT8F328P') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'RESET', value: 1, name: 'reset' },
      { x: 0, y: 35, label: 'VCC', value: 1, name: 'vcc' },
      { x: 0, y: 55, label: 'GND', value: 0, name: 'gnd' },
      { x: 0, y: 75, label: 'XTAL1', value: 0, name: 'xtal1' },
      { x: 0, y: 95, label: 'XTAL2', value: 0, name: 'xtal2' },
      ...Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 115 + i * 20, label: `D${i}`, value: 0, name: `d${i}` }))
    ];
    newShape.outputs = Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 20, label: `PB${i}`, value: 0, name: `pb${i}` }));
    newShape.width = 140;
    newShape.height = 280;
  } else if (type === 'ATmega328P') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'RESET', value: 1, name: 'reset' },
      { x: 0, y: 35, label: 'VCC', value: 1, name: 'vcc' },
      { x: 0, y: 55, label: 'GND', value: 0, name: 'gnd' },
      { x: 0, y: 75, label: 'XTAL1', value: 0, name: 'xtal1' },
      { x: 0, y: 95, label: 'XTAL2', value: 0, name: 'xtal2' },
      { x: 0, y: 115, label: 'D0', value: 0, name: 'd0' },
      { x: 0, y: 135, label: 'D1', value: 0, name: 'd1' },
      { x: 0, y: 155, label: 'D2', value: 0, name: 'd2' },
      { x: 0, y: 175, label: 'D3', value: 0, name: 'd3' },
      { x: 0, y: 195, label: 'D4', value: 0, name: 'd4' },
      { x: 0, y: 215, label: 'D5', value: 0, name: 'd5' },
      { x: 0, y: 235, label: 'D6', value: 0, name: 'd6' },
      { x: 0, y: 255, label: 'D7', value: 0, name: 'd7' }
    ];
    newShape.outputs = [
      { x: 140, y: 15, label: 'PB0', value: 0, name: 'pb0' },
      { x: 140, y: 35, label: 'PB1', value: 0, name: 'pb1' },
      { x: 140, y: 55, label: 'PB2', value: 0, name: 'pb2' },
      { x: 140, y: 75, label: 'PB3', value: 0, name: 'pb3' },
      { x: 140, y: 95, label: 'PB4', value: 0, name: 'pb4' },
      { x: 140, y: 115, label: 'PB5', value: 0, name: 'pb5' },
      { x: 140, y: 135, label: 'PB6', value: 0, name: 'pb6' },
      { x: 140, y: 155, label: 'PB7', value: 0, name: 'pb7' }
    ];
    newShape.width = 140;
    newShape.height = 280;
    newShape.state = { count: 0 };
  } else if (type === 'ATmega16U2') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
      { x: 0, y: 23, label: 'D1', value: 0, name: 'd1' },
      { x: 0, y: 31, label: 'D2', value: 0, name: 'd2' },
      { x: 0, y: 39, label: 'D3', value: 0, name: 'd3' },
      { x: 0, y: 47, label: 'D4', value: 0, name: 'd4' },
      { x: 0, y: 55, label: 'D5', value: 0, name: 'd5' },
      { x: 0, y: 63, label: 'D6', value: 0, name: 'd6' },
      { x: 0, y: 71, label: 'D7', value: 0, name: 'd7' }
    ];
    newShape.outputs = [
      { x: 80, y: 15, label: 'P0', value: 0, name: 'p0' },
      { x: 80, y: 23, label: 'P1', value: 0, name: 'p1' },
      { x: 80, y: 31, label: 'P2', value: 0, name: 'p2' },
      { x: 80, y: 39, label: 'P3', value: 0, name: 'p3' },
      { x: 80, y: 47, label: 'P4', value: 0, name: 'p4' },
      { x: 80, y: 55, label: 'P5', value: 0, name: 'p5' },
      { x: 80, y: 63, label: 'P6', value: 0, name: 'p6' },
      { x: 80, y: 71, label: 'P7', value: 0, name: 'p7' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'ATmega16') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'RESET', value: 1, name: 'reset' },
      { x: 0, y: 35, label: 'VCC', value: 1, name: 'vcc' },
      { x: 0, y: 55, label: 'GND', value: 0, name: 'gnd' },
      ...Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 75 + i * 20, label: `PA${i}`, value: 0, name: `pa${i}` }))
    ];
    newShape.outputs = Array.from({ length: 16 }, (_, i) => ({ x: 140, y: 15 + i * 20, label: `PB${i}`, value: 0, name: `pb${i}` }));
    newShape.width = 140;
    newShape.height = 400;
  } else if (type === 'ATtiny85') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'VCC', value: 1, name: 'vcc' },
      { x: 0, y: 35, label: 'PB3', value: 0, name: 'pb3' },
      { x: 0, y: 55, label: 'PB4', value: 0, name: 'pb4' },
      { x: 0, y: 75, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [
      { x: 80, y: 15, label: 'PB0', value: 0, name: 'pb0' },
      { x: 80, y: 35, label: 'PB1', value: 0, name: 'pb1' },
      { x: 80, y: 55, label: 'PB2', value: 0, name: 'pb2' },
      { x: 80, y: 75, label: 'RESET', value: 1, name: 'reset' }
    ];
    newShape.width = 80;
    newShape.height = 100;
  } else if (type === 'PIC18F2520') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'MCLR', value: 1, name: 'mclr' },
      { x: 0, y: 35, label: 'VDD', value: 1, name: 'vdd' },
      { x: 0, y: 55, label: 'VSS', value: 0, name: 'vss' },
      ...Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 75 + i * 20, label: `RA${i}`, value: 0, name: `ra${i}` }))
    ];
    newShape.outputs = Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 20, label: `RB${i}`, value: 0, name: `rb${i}` }));
    newShape.width = 140;
    newShape.height = 280;
  } else if (type === 'ESP32') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'EN', value: 1, name: 'en' },
      { x: 0, y: 35, label: 'VP', value: 0, name: 'vp' },
      { x: 0, y: 55, label: 'VN', value: 0, name: 'vn' },
      ...Array.from({ length: 15 }, (_, i) => ({ x: 0, y: 75 + i * 20, label: `G${i}`, value: 0, name: `g${i}` }))
    ];
    newShape.outputs = Array.from({ length: 15 }, (_, i) => ({ x: 160, y: 15 + i * 20, label: `G${i+15}`, value: 0, name: `g${i+15}` }));
    newShape.width = 160;
    newShape.height = 380;
  } else if (type === 'RP2040') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'RUN', value: 1, name: 'run' },
      { x: 0, y: 35, label: 'VCC', value: 1, name: 'vcc' },
      ...Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 55 + i * 20, label: `GP${i}`, value: 0, name: `gp${i}` }))
    ];
    newShape.outputs = Array.from({ length: 14 }, (_, i) => ({ x: 160, y: 15 + i * 20, label: `GP${i+14}`, value: 0, name: `gp${i+14}` }));
    newShape.width = 160;
    newShape.height = 340;
  } else if (type === 'PCB_Board') {
    newShape.width = 600;
    newShape.height = 400;
    newShape.label = 'PCB DESIGN';
  } else if (type === 'IC4001' || type === 'IC4011' || type === 'IC4071' || type === 'IC4081') {
    newShape.inputs = [
      { x: 0, y: 15, label: '1A', value: 0, name: '1a' },
      { x: 0, y: 35, label: '1B', value: 0, name: '1b' },
      { x: 0, y: 65, label: '2A', value: 0, name: '2a' },
      { x: 0, y: 85, label: '2B', value: 0, name: '2b' },
    ];
    newShape.outputs = [
      { x: 100, y: 25, label: '1Y', value: 0, name: '1y' },
      { x: 100, y: 75, label: '2Y', value: 0, name: '2y' },
    ];
    newShape.width = 100;
    newShape.height = 110;
  } else if (type === 'IC4069') {
    newShape.inputs = Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `A${i+1}`, value: 0, name: `a${i+1}` }));
    newShape.outputs = Array.from({ length: 6 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Y${i+1}`, value: 1, name: `y${i+1}` }));
    newShape.width = 100;
    newShape.height = 140;
  } else if (type === 'LM386') {
    newShape.inputs = [{ x: 0, y: 25, label: 'In', value: 0, name: 'in' }];
    newShape.outputs = [{ x: 100, y: 25, label: 'Out', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 50;
  } else if (type === 'IC7485') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'A0', value: 0, name: 'a0' },
      { x: 0, y: 35, label: 'A1', value: 0, name: 'a1' },
      { x: 0, y: 55, label: 'A2', value: 0, name: 'a2' },
      { x: 0, y: 75, label: 'A3', value: 0, name: 'a3' },
      { x: 0, y: 105, label: 'B0', value: 0, name: 'b0' },
      { x: 0, y: 125, label: 'B1', value: 0, name: 'b1' },
      { x: 0, y: 145, label: 'B2', value: 0, name: 'b2' },
      { x: 0, y: 165, label: 'B3', value: 0, name: 'b3' },
      { x: 0, y: 185, label: 'I_A<B', value: 0, name: 'in_lt' },
      { x: 0, y: 205, label: 'I_A=B', value: 1, name: 'in_eq' },
      { x: 0, y: 225, label: 'I_A>B', value: 0, name: 'in_gt' },
    ];
    newShape.outputs = [
      { x: 120, y: 50, label: 'A<B', value: 0, name: 'altb' },
      { x: 120, y: 100, label: 'A=B', value: 0, name: 'aeqb' },
      { x: 120, y: 150, label: 'A>B', value: 0, name: 'agtb' },
    ];
    newShape.height = 260;
    newShape.width = 120;
  } else if (type === 'IC74147' || type === 'IC74148') {
    if (type === 'IC74147') {
      newShape.inputs = Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i + 1}`, value: 1, name: `in_${i + 1}` }));
      newShape.outputs = Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Y${i}`, value: 1, name: `out_${i}` }));
      newShape.height = 220;
    } else {
      // 74148: 8-line to 3-line Priority Encoder
      newShape.inputs = [
        ...Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 1, name: `in_${i}` })),
        { x: 0, y: 175, label: 'EI', value: 0, name: 'ei' } // Active low enable
      ];
      newShape.outputs = [
        { x: 120, y: 15, label: 'A0', value: 1, name: 'a0' },
        { x: 120, y: 40, label: 'A1', value: 1, name: 'a1' },
        { x: 120, y: 65, label: 'A2', value: 1, name: 'a2' },
        { x: 120, y: 90, label: 'GS', value: 1, name: 'gs' },
        { x: 120, y: 115, label: 'EO', value: 1, name: 'eo' }
      ];
      newShape.height = 200;
    }
    newShape.width = 120;
  } else if (type === 'IC74181') {
    newShape.inputs = [
      ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `A${i}`, value: 0, name: `a${i}` })),
      ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 105 + i * 20, label: `B${i}`, value: 0, name: `b${i}` })),
      ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 195 + i * 20, label: `S${i}`, value: 0, name: `s${i}` })),
      { x: 0, y: 280, label: 'M', value: 0, name: 'm' },
      { x: 0, y: 305, label: 'Cn', value: 1, name: 'cn' }
    ];
    newShape.outputs = [
      ...Array.from({ length: 4 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `F${i}`, value: 0, name: `f${i}` })),
      { x: 140, y: 130, label: 'A=B', value: 0, name: 'aeqb' },
      { x: 140, y: 160, label: 'Cn4', value: 1, name: 'cn4' },
      { x: 140, y: 190, label: 'G', value: 1, name: 'g' },
      { x: 140, y: 220, label: 'P', value: 1, name: 'p' }
    ];
    newShape.height = 340;
    newShape.width = 140;
  } else if (type === 'IC7SegToBCD') {
    newShape.inputs = Array.from({ length: 7 }, (_, i) => ({ 
      x: 0, y: 15 + i * 20, label: String.fromCharCode(97 + i), value: 0, name: String.fromCharCode(97 + i) 
    }));
    newShape.outputs = Array.from({ length: 4 }, (_, i) => ({ 
      x: 120, y: 15 + i * 25, label: `Q${i}`, value: 0, name: `q${i}` 
    }));
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'IC74HC595') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'DS', value: 0, name: 'ds' },
      { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' },
      { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' },
      { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' },
      { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' },
    ];
    newShape.outputs = Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` }));
    newShape.height = 200;
    newShape.width = 120;
  } else if (type === 'IC4017') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' },
      { x: 0, y: 40, label: 'CE', value: 0, name: 'ce' },
      { x: 0, y: 65, label: 'RST', value: 0, name: 'rst' },
    ];
    newShape.outputs = Array.from({ length: 10 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `out_${i}` }));
    newShape.height = 240;
    newShape.width = 120;
  } else if (type === 'IC74153') {
    newShape.inputs = [
      ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `1D${i}`, value: 0, name: `1d${i}` })),
      { x: 0, y: 95, label: '1G', value: 0, name: '1g' },
      ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 115 + i * 20, label: `2D${i}`, value: 0, name: `2d${i}` })),
      { x: 0, y: 195, label: '2G', value: 0, name: '2g' },
      { x: 0, y: 215, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 235, label: 'B', value: 0, name: 'b' },
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: '1Y', value: 0, name: '1y' },
      { x: 120, y: 125, label: '2Y', value: 0, name: '2y' },
    ];
    newShape.height = 260;
    newShape.width = 120;
  } else if (type === 'Display' || type === 'Display7Segment' || type === 'Display7SegmentSigned') {
    const segmentCount = type === 'Display7SegmentSigned' ? 8 : 7;
    newShape.inputs = Array.from({ length: segmentCount }, (_, i) => ({
      x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'Sign', value: 0, name: `seg_${i}`
    }));
    newShape.height = segmentCount * 25 + 20;
    newShape.width = 120;
  } else if (type === 'Display8Segment') {
    newShape.inputs = Array.from({ length: 8 }, (_, i) => ({
      x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}`
    }));
    newShape.height = 400;
    newShape.width = 120;
  } else if (type === 'Display9Segment') {
    newShape.inputs = Array.from({ length: 9 }, (_, i) => ({
      x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}`
    }));
    newShape.height = 440;
    newShape.width = 120;
  } else if (type === 'Display14Segment') {
    newShape.inputs = Array.from({ length: 14 }, (_, i) => ({
      x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}`
    }));
    newShape.height = 500;
    newShape.width = 120;
  } else if (type === 'Display16Segment') {
    newShape.inputs = Array.from({ length: 16 }, (_, i) => ({
      x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}`
    }));
    newShape.height = 550;
    newShape.width = 120;
  } else if (type === 'DotMatrixDisplay') {
    // 5x7 matrix: 5 columns, 7 rows
    newShape.inputs = [
      ...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `C${i + 1}`, value: 0, name: `col_${i}` })),
      ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 150 + i * 25, label: `R${i + 1}`, value: 0, name: `row_${i}` }))
    ];
    newShape.height = 350;
    newShape.width = 120;
  } else if (type === 'DisplayBCD') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
      { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
      { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
      { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' },
    ];
    newShape.height = 200;
    newShape.width = 120;
  } else if (type === 'IC7408' || type === 'IC7400' || type === 'IC7432' || type === 'IC7486') {
    newShape.label = type === 'IC7408' ? '74LS08' : type === 'IC7400' ? '74LS00' : type === 'IC7432' ? '74LS32' : '74LS86';
    newShape.inputs = [
      { x: 20, y: 80, label: '1A', value: 0, name: '1a' },
      { x: 40, y: 80, label: '1B', value: 0, name: '1b' },
      { x: 80, y: 80, label: '2A', value: 0, name: '2a' },
      { x: 100, y: 80, label: '2B', value: 0, name: '2b' },
      { x: 100, y: 0, label: '3A', value: 0, name: '3a' },
      { x: 120, y: 0, label: '3B', value: 0, name: '3b' },
      { x: 40, y: 0, label: '4A', value: 0, name: '4a' },
      { x: 60, y: 0, label: '4B', value: 0, name: '4b' },
      { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' },
      { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [
      { x: 60, y: 80, label: '1Y', value: 0, name: '1y' },
      { x: 120, y: 80, label: '2Y', value: 0, name: '2y' },
      { x: 140, y: 0, label: '3Y', value: 0, name: '3y' },
      { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }
    ];
    newShape.width = 160;
    newShape.height = 80;
  } else if (type === 'IC7402') {
    newShape.label = '74LS02';
    newShape.inputs = [
      { x: 40, y: 80, label: '1A', value: 0, name: '1a' },
      { x: 60, y: 80, label: '1B', value: 0, name: '1b' },
      { x: 100, y: 80, label: '2A', value: 0, name: '2a' },
      { x: 120, y: 80, label: '2B', value: 0, name: '2b' },
      { x: 100, y: 0, label: '3A', value: 0, name: '3a' },
      { x: 120, y: 0, label: '3B', value: 0, name: '3b' },
      { x: 40, y: 0, label: '4A', value: 0, name: '4a' },
      { x: 60, y: 0, label: '4B', value: 0, name: '4b' },
      { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' },
      { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [
      { x: 20, y: 80, label: '1Y', value: 0, name: '1y' },
      { x: 80, y: 80, label: '2Y', value: 0, name: '2y' },
      { x: 140, y: 0, label: '3Y', value: 0, name: '3y' },
      { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }
    ];
    newShape.width = 160;
    newShape.height = 80;
  } else if (type === 'IC74107') {
    newShape.label = '74LS107';
    newShape.inputs = [
      { x: 20, y: 80, label: '1J', value: 0, name: '1j' },     // pin 1
      { x: 80, y: 80, label: '1K', value: 0, name: '1k' },     // pin 4
      { x: 60, y: 0, label: '1CLK', value: 0, name: '1clk' },  // pin 12
      { x: 40, y: 0, label: '1CLR', value: 1, name: '1clr' },  // pin 13
      { x: 140, y: 0, label: '2J', value: 0, name: '2j' },     // pin 8
      { x: 80, y: 0, label: '2K', value: 0, name: '2k' },      // pin 11
      { x: 120, y: 0, label: '2CLK', value: 0, name: '2clk' }, // pin 9
      { x: 100, y: 0, label: '2CLR', value: 1, name: '2clr' }, // pin 10
      { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' },    // pin 14
      { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }   // pin 7
    ];
    newShape.outputs = [
      { x: 60, y: 80, label: '1Q', value: 0, name: '1q' },    // pin 3
      { x: 40, y: 80, label: '1!Q', value: 1, name: '1q_n' },  // pin 2
      { x: 100, y: 80, label: '2Q', value: 0, name: '2q' },   // pin 5
      { x: 120, y: 80, label: '2!Q', value: 1, name: '2q_n' }  // pin 6
    ];
    newShape.width = 160;
    newShape.height = 80;
    newShape.state = { q1: 0, q2: 0 };
  } else if (type === 'IC7404') {
    newShape.label = '74LS04';
    newShape.inputs = [
      { x: 20, y: 80, label: '1A', value: 0, name: '1a' },
      { x: 60, y: 80, label: '2A', value: 0, name: '2a' },
      { x: 100, y: 80, label: '3A', value: 0, name: '3a' },
      { x: 120, y: 0, label: '4A', value: 0, name: '4a' },
      { x: 80, y: 0, label: '5A', value: 0, name: '5a' },
      { x: 40, y: 0, label: '6A', value: 0, name: '6a' },
      { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' },
      { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [
      { x: 40, y: 80, label: '1Y', value: 0, name: '1y' },
      { x: 80, y: 80, label: '2Y', value: 0, name: '2y' },
      { x: 120, y: 80, label: '3Y', value: 0, name: '3y' },
      { x: 140, y: 0, label: '4Y', value: 0, name: '4y' },
      { x: 100, y: 0, label: '5Y', value: 0, name: '5y' },
      { x: 60, y: 0, label: '6Y', value: 0, name: '6y' }
    ];
    newShape.width = 160;
    newShape.height = 80;
  } else if (type === 'IC7445' || type === 'IC7447') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 40, label: 'B', value: 0, name: 'b' },
      { x: 0, y: 65, label: 'C', value: 0, name: 'c' },
      { x: 0, y: 90, label: 'D', value: 0, name: 'd' },
    ];
    newShape.outputs = Array.from({ length: 7 }, (_, i) => ({
      x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}`
    }));
    newShape.height = 220;
    newShape.width = 120;
  } else if (type === 'IC7490') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' },
      { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' },
      { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' },
      { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' },
      { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' },
      { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' },
    ];
    newShape.outputs = [
      { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
      { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
      { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
      { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
    ];
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'SR_Flip_Flop' || type === 'D_Flip_Flop' || type === 'T_Flip_Flop' || type === 'JK_Flip_Flop' || type === 'D_Latch') {
    newShape.inputs = type === 'JK_Flip_Flop' ? [
      { x: 0, y: 15, label: 'J', value: 0, name: 'in_j' },
      { x: 0, y: 35, label: 'K', value: 0, name: 'in_k' },
      { x: 0, y: 55, label: 'CLK', value: 0, name: 'in_clk' }
    ] : type === 'SR_Flip_Flop' ? [
      { x: 0, y: 15, label: 'S', value: 0, name: 'in_s' },
      { x: 0, y: 35, label: 'R', value: 0, name: 'in_r' },
      { x: 0, y: 55, label: 'CLK', value: 0, name: 'in_clk' }
    ] : type === 'D_Latch' ? [
      { x: 0, y: 15, label: 'D', value: 0, name: 'in_d' },
      { x: 0, y: 55, label: 'EN', value: 0, name: 'in_en' }
    ] : [
      { x: 0, y: 15, label: type === 'D_Flip_Flop' ? 'D' : 'T', value: 0, name: 'in_data' },
      { x: 0, y: 55, label: 'CLK', value: 0, name: 'in_clk' }
    ];
    newShape.outputs = [
      { x: 100, y: 15, label: 'Q', value: 0, name: 'out_q' },
      { x: 100, y: 55, label: "Q'", value: 0, name: 'out_q_not' }
    ];
    newShape.state = 0;
  } else if (type === 'PushButton' || type === 'ToggleSwitch' || type === 'HighConstant' || type === 'LowConstant' || type === 'PassSwitch') {
    if (type === 'PassSwitch') {
      newShape.inputs = [{ x: 0, y: 25, label: 'In', value: 0, name: 'in' }];
      newShape.outputs = [{ x: 100, y: 25, label: 'Out', value: 0, name: 'out' }];
      newShape.state = 0;
    } else {
      newShape.outputs = [{ x: 85, y: 25, label: 'Out', value: 0, name: 'out' }];
    }
    newShape.color = type === 'HighConstant' ? 'green' : (type === 'LowConstant' ? 'red' : 'gray');
    if (type === 'HighConstant') newShape.outputs[0].value = 1;
  } else if (type === 'NAND4' || type === 'NOR4' || type === 'XOR4') {
    newShape.inputs = Array.from({ length: 4 }, (_, i) => ({
      x: 0, y: 10 + i * 13, label: `${i + 1}`, value: 0, name: `in_${i}`
    }));
    newShape.outputs = [{ x: 100, y: 30, label: 'Y', value: 0, name: 'y' }];
    newShape.height = 60;
    newShape.width = 100;
  } else if (type === 'XOR3') {
    newShape.inputs = Array.from({ length: 3 }, (_, i) => ({
      x: 0, y: 10 + i * 15, label: `${i + 1}`, value: 0, name: `in_${i}`
    }));
    newShape.outputs = [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }];
    newShape.height = 50;
    newShape.width = 100;
  } else if (type === 'IC7410') {
    newShape.inputs = Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `${i + 1}`, value: 0, name: `in_${i}` }));
    newShape.outputs = Array.from({ length: 3 }, (_, i) => ({ x: 120, y: 35 + i * 60, label: `${i + 1}Y`, value: 0, name: `out_${i}` }));
    newShape.height = 200;
    newShape.width = 120;
  } else if (type === 'IC7420') {
    newShape.inputs = Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `${i + 1}`, value: 0, name: `in_${i}` }));
    newShape.outputs = Array.from({ length: 2 }, (_, i) => ({ x: 120, y: 45 + i * 80, label: `${i + 1}Y`, value: 0, name: `out_${i}` }));
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'IC7430') {
    newShape.inputs = Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `${i + 1}`, value: 0, name: `in_${i}` }));
    newShape.outputs = [{ x: 120, y: 85, label: 'Y', value: 0, name: 'out_y' }];
    newShape.height = 180;
    newShape.width = 120;
  } else if (type === 'IC4013') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 35, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 55, label: 'R1', value: 0, name: 'r1' }, { x: 0, y: 75, label: 'S1', value: 0, name: 's1' },
      { x: 0, y: 105, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 125, label: 'CP2', value: 0, name: 'cp2' }, { x: 0, y: 145, label: 'R2', value: 0, name: 'r2' }, { x: 0, y: 165, label: 'S2', value: 0, name: 's2' }
    ];
    newShape.outputs = [
      { x: 120, y: 25, label: 'Q1', value: 0, name: 'q1' }, { x: 120, y: 45, label: "Q1'", value: 0, name: 'q1n' },
      { x: 120, y: 115, label: 'Q2', value: 0, name: 'q2' }, { x: 120, y: 135, label: "Q2'", value: 0, name: 'q2n' }
    ];
    newShape.height = 200;
    newShape.width = 120;
  } else if (type === 'LM358' || type === 'LM324' || type === 'LM311') {
    newShape.inputs = type === 'LM324' ? Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: i % 2 === 0 ? '+' : '-', value: 0, name: `in_${i}` })) :
                      [{ x: 0, y: 15, label: '+', value: 0, name: 'in_p' }, { x: 0, y: 40, label: '-', value: 0, name: 'in_n' }];
    newShape.outputs = type === 'LM324' ? Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 25 + i * 40, label: `Y${i+1}`, value: 0, name: `out_${i}` })) :
                      [{ x: 120, y: 25, label: 'Y', value: 0, name: 'out_y' }];
    newShape.height = type === 'LM324' ? 180 : 80;
    newShape.width = 120;
  } else if (type === 'Display2Digit') {
    newShape.inputs = [
      ...Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 25, y: 100, label: String.fromCharCode(97 + i), value: 0, name: `seg_${i}` })),
      ...Array.from({ length: 2 }, (_, i) => ({ x: 20 + (i + 8) * 25, y: 100, label: `D${i + 1}`, value: 0, name: `dig_${i + 1}` }))
    ];
    newShape.width = 260;
    newShape.height = 100;
  } else if (type === 'Display4Digit') {
    newShape.inputs = [
      ...Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 25, y: 100, label: String.fromCharCode(97 + i), value: 0, name: `seg_${i}` })),
      ...Array.from({ length: 4 }, (_, i) => ({ x: 20 + (i + 8) * 25, y: 100, label: `D${i + 1}`, value: 0, name: `dig_${i + 1}` }))
    ];
    newShape.width = 320;
    newShape.height = 100;
  } else if (type === 'Resistor' || type === 'Preset_Resistor' || type === 'Attenuator' || type === 'Capacitor' || type === 'Trimmer_Capacitor' || type === 'Inductor' || type === 'Heater' || type === 'Fuse' || type === 'Fuse_IEC' || type === 'Diode' || type === 'LED' || type === 'Neon_Lamp' || type === 'Fluorescent_Lamp') {
    newShape.inputs = [{ x: 0, y: 25, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 60, y: 25, label: '2', value: 0, name: 'p2' }];
    newShape.width = 60;
    newShape.height = 50;
    if (type === 'Resistor' || type === 'Preset_Resistor') newShape.resistance = 1000;
    if (type === 'Capacitor' || type === 'Trimmer_Capacitor') newShape.capacitance = 0.000001;
    if (type === 'Inductor') newShape.inductance = 0.001;
  } else if (type === 'DC_Current_Source' || type === 'AC_Current_Source' || type === 'Step_Current_Source' || type === 'PWL_Current_Source') {
    newShape.inputs = [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 60, y: 30, label: '2', value: 0, name: 'p2' }];
    newShape.width = 60;
    newShape.height = 60;
    newShape.current = 1;
    if (type === 'AC_Current_Source') {
      newShape.frequency = 1000;
      newShape.phase = 0;
      newShape.offset = 0;
    } else if (type === 'Step_Current_Source') {
      newShape.dutyCycle = 50;
      newShape.frequency = 1000;
    }
  } else if (type === 'Step_Voltage_Source' || type === 'PWL_Voltage_Source') {
    newShape.inputs = [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 60, y: 30, label: '2', value: 0, name: 'p2' }];
    newShape.width = 60;
    newShape.height = 60;
    newShape.voltage = 5;
    if (type === 'Step_Voltage_Source') {
      newShape.dutyCycle = 50;
      newShape.frequency = 1000;
    }
  } else if (type === 'MOSFET_N' || type === 'MOSFET_P' || type === 'JFET_N' || type === 'JFET_P') {
    newShape.inputs = [{ x: 0, y: 50, label: 'G', value: 0, name: 'gate' }];
    newShape.outputs = [
      { x: 70, y: 35, label: 'D', value: 0, name: 'drain' },
      { x: 70, y: 65, label: 'S', value: 0, name: 'source' }
    ];
    newShape.width = 70;
    newShape.height = 100;
    newShape.model = type.startsWith('MOSFET') ? (type.includes('_N') ? 'IRF530' : 'IRF9530') : (type.includes('_N') ? 'J310' : 'J271');
  } else if (type === 'VCCS' || type === 'VCVS' || type === 'CCCS' || type === 'CCVS') {
    newShape.inputs = [
      { x: 0, y: 30, label: '+', value: 0, name: 'ctrl_p' },
      { x: 0, y: 70, label: '-', value: 0, name: 'ctrl_n' }
    ];
    newShape.outputs = [
      { x: 50, y: 0, label: 'O1', value: 0, name: 'out1' },
      { x: 50, y: 100, label: 'O2', value: 0, name: 'out2' }
    ];
    newShape.width = 100;
    newShape.height = 100;
    newShape.gain = 1;
  } else if (type === 'Switch_SPST') {
    newShape.inputs = [{ x: 0, y: 25, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 100, y: 25, label: '2', value: 0, name: 'p2' }];
    newShape.width = 100;
    newShape.height = 50;
  } else if (type === 'Switch_SPDT') {
    newShape.inputs = [{ x: 0, y: 40, label: 'C', value: 0, name: 'common' }];
    newShape.outputs = [
      { x: 100, y: 20, label: '1', value: 0, name: 'p1' },
      { x: 100, y: 60, label: '2', value: 0, name: 'p2' }
    ];
    newShape.width = 100;
    newShape.height = 80;
  } else if (type === 'Switch_DPST') {
    newShape.inputs = [
      { x: 0, y: 20, label: '1A', value: 0, name: 'p1a' },
      { x: 0, y: 60, label: '2A', value: 0, name: 'p2a' }
    ];
    newShape.outputs = [
      { x: 100, y: 20, label: '1B', value: 0, name: 'p1b' },
      { x: 100, y: 60, label: '2B', value: 0, name: 'p2b' }
    ];
    newShape.width = 100;
    newShape.height = 80;
  } else if (type === 'Switch_DPDT') {
    newShape.inputs = [
      { x: 0, y: 30, label: 'C1', value: 0, name: 'c1' },
      { x: 0, y: 75, label: 'C2', value: 0, name: 'c2' }
    ];
    newShape.outputs = [
      { x: 100, y: 15, label: '1A', value: 0, name: 'p1a' },
      { x: 100, y: 45, label: '1B', value: 0, name: 'p1b' },
      { x: 100, y: 60, label: '2A', value: 0, name: 'p2a' },
      { x: 100, y: 90, label: '2B', value: 0, name: 'p2b' }
    ];
    newShape.width = 100;
    newShape.height = 100;
  } else if (type === 'Relay_SPDT') {
    newShape.inputs = [
      { x: 45, y: 0, label: 'C1', value: 0, name: 'coil1' },
      { x: 45, y: 100, label: 'C2', value: 0, name: 'coil2' }
    ];
    newShape.outputs = [
      { x: 80, y: 50, label: 'COM', value: 0, name: 'common' },
      { x: 100, y: 30, label: 'NC', value: 0, name: 'nc' },
      { x: 100, y: 70, label: 'NO', value: 0, name: 'no' }
    ];
    newShape.width = 120;
    newShape.height = 100;
  } else if (type === 'Relay_DPDT') {
    newShape.inputs = [
      { x: 45, y: 0, label: 'C1', value: 0, name: 'coil1' },
      { x: 45, y: 100, label: 'C2', value: 0, name: 'coil2' }
    ];
    newShape.outputs = [
      { x: 80, y: 30, label: 'C1', value: 0, name: 'com1' },
      { x: 110, y: 20, label: 'NC1', value: 0, name: 'nc1' },
      { x: 110, y: 40, label: 'NO1', value: 0, name: 'no1' },
      { x: 80, y: 70, label: 'C2', value: 0, name: 'com2' },
      { x: 110, y: 60, label: 'NC2', value: 0, name: 'nc2' },
      { x: 110, y: 80, label: 'NO2', value: 0, name: 'no2' }
    ];
    newShape.width = 140;
    newShape.height = 100;
  } else if (type === 'Voltmeter' || type === 'Ammeter') {
    newShape.inputs = [{ x: 30, y: 0, label: '+', value: 0, name: 'pos' }];
    newShape.outputs = [{ x: 30, y: 60, label: '-', value: 0, name: 'neg' }];
    newShape.width = 60;
    newShape.height = 60;
  } else if (type === 'Probe') {
    newShape.inputs = [{ x: 0, y: 20, label: 'P', value: 0, name: 'probe' }];
    newShape.width = 40;
    newShape.height = 40;
  } else if (type === 'MUX_2to1') {
    newShape.inputs = [
      { x: 0, y: 20, label: '0', value: 0, name: 'in0' },
      { x: 0, y: 60, label: '1', value: 0, name: 'in1' },
      { x: 25, y: 80, label: 'S', value: 0, name: 'sel' }
    ];
    newShape.outputs = [{ x: 40, y: 40, label: 'Y', value: 0, name: 'out' }];
    newShape.width = 40;
    newShape.height = 80;
  } else if (type === 'MUX_4to1') {
    newShape.inputs = [
      { x: 0, y: 20, label: '0', value: 0, name: 'in0' },
      { x: 0, y: 45, label: '1', value: 0, name: 'in1' },
      { x: 0, y: 70, label: '2', value: 0, name: 'in2' },
      { x: 0, y: 95, label: '3', value: 0, name: 'in3' },
      { x: 30, y: 120, label: 'S0', value: 0, name: 'sel0' },
      { x: 45, y: 120, label: 'S1', value: 0, name: 'sel1' }
    ];
    newShape.outputs = [{ x: 60, y: 60, label: 'Y', value: 0, name: 'out' }];
    newShape.width = 60;
    newShape.height = 120;
  } else if (type === 'Half_Adder') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 40, label: 'B', value: 0, name: 'b' }
    ];
    newShape.outputs = [
      { x: 80, y: 20, label: 'S', value: 0, name: 'sum' },
      { x: 80, y: 40, label: 'C', value: 0, name: 'carry' }
    ];
    newShape.width = 80;
    newShape.height = 60;
  } else if (type === 'Full_Adder') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
      { x: 0, y: 40, label: 'B', value: 0, name: 'b' },
      { x: 0, y: 60, label: 'Ci', value: 0, name: 'cin' }
    ];
    newShape.outputs = [
      { x: 80, y: 30, label: 'S', value: 0, name: 'sum' },
      { x: 80, y: 50, label: 'Co', value: 0, name: 'cout' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'Adder_4bit') {
    newShape.inputs = [
      ...Array.from({ length: 4 }, (_, i) => ({ x: 20 + i * 30, y: 0, label: `A${i}`, value: 0, name: `a${i}` })),
      ...Array.from({ length: 4 }, (_, i) => ({ x: 20 + i * 30, y: 60, label: `B${i}`, value: 0, name: `b${i}` })),
      { x: 0, y: 30, label: 'Ci', value: 0, name: 'cin' }
    ];
    newShape.outputs = [
      ...Array.from({ length: 4 }, (_, i) => ({ x: 20 + i * 30, y: 60, label: `S${i}`, value: 0, name: `s${i}` })),
      { x: 160, y: 30, label: 'Co', value: 0, name: 'cout' }
    ];
    newShape.width = 160;
    newShape.height = 60;
  } else if (type === 'Adder_8bit') {
    newShape.inputs = [
      ...Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 25, y: 0, label: `A${i}`, value: 0, name: `a${i}` })),
      ...Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 25, y: 60, label: `B${i}`, value: 0, name: `b${i}` })),
      { x: 0, y: 30, label: 'Ci', value: 0, name: 'cin' }
    ];
    newShape.outputs = [
      ...Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 25, y: 60, label: `S${i}`, value: 0, name: `s${i}` })),
      { x: 240, y: 30, label: 'Co', value: 0, name: 'cout' }
    ];
    newShape.width = 240;
    newShape.height = 60;
  } else if (type === 'SR_Latch' || type === 'SR_Latch_Inv') {
    newShape.inputs = [
      { x: 0, y: 25, label: 'S', value: 0, name: 's' },
      { x: 0, y: 55, label: 'R', value: 0, name: 'r' }
    ];
    newShape.outputs = [
      { x: 80, y: 25, label: 'Q', value: 0, name: 'q' },
      { x: 80, y: 55, label: 'Q\'', value: 0, name: 'q_inv' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'Comparator') {
    newShape.inputs = [
      { x: 0, y: 25, label: '+', value: 0, name: 'pos' },
      { x: 0, y: 75, label: '-', value: 0, name: 'neg' }
    ];
    newShape.outputs = [{ x: 100, y: 50, label: 'Y', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 100;
  } else if (type === 'LB1') {
    newShape.inputs = [{ x: 0, y: 30, label: 'IN', value: 0, name: 'in' }];
    newShape.outputs = [{ x: 100, y: 30, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 60;
    newShape.gain = 1;
  } else if (type === 'SUM1' || type === 'SUM2' || type === 'MUL1') {
    newShape.inputs = [
      { x: 0, y: 30, label: 'A', value: 0, name: 'in1' },
      { x: 30, y: 60, label: 'B', value: 0, name: 'in2' }
    ];
    newShape.outputs = [{ x: 60, y: 30, label: 'Y', value: 0, name: 'out' }];
    newShape.width = 60;
    newShape.height = 60;
  } else if (type === 'Bridge_Rectifier') {
    newShape.inputs = [
      { x: 0, y: 40, label: '~', value: 0, name: 'ac1' },
      { x: 80, y: 40, label: '~', value: 0, name: 'ac2' }
    ];
    newShape.outputs = [
      { x: 40, y: 0, label: '+', value: 0, name: 'pos' },
      { x: 40, y: 80, label: '-', value: 0, name: 'neg' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'Darlington_NPN' || type === 'Darlington_PNP') {
    newShape.inputs = [{ x: 0, y: 40, label: 'B', value: 0, name: 'base' }];
    newShape.outputs = [
      { x: 45, y: 0, label: 'C', value: 0, name: 'collector' },
      { x: 55, y: 80, label: 'E', value: 0, name: 'emitter' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'Variable_Capacitor' || type === 'Polarized_Capacitor') {
    newShape.inputs = [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 100, y: 30, label: '2', value: 0, name: 'p2' }];
    newShape.width = 100;
    newShape.height = 60;
    newShape.capacitance = 1e-6;
  } else if (type === 'Crystal' || type === 'Speaker' || type === 'Lamp' || type === 'Microphone' || type === 'LDR' || type === 'DIAC') {
    newShape.inputs = [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 80, y: 30, label: '2', value: 0, name: 'p2' }];
    newShape.width = 80;
    newShape.height = 60;
    if (type === 'Speaker') newShape.resistance = 8;
    if (type === 'Lamp') newShape.resistance = 100;
    if (type === 'LDR') newShape.resistance = 1000;
  } else if (type === 'Antenna') {
    newShape.inputs = [{ x: 30, y: 80, label: 'IN', value: 0, name: 'in' }];
    newShape.width = 60;
    newShape.height = 80;
  } else if (type === 'SCR' || type === 'TRIAC') {
    newShape.inputs = [
      { x: 0, y: 40, label: 'A', value: 0, name: 'anode' },
      { x: 70, y: 70, label: 'G', value: 0, name: 'gate' }
    ];
    newShape.outputs = [{ x: 100, y: 40, label: 'K', value: 0, name: 'cathode' }];
    newShape.width = 100;
    newShape.height = 80;
  } else if (type === 'PWM_Block') {
    newShape.inputs = [{ x: 0, y: 30, label: 'IN', value: 0, name: 'in' }];
    newShape.outputs = [{ x: 100, y: 30, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 60;
    newShape.dutyCycle = 50;
  } else if (type === 'Zener_Diode' || type === 'Schottky_Diode' || type === 'Photodiode') {
    newShape.inputs = [{ x: 0, y: 25, label: 'A', value: 0, name: 'anode' }];
    newShape.outputs = [{ x: 60, y: 25, label: 'K', value: 0, name: 'cathode' }];
    newShape.width = 60;
    newShape.height = 50;
  } else if (type === 'OpAmp') {
    newShape.inputs = [
      { x: 0, y: 15, label: '-', value: 0, name: 'in_neg' },
      { x: 0, y: 45, label: '+', value: 0, name: 'in_pos' },
      { x: 30, y: 0, label: 'V+', value: 1, name: 'v_pos' },
      { x: 30, y: 60, label: 'V-', value: 0, name: 'v_neg' },
    ];
    newShape.outputs = [{ x: 80, y: 30, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 80;
    newShape.height = 60;
    newShape.gain = 100000;
  } else if (type === 'Node_Label') {
    newShape.width = 80;
    newShape.height = 30;
    newShape.label = 'NODE1';
    newShape.outputs = [{ x: 40, y: 15, label: 'NODE', value: 0, name: 'node' }];
  } else if (type === 'AC_Voltage_Source' || type === 'DC_Voltage_Source' || type === 'Coil') {
    newShape.inputs = [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 60, y: 30, label: '2', value: 0, name: 'p2' }];
    newShape.width = 60;
    newShape.height = 60;
    if (type === 'AC_Voltage_Source') {
      newShape.voltage = 12;
      newShape.frequency = 60;
    } else if (type === 'DC_Voltage_Source') {
      newShape.voltage = 5;
    }
  } else if (type === 'Regulator') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'IN', value: 0, name: 'in' },
      { x: 0, y: 45, label: 'GND', value: 0, name: 'gnd' }
    ];
    newShape.outputs = [{ x: 100, y: 30, label: 'OUT', value: 0, name: 'out' }];
    newShape.width = 100;
    newShape.height = 60;
  } else if (type === 'Transistor_NPN' || type === 'Transistor_PNP') {
    newShape.inputs = [
      { x: 0, y: 25, label: 'B', value: 0, name: 'base' },
      { x: 30, y: 0, label: 'C', value: 0, name: 'collector' }
    ];
    newShape.outputs = [{ x: 30, y: 60, label: 'E', value: 0, name: 'emitter' }];
    newShape.width = 60;
    newShape.height = 60;
  } else if (type === 'Potentiometer') {
    newShape.inputs = [
      { x: 0, y: 10, label: '1', value: 0, name: 'p1' },
      { x: 0, y: 40, label: '2', value: 0, name: 'p2' }
    ];
    newShape.outputs = [{ x: 80, y: 25, label: 'W', value: 0, name: 'wiper' }];
    newShape.width = 80;
    newShape.height = 50;
  } else if (type === 'Battery') {
    newShape.outputs = [
      { x: 60, y: 15, label: '+', value: 1, name: 'pos' },
      { x: 60, y: 35, label: '-', value: 0, name: 'neg' }
    ];
    newShape.width = 60;
    newShape.height = 50;
  } else if (type === 'VCC') {
    newShape.outputs = [{ x: 30, y: 30, label: 'VCC', value: 1, name: 'vcc' }];
    newShape.width = 30;
    newShape.height = 30;
  } else if (type === 'GND' || type === 'GND_Earth' || type === 'GND_Protective' || type === 'GND_Signal') {
    newShape.outputs = [{ x: 30, y: 0, label: 'GND', value: 0, name: 'gnd' }];
    newShape.width = 60;
    newShape.height = 40;
  } else if (type === 'Voltage_Source_Ideal' || type === 'Current_Source_Ideal' || type === 'Pulse_Generator' || type === 'Sawtooth_Generator' || type === 'Step_Generator' || type === 'Cell') {
    newShape.outputs = [
      { x: 60, y: 15, label: '+', value: 5, name: 'pos' },
      { x: 60, y: 45, label: '-', value: 0, name: 'neg' }
    ];
    newShape.width = 60;
    newShape.height = 60;
    newShape.voltage = 5;
    if (type === 'Pulse_Generator') newShape.frequency = 1;
  } else if (type === 'Wattmeter' || type === 'Varmeter' || type === 'Hz_Meter' || type === 'Hour_Meter' || type === 'Thermometer_Symbol') {
    newShape.inputs = [
      { x: 0, y: 20, label: '1', value: 0, name: 'p1' },
      { x: 0, y: 40, label: '2', value: 0, name: 'p2' }
    ];
    newShape.width = 60;
    newShape.height = 60;
  } else if (type === 'Relay') {
    newShape.inputs = [
      { x: 0, y: 15, label: 'C1', value: 0, name: 'coil1' },
      { x: 0, y: 45, label: 'C2', value: 0, name: 'coil2' },
      { x: 0, y: 75, label: 'COM', value: 0, name: 'com' }
    ];
    newShape.outputs = [
      { x: 100, y: 30, label: 'NO', value: 0, name: 'no' },
      { x: 100, y: 60, label: 'NC', value: 0, name: 'nc' }
    ];
    newShape.width = 100;
    newShape.height = 90;
  } else if (type === 'Transformer') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'P1', value: 0, name: 'p1' },
      { x: 0, y: 60, label: 'P2', value: 0, name: 'p2' }
    ];
    newShape.outputs = [
      { x: 80, y: 20, label: 'S1', value: 0, name: 's1' },
      { x: 80, y: 60, label: 'S2', value: 0, name: 's2' }
    ];
    newShape.width = 80;
    newShape.height = 80;
  } else if (type === 'Text') {
    newShape.width = 200;
    newShape.height = 40;
    newShape.label = 'New Label';
    newShape.fontSize = 16;
    newShape.font = '16px Orbitron';
  } else if (type === 'ICMAX7219') {
    newShape.inputs = [
      { x: 0, y: 20, label: 'DIN', value: 0, name: 'din' },
      { x: 0, y: 40, label: 'CLK', value: 0, name: 'clk' },
      { x: 0, y: 60, label: 'LOAD', value: 0, name: 'load' },
      { x: 0, y: 80, label: 'VCC', value: 1, name: 'vcc' },
      { x: 0, y: 100, label: 'GND', value: 0, name: 'gnd' },
      { x: 0, y: 120, label: 'ISET', value: 0, name: 'iset' },
    ];
    newShape.outputs = [
      { x: 120, y: 20, label: 'DOUT', value: 0, name: 'dout' },
      ...Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 40 + i * 20, label: `DIG${i}`, value: 0, name: `dig${i}` })),
      ...Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 200 + i * 20, label: `SEG${String.fromCharCode(65 + i)}`, value: 0, name: `seg${String.fromCharCode(65 + i)}` })),
    ];
    newShape.width = 120;
    newShape.height = 360;
  } else if (type === 'IC_TD7000') {
    newShape.inputs = [
      { x: 0, y: 20, label: '1', value: 0, name: 'p1' },
      { x: 0, y: 40, label: '2', value: 0, name: 'p2' },
      { x: 0, y: 60, label: '3', value: 0, name: 'p3' },
      { x: 0, y: 80, label: '4', value: 0, name: 'p4' },
      { x: 0, y: 100, label: '5', value: 0, name: 'p5' },
      { x: 0, y: 120, label: '6', value: 0, name: 'p6' },
      { x: 0, y: 140, label: '7', value: 0, name: 'p7' },
      { x: 0, y: 160, label: '8', value: 0, name: 'p8' },
      { x: 0, y: 180, label: '9', value: 0, name: 'p9' },
    ];
    newShape.outputs = [
      { x: 160, y: 20, label: '10', value: 0, name: 'p10' },
      { x: 160, y: 40, label: '11', value: 0, name: 'p11' },
      { x: 160, y: 60, label: '12', value: 0, name: 'p12' },
      { x: 160, y: 80, label: '13', value: 0, name: 'p13' },
      { x: 160, y: 100, label: '14', value: 0, name: 'p14' },
      { x: 160, y: 120, label: '15', value: 0, name: 'p15' },
      { x: 160, y: 140, label: '16', value: 0, name: 'p16' },
      { x: 160, y: 160, label: '17', value: 0, name: 'p17' },
      { x: 160, y: 180, label: '18', value: 0, name: 'p18' },
    ];
    newShape.width = 160;
    newShape.height = 200;
    newShape.label = 'TD-7000';
  } else if (type === 'CustomBlock') {
    newShape.width = 120;
    newShape.height = 80;
    newShape.color = '#8b5cf6'; // Purple for custom blocks
  } else if (type === 'FlowStart' || type === 'FlowEnd') {
    newShape.width = 100;
    newShape.height = 50;
    newShape.label = type === 'FlowStart' ? 'START' : 'END';
    newShape.inputs = type === 'FlowEnd' ? [{ x: 50, y: 0, label: 'In', value: 0, name: 'in' }] : [];
    newShape.outputs = type === 'FlowStart' ? [{ x: 50, y: 50, label: 'Out', value: 0, name: 'out' }] : [];
  } else if (type === 'FlowProcess') {
    newShape.width = 120;
    newShape.height = 60;
    newShape.label = 'PROCESS';
    newShape.inputs = [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }];
    newShape.outputs = [{ x: 60, y: 60, label: 'Out', value: 0, name: 'out' }];
  } else if (type === 'FlowDecision') {
    newShape.width = 120;
    newShape.height = 80;
    newShape.label = 'DECISION';
    newShape.inputs = [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }];
    newShape.outputs = [
      { x: 60, y: 80, label: 'YES', value: 0, name: 'out_yes' },
      { x: 120, y: 40, label: 'NO', value: 0, name: 'out_no' }
    ];
  } else if (type === 'FlowInputOutput') {
    newShape.width = 120;
    newShape.height = 60;
    newShape.label = 'DATA';
    newShape.inputs = [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }];
    newShape.outputs = [{ x: 60, y: 60, label: 'Out', value: 0, name: 'out' }];
  } else if (type.startsWith('PCB_DIP')) {
    const pins = parseInt(type.replace('PCB_DIP', ''));
    const rows = pins / 2;
    newShape.width = 60;
    newShape.height = rows * 20 + 20;
    newShape.inputs = Array.from({ length: rows }, (_, i) => ({
      x: 0, y: 20 + i * 20, label: `${i + 1}`, value: 0, name: `pin_${i + 1}`
    }));
    newShape.outputs = Array.from({ length: rows }, (_, i) => ({
      x: 60, y: 20 + (rows - 1 - i) * 20, label: `${rows + i + 1}`, value: 0, name: `pin_${rows + i + 1}`
    }));
    newShape.label = `DIP-${pins}`;
  } else if (type === 'PCB_LCD16x2') {
    newShape.width = 160;
    newShape.height = 80;
    newShape.label = 'LCD 16x2';
    newShape.inputs = Array.from({ length: 16 }, (_, i) => ({
      x: 10 + i * 9, y: 10, label: `${i + 1}`, value: 0, name: `pin_${i + 1}`
    }));
  } else if (type === 'PCB_Resistor') {
    newShape.width = 50;
    newShape.height = 20;
    newShape.inputs = [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }];
    newShape.outputs = [{ x: 50, y: 10, label: '2', value: 0, name: 'p2' }];
  } else if (type === 'PCB_Capacitor' || type === 'PCB_Capacitor_Polar') {
    newShape.width = 30;
    newShape.height = 30;
    newShape.inputs = [{ x: 5, y: 15, label: '+', value: 0, name: 'pos' }];
    newShape.outputs = [{ x: 25, y: 15, label: '-', value: 0, name: 'neg' }];
  } else if (type === 'PCB_LED') {
    newShape.width = 30;
    newShape.height = 30;
    newShape.inputs = [{ x: 10, y: 10, label: 'A', value: 0, name: 'anode' }];
    newShape.outputs = [{ x: 20, y: 20, label: 'K', value: 0, name: 'cathode' }];
  } else if (type === 'PCB_Potentiometer') {
    newShape.width = 40;
    newShape.height = 40;
    newShape.inputs = [
      { x: 10, y: 10, label: '1', value: 0, name: 'p1' },
      { x: 30, y: 10, label: '3', value: 0, name: 'p3' }
    ];
    newShape.outputs = [{ x: 20, y: 30, label: '2', value: 0, name: 'wiper' }];
  } else if (type === 'PCB_Switch_Tactile') {
    newShape.width = 40;
    newShape.height = 40;
    newShape.inputs = [
      { x: 5, y: 10, label: '1', value: 0, name: 'p1' },
      { x: 5, y: 30, label: '2', value: 0, name: 'p2' }
    ];
    newShape.outputs = [
      { x: 35, y: 10, label: '3', value: 0, name: 'p3' },
      { x: 35, y: 30, label: '4', value: 0, name: 'p4' }
    ];
  } else if (type.startsWith('PCB_Header_')) {
    const pins = parseInt(type.replace('PCB_Header_', ''));
    newShape.width = 20;
    newShape.height = pins * 15 + 10;
    newShape.outputs = Array.from({ length: pins }, (_, i) => ({
      x: 10, y: 10 + i * 15, label: `${i + 1}`, value: 0, name: `pin_${i + 1}`
    }));
    newShape.label = `HDR-${pins}`;
  } else if (type === 'PCB_Pad_Circular' || type === 'PCB_Pad_Square') {
    newShape.width = 20;
    newShape.height = 20;
    newShape.outputs = [{ x: 10, y: 10, label: 'P', value: 0, name: 'pad' }];
  } else if (type === 'PCB_Via') {
    newShape.width = 10;
    newShape.height = 10;
    newShape.outputs = [{ x: 5, y: 5, label: 'V', value: 0, name: 'via' }];
  } else if (type === 'PCB_Mounting_Hole') {
    newShape.width = 30;
    newShape.height = 30;
  } else if (type === 'PCB_Crystal') {
    newShape.width = 40;
    newShape.height = 20;
    newShape.inputs = [
      { x: 5, y: 10, label: '1', value: 0, name: 'p1' },
      { x: 35, y: 10, label: '2', value: 0, name: 'p2' }
    ];
  }

  return newShape;
};
