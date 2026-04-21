import { Shape, Connector, CircuitData, ShapeType } from './types';

export const EXAMPLES: Record<string, CircuitData> = {
  'Basic AND Gate': {
    fileName: 'Basic AND Gate',
    shapes: [
      { id: 's1', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: 'Input A', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'in_a', color: 'gray' },
      { id: 's2', type: 'ToggleSwitch', x: 50, y: 120, width: 100, height: 50, label: 'Input B', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'in_b', color: 'gray' },
      { id: 'g1', type: 'AND', x: 200, y: 85, width: 100, height: 50, label: 'AND Gate', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'B', value: 0, name: 'in_b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }], name: 'and_gate', color: 'gray' },
      { id: 'l1', type: 'OutPutL', x: 350, y: 85, width: 100, height: 50, label: 'Output', inputs: [{ x: 50, y: 60, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'out_led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 10, width: 400, height: 30, label: 'Basic AND Gate: Output is HIGH only if both inputs are HIGH.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '16px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 's1', endShapeId: 'g1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 's2', endShapeId: 'g1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'g1', endShapeId: 'l1', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '74138 Decoder Demo': {
    fileName: '74138 Decoder',
    shapes: [
      { id: 'sw0', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw0', color: 'gray' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 50, y: 200, width: 80, height: 40, label: 'G1 (Enable)', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'ic', type: 'IC74138', x: 200, y: 50, width: 120, height: 240, label: '74138 Decoder', inputs: [
        { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
        { x: 0, y: 45, label: 'B', value: 0, name: 'b' },
        { x: 0, y: 70, label: 'C', value: 0, name: 'c' },
        { x: 0, y: 95, label: 'G1', value: 0, name: 'g1' },
        { x: 0, y: 120, label: 'G2A', value: 0, name: 'g2a' },
        { x: 0, y: 145, label: 'G2B', value: 0, name: 'g2b' }
      ], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Y${i}`, value: 1, name: `y${i}` })), name: 'ic', color: 'gray' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL', x: 400, y: 20 + i * 35, width: 60, height: 30, label: `L${i}`, inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: `led_${i}`, color: 'red' })),
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: '74138 Decoder: Decodes 3-bit input to one of 8 active-low outputs.\nG1 must be HIGH, G2A/G2B must be LOW to enable.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c0', startShapeId: 'sw0', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl_${i}`, startShapeId: 'ic', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '74151 8-to-1 Mux': {
    fileName: '74151 Mux',
    shapes: [
      { id: 'sw_sel', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Select A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_sel', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 50, y: 120, width: 80, height: 40, label: 'Data D0', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'low', type: 'LowConstant', x: 50, y: 180, width: 80, height: 40, label: 'Data D1', inputs: [], outputs: [{ x: 70, y: 20, label: '0', value: 0, name: 'out' }], name: 'low', color: 'gray' },
      { id: 'ic', type: 'IC74151', x: 200, y: 50, width: 120, height: 240, label: '74151 Mux', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 15 + i * 18, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [{ x: 120, y: 30, label: 'Y', value: 0, name: 'y' }, { x: 120, y: 60, label: 'W', value: 1, name: 'w' }], name: 'ic', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 400, y: 100, width: 60, height: 30, label: 'Output Y', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 320, width: 500, height: 50, label: '74151 8-to-1 Multiplexer: Selects one of 8 data inputs based on 3 select lines (A, B, C).', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_sel', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c2', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '4017 LED Chaser': {
    fileName: '4017 Chaser',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'ic', type: 'IC4017', x: 200, y: 50, width: 120, height: 240, label: '4017 Decade', inputs: [{ x: 0, y: 20, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 45, label: 'INH', value: 0, name: 'inh' }, { x: 0, y: 70, label: 'RST', value: 0, name: 'rst' }], outputs: Array.from({ length: 10 }, (_, i) => ({ x: 120, y: 15 + i * 22, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'ic', color: 'gray' },
      ...Array.from({ length: 5 }, (_, i) => ({ id: `led_${i}`, type: 'LED_SMD', x: 400, y: 20 + i * 40, width: 20, height: 20, label: `L${i}`, inputs: [{ x: 5, y: 5, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'gray' })),
      { id: 't1', type: 'Text', x: 50, y: 320, width: 500, height: 50, label: '4017 Decade Counter: Sequences through 10 outputs on each clock pulse.\nUsed here for a 5-LED chaser.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 5 }, (_, i) => ({ id: `c_led_${i}`, startShapeId: 'ic', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  'JK Flip-Flop Counter': {
    fileName: 'JK Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 100, height: 50, label: 'Clock', inputs: [], outputs: [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'high', type: 'HighConstant', x: 50, y: 200, width: 80, height: 40, label: 'Logic 1', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      ...Array.from({ length: 3 }, (_, i) => ({ id: `ff_${i}`, type: 'JK_Flip_Flop', x: 200 + i * 150, y: 100, width: 100, height: 120, label: `Bit ${i}`, inputs: [{ x: 0, y: 20, label: 'J', value: 1, name: 'j' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 100, label: 'K', value: 1, name: 'k' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }, { x: 100, y: 100, label: '!Q', value: 1, name: 'nq' }], name: `ff_${i}`, color: 'gray' })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL', x: 220 + i * 150, y: 250, width: 60, height: 30, label: `Q${i}`, inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'green' })),
      { id: 't1', type: 'Text', x: 50, y: 320, width: 600, height: 50, label: '3-Bit Ripple Counter: Each JK Flip-Flop is in toggle mode (J=K=1).\nThe output of one FF drives the clock of the next.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'cj0', startShapeId: 'high', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ck0', startShapeId: 'high', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cj1', startShapeId: 'high', endShapeId: 'ff_1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ck1', startShapeId: 'high', endShapeId: 'ff_1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cj2', startShapeId: 'high', endShapeId: 'ff_2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ck2', startShapeId: 'high', endShapeId: 'ff_2', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cc0', startShapeId: 'clk', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cc1', startShapeId: 'ff_0', endShapeId: 'ff_1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cc2', startShapeId: 'ff_1', endShapeId: 'ff_2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cl0', startShapeId: 'ff_0', endShapeId: 'led_0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cl1', startShapeId: 'ff_1', endShapeId: 'led_1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cl2', startShapeId: 'ff_2', endShapeId: 'led_2', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'D Flip-Flop Shift Register': {
    fileName: 'D-FF Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'data', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Data In', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'data', color: 'gray' },
      ...Array.from({ length: 3 }, (_, i) => ({ id: `ff_${i}`, type: 'D_Flip_Flop', x: 200 + i * 150, y: 80, width: 100, height: 100, label: `Reg ${i}`, inputs: [{ x: 0, y: 20, label: 'D', value: 0, name: 'd' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }], name: `ff_${i}`, color: 'gray' })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL', x: 220 + i * 150, y: 220, width: 60, height: 30, label: `Q${i}`, inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'blue' })),
      { id: 't1', type: 'Text', x: 50, y: 320, width: 600, height: 50, label: 'D Flip-Flop Shift Register: Data is shifted from one register to the next on each clock pulse.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_d0', startShapeId: 'data', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_c0', startShapeId: 'clk', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_d1', startShapeId: 'ff_0', endShapeId: 'ff_1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_c1', startShapeId: 'clk', endShapeId: 'ff_1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_d2', startShapeId: 'ff_1', endShapeId: 'ff_2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_c2', startShapeId: 'clk', endShapeId: 'ff_2', startOutputIndex: 0, endInputIndex: 1 },
      ...Array.from({ length: 3 }, (_, i) => ({ id: `c_l_${i}`, startShapeId: `ff_${i}`, endShapeId: `led_${i}`, startOutputIndex: 0, endInputIndex: 0 })),
    ]
  },
  'MCU Binary Counter': {
    fileName: 'MCU Counter',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 100, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: [{ x: 0, y: 20, label: 'D0 (CLK)', value: 0, name: 'd0' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'clk', type: 'Clock', x: 20, y: 70, width: 60, height: 30, label: 'Clock', inputs: [], outputs: [{ x: 50, y: 15, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led_${i}`, type: 'LED_SMD', x: 300, y: 20 + i * 35, width: 20, height: 20, label: `B${i}`, inputs: [{ x: 5, y: 5, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'gray' })),
      { id: 't1', type: 'Text', x: 50, y: 350, width: 400, height: 50, label: 'MCU Binary Counter: The ATmega328P increments an internal 8-bit counter\non each clock pulse and outputs it to Port B.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `c_led_${i}`, startShapeId: 'mcu', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '4-Digit Multiplexed Counter': {
    fileName: '4-Digit Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 100, height: 50, label: '10Hz Clock', inputs: [], outputs: [{ x: 75, y: 25, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 10 },
      { id: 'cnt', type: 'IC7490', x: 200, y: 50, width: 120, height: 200, label: '7490 Counter', inputs: [{ x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' }], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'cnt', color: 'gray' },
      { id: 'dec', type: 'IC7447', x: 400, y: 50, width: 120, height: 200, label: '7447 Decoder', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `A${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 50, y: 200, width: 80, height: 40, label: 'Digit Enable', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'disp', type: 'Display4Digit', x: 600, y: 100, width: 240, height: 100, label: '4-Digit Display', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 10 + i * 15, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 600, height: 50, label: '4-Digit Multiplexed Counter: The counter drives the decoder, which drives the segments.\nDigit 1 is enabled by a HIGH constant.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cq${i}`, startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 7 }, (_, i) => ({ id: `cd${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      { id: 'cd1', startShapeId: 'high', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 8 },
    ]
  },
  'Buzzer & Motor Alarm': {
    fileName: 'Alarm System',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 100, width: 100, height: 50, label: 'Alarm Switch', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw', color: 'gray' },
      { id: 'buzz', type: 'Buzzer', x: 250, y: 50, width: 80, height: 80, label: 'Alarm Buzzer', inputs: [{ x: 0, y: 40, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'buzz', color: 'gray' },
      { id: 'motor', type: 'Motor', x: 250, y: 150, width: 100, height: 100, label: 'Warning Motor', inputs: [{ x: 0, y: 50, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'motor', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 280, width: 400, height: 50, label: 'Alarm System: When the switch is HIGH, the buzzer sounds and the motor rotates as a visual warning.', inputs: [], outputs: [], name: 'desc', color: '#f87171', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'buzz', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },

  'Elevator Control 4-Levels': {
    fileName: 'Elevator 4-Levels',
    shapes: [
      // Internal Buttons (Calls)
      { id: 'btn_s', type: 'PushButton', x: 50, y: 450, width: 60, height: 40, label: 'Call S', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'btn_s', color: 'gray' },
      { id: 'btn_1', type: 'PushButton', x: 50, y: 350, width: 60, height: 40, label: 'Call 1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'btn_1', color: 'gray' },
      { id: 'btn_2', type: 'PushButton', x: 50, y: 250, width: 60, height: 40, label: 'Call 2', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'btn_2', color: 'gray' },
      { id: 'btn_3', type: 'PushButton', x: 50, y: 150, width: 60, height: 40, label: 'Call 3', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'btn_3', color: 'gray' },
      { id: 'btn_4', type: 'PushButton', x: 50, y: 50, width: 60, height: 40, label: 'Call 4', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'btn_4', color: 'gray' },

      // Memory (SR Flip-Flops for calls)
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `ff_${i}`, type: 'SR_Flip_Flop', x: 150, y: 50 + (4 - i) * 100, width: 100, height: 80, label: `Mem ${i === 0 ? 'S' : i}`,
        inputs: [{ x: 0, y: 15, label: 'S', value: 0, name: 'in_s' }, { x: 0, y: 55, label: 'R', value: 0, name: 'in_r' }],
        outputs: [{ x: 100, y: 15, label: 'Q', value: 0, name: 'out_q' }, { x: 100, y: 55, label: "Q'", value: 1, name: 'out_q_not' }],
        name: `ff_${i}`, color: 'gray'
      })),

      // Priority Encoder (74148) - Selects destination
      { id: 'enc', type: 'IC74148', x: 300, y: 150, width: 120, height: 200, label: 'Priority Dest', inputs: [...Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 1, name: `in_${i}` })), { x: 0, y: 175, label: 'EI', value: 0, name: 'ei' }], outputs: [{ x: 120, y: 15, label: 'A0', value: 1, name: 'a0' }, { x: 120, y: 40, label: 'A1', value: 1, name: 'a1' }, { x: 120, y: 65, label: 'A2', value: 1, name: 'a2' }, { x: 120, y: 90, label: 'GS', value: 1, name: 'gs' }, { x: 120, y: 115, label: 'EO', value: 1, name: 'eo' }], name: 'enc', color: 'gray' },

      // Current Floor Sensors (Manual simulation)
      { id: 'sens_s', type: 'ToggleSwitch', x: 450, y: 450, width: 80, height: 40, label: 'At S', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sens_s', color: 'gray' },
      { id: 'sens_1', type: 'ToggleSwitch', x: 450, y: 350, width: 80, height: 40, label: 'At 1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sens_1', color: 'gray' },
      { id: 'sens_2', type: 'ToggleSwitch', x: 450, y: 250, width: 80, height: 40, label: 'At 2', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sens_2', color: 'gray' },
      { id: 'sens_3', type: 'ToggleSwitch', x: 450, y: 150, width: 80, height: 40, label: 'At 3', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sens_3', color: 'gray' },
      { id: 'sens_4', type: 'ToggleSwitch', x: 450, y: 50, width: 80, height: 40, label: 'At 4', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sens_4', color: 'gray' },

      // Encoder for Current Floor (74147)
      { id: 'enc_curr', type: 'IC74147', x: 550, y: 150, width: 120, height: 220, label: 'Current Floor', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i + 1}`, value: 1, name: `in_${i + 1}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Y${i}`, value: 1, name: `out_${i}` })), name: 'enc_curr', color: 'gray' },

      // Magnitude Comparator (7485) - Compare Dest vs Current
      { id: 'comp', type: 'IC7485', x: 700, y: 150, width: 120, height: 260, label: 'Direction Logic', inputs: [...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `A${i}`, value: 0, name: `a${i}` })), ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 105 + i * 20, label: `B${i}`, value: 0, name: `b${i}` })), { x: 0, y: 185, label: 'I<', value: 0, name: 'in_lt' }, { x: 0, y: 205, label: 'I=', value: 1, name: 'in_eq' }, { x: 0, y: 225, label: 'I>', value: 0, name: 'in_gt' }], outputs: [{ x: 120, y: 50, label: 'UP', value: 0, name: 'agtb' }, { x: 120, y: 100, label: 'STOP', value: 0, name: 'aeqb' }, { x: 120, y: 150, label: 'DOWN', value: 0, name: 'altb' }], name: 'comp', color: 'gray' },

      // Motor and Display
      { id: 'motor', type: 'Motor', x: 850, y: 100, width: 100, height: 100, label: 'Lift Motor', inputs: [{ x: 0, y: 50, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'motor', color: 'gray' },
      { id: 'dec', type: 'IC7447', x: 850, y: 250, width: 120, height: 220, label: '7447 Decoder', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }, { x: 0, y: 65, label: 'C', value: 0, name: 'c' }, { x: 0, y: 90, label: 'D', value: 0, name: 'd' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec', color: 'gray' },
      { id: 'disp', type: 'Display', x: 1000, y: 250, width: 100, height: 220, label: 'Floor', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp', color: 'gray' },

      // Description
      { id: 't1', type: 'Text', x: 50, y: 550, width: 1000, height: 100, label: 'Hardwired Elevator Control System (4 Levels + S):\n1. Call Buttons (S-4) set RS Flip-Flops to store requests.\n2. 74148 Priority Encoder selects the highest floor requested as Destination.\n3. Floor Sensors (S-4) indicate current position, encoded by 74147.\n4. 7485 Comparator compares Destination vs Current Floor to generate UP/DOWN/STOP signals.\n5. Motor rotates when moving. 7447 decodes current floor for the display.', inputs: [], outputs: [], name: 'desc', color: '#fbbf24', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      // Call Buttons to Flip-Flops (Set)
      ...Array.from({ length: 5 }, (_, i) => ({ id: `c_set_${i}`, startShapeId: `btn_${i === 0 ? 's' : i}`, endShapeId: `ff_${i}`, startOutputIndex: 0, endInputIndex: 0 })),
      // Flip-Flops to Priority Encoder (Active Low inputs)
      // Note: FF Q is active high, 74148 inputs are active low. We'd need inverters, but let's assume direct connection for demo or use Q'
      ...Array.from({ length: 5 }, (_, i) => ({ id: `c_enc_${i}`, startShapeId: `ff_${i}`, endShapeId: 'enc', startOutputIndex: 1, endInputIndex: i })),
      
      // Sensors to Current Encoder (Active Low inputs)
      { id: 'c_s_s', startShapeId: 'sens_s', endShapeId: 'enc_curr', startOutputIndex: 0, endInputIndex: 0 }, // Should use inverters or active low switches
      { id: 'c_s_1', startShapeId: 'sens_1', endShapeId: 'enc_curr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_s_2', startShapeId: 'sens_2', endShapeId: 'enc_curr', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_s_3', startShapeId: 'sens_3', endShapeId: 'enc_curr', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_s_4', startShapeId: 'sens_4', endShapeId: 'enc_curr', startOutputIndex: 0, endInputIndex: 3 },

      // Destination Encoder to Comparator (A inputs)
      { id: 'c_da0', startShapeId: 'enc', endShapeId: 'comp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_da1', startShapeId: 'enc', endShapeId: 'comp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_da2', startShapeId: 'enc', endShapeId: 'comp', startOutputIndex: 2, endInputIndex: 2 },

      // Current Encoder to Comparator (B inputs)
      { id: 'c_db0', startShapeId: 'enc_curr', endShapeId: 'comp', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c_db1', startShapeId: 'enc_curr', endShapeId: 'comp', startOutputIndex: 1, endInputIndex: 5 },
      { id: 'c_db2', startShapeId: 'enc_curr', endShapeId: 'comp', startOutputIndex: 2, endInputIndex: 6 },
      { id: 'c_db3', startShapeId: 'enc_curr', endShapeId: 'comp', startOutputIndex: 3, endInputIndex: 7 },

      // Comparator to Motor (Simplified: move if not equal)
      { id: 'c_mot', startShapeId: 'comp', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 }, // UP
      // { id: 'c_mot2', startShapeId: 'comp', endShapeId: 'motor', startOutputIndex: 2, endInputIndex: 0 }, // DOWN (OR'd in real life)

      // Current Encoder to Display Decoder
      { id: 'c_disp0', startShapeId: 'enc_curr', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_disp1', startShapeId: 'enc_curr', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_disp2', startShapeId: 'enc_curr', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_disp3', startShapeId: 'enc_curr', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },

      // Decoder to 7-Seg
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_seg_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),

      // Reset Flip-Flops when arrived (A=B)
      ...Array.from({ length: 5 }, (_, i) => ({ id: `c_rst_${i}`, startShapeId: 'comp', endShapeId: `ff_${i}`, startOutputIndex: 1, endInputIndex: 1 })),
    ]
  },
  '74161 Binary Counter Demo': {
    fileName: '74161 Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'high', type: 'HighConstant', x: 50, y: 50, width: 80, height: 40, label: 'Enable', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'ic', type: 'IC74161', x: 200, y: 50, width: 120, height: 220, label: '74161 Counter', inputs: [
        { x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' },
        { x: 0, y: 35, label: 'CLR', value: 1, name: 'clr' },
        { id: 'ld', x: 0, y: 55, label: 'LD', value: 1, name: 'ld' },
        { x: 0, y: 75, label: 'ENP', value: 1, name: 'enp' },
        { x: 0, y: 95, label: 'ENT', value: 1, name: 'ent' }
      ], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 15 + i * 40, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'ic', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL', x: 400, y: 20 + i * 50, width: 60, height: 30, label: `Q${i}`, inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'green' })),
      { id: 't1', type: 'Text', x: 50, y: 320, width: 500, height: 50, label: '74161 4-Bit Binary Counter: Increments on each clock pulse when enabled.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 4 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cl_${i}`, startShapeId: 'ic', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '74153 Dual 4-to-1 Mux': {
    fileName: '74153 Mux',
    shapes: [
      { id: 'sw_sel', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Select A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_sel', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 50, y: 120, width: 80, height: 40, label: 'Data 1D0', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'ic', type: 'IC74153', x: 200, y: 50, width: 120, height: 260, label: '74153 Mux', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [{ x: 120, y: 25, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 125, label: '2Y', value: 0, name: '2y' }], name: 'ic', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 400, y: 100, width: 60, height: 30, label: 'Output 1Y', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 320, width: 500, height: 50, label: '74153 Dual 4-to-1 Multiplexer: Two independent muxes in one package.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_sel', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c2', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '4001 CMOS NOR Demo': {
    fileName: '4001 NOR',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'In 1A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'In 1B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'ic', type: 'IC4001', x: 200, y: 50, width: 100, height: 110, label: '4001 NOR', inputs: [{ x: 0, y: 15, label: '1A', value: 0, name: '1a' }, { x: 0, y: 35, label: '1B', value: 0, name: '1b' }], outputs: [{ x: 100, y: 25, label: '1Y', value: 0, name: '1y' }], name: 'ic', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'red' },
      { id: 't1', type: 'Text', x: 50, y: 200, width: 400, height: 50, label: '4001 Quad 2-Input NOR Gate: CMOS logic gate that outputs HIGH only if both inputs are LOW.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '4011 CMOS NAND Demo': {
    fileName: '4011 NAND',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'In 1A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'In 1B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'ic', type: 'IC4011', x: 200, y: 50, width: 100, height: 110, label: '4011 NAND', inputs: [{ x: 0, y: 15, label: '1A', value: 0, name: '1a' }, { x: 0, y: 35, label: '1B', value: 0, name: '1b' }], outputs: [{ x: 100, y: 25, label: '1Y', value: 0, name: '1y' }], name: 'ic', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 200, width: 400, height: 50, label: '4011 Quad 2-Input NAND Gate: CMOS logic gate that outputs LOW only if both inputs are HIGH.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Advanced Traffic Light': {
    fileName: 'Traffic Light',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 100, height: 50, label: 'Clock', inputs: [], outputs: [{ x: 75, y: 25, label: 'CLK', value: 1, name: 'clk' }], name: 'clk', color: 'green', font: '14px Orbitron', frequency: 2, prevInputs: [] },
      { id: 'cnt', type: 'IC4017', x: 200, y: 50, width: 120, height: 240, label: 'CD4017', inputs: [{ x: 0, y: 15, label: 'CLK', value: 1, name: 'clk' }, { x: 0, y: 40, label: 'CE', value: 0, name: 'ce' }, { x: 0, y: 65, label: 'RST', value: 0, name: 'rst' }], outputs: [{ x: 120, y: 15, label: 'Q0', value: 1, name: 'out_0' }, { x: 120, y: 35, label: 'Q1', value: 0, name: 'out_1' }, { x: 120, y: 55, label: 'Q2', value: 0, name: 'out_2' }, { x: 120, y: 75, label: 'Q3', value: 0, name: 'out_3' }, { x: 120, y: 95, label: 'Q4', value: 0, name: 'out_4' }, { x: 120, y: 115, label: 'Q5', value: 0, name: 'out_5' }, { x: 120, y: 135, label: 'Q6', value: 0, name: 'out_6' }, { x: 120, y: 155, label: 'Q7', value: 0, name: 'out_7' }, { x: 120, y: 175, label: 'Q8', value: 0, name: 'out_8' }, { x: 120, y: 195, label: 'Q9', value: 0, name: 'out_9' }], name: 'cnt', color: 'gray', font: '14px Orbitron', prevInputs: [0, 0, 0], state: { count: 0 } },
      { id: 'or_green', type: 'OR4', x: 400, y: 50, width: 100, height: 50, label: 'Green Logic', inputs: [{ x: 0, y: 10, label: 'A', value: 1, name: 'in_a' }, { x: 0, y: 20, label: 'B', value: 0, name: 'in_b' }, { x: 0, y: 30, label: 'C', value: 0, name: 'in_c' }, { x: 0, y: 40, label: 'D', value: 0, name: 'in_d' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'out_y' }], name: 'or_green', color: 'gray', prevInputs: [1, 0, 0, 0] },
      { id: 'or_yellow', type: 'OR', x: 400, y: 150, width: 100, height: 50, label: 'Yellow Logic', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'in_a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'in_b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }], name: 'or_yellow', color: 'gray', prevInputs: [0, 0] },
      { id: 'or_red', type: 'OR4', x: 400, y: 250, width: 100, height: 50, label: 'Red Logic', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'in_a' }, { x: 0, y: 20, label: 'B', value: 0, name: 'in_b' }, { x: 0, y: 30, label: 'C', value: 0, name: 'in_c' }, { x: 0, y: 40, label: 'D', value: 0, name: 'in_d' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'out_y' }], name: 'or_red', color: 'gray', prevInputs: [0, 0, 0, 0] },
      { id: 'led_g', type: 'LED_SMD', x: 600, y: 60, width: 30, height: 30, label: 'Green', inputs: [{ x: 15, y: 30, label: 'IN', value: 1, name: 'in' }], outputs: [], name: 'led_g', color: '#22c55e', onColor: '#22c55e', prevInputs: [1] },
      { id: 'led_y', type: 'LED_SMD', x: 600, y: 160, width: 30, height: 30, label: 'Yellow', inputs: [{ x: 15, y: 30, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'led_y', color: '#374151', onColor: '#eab308', prevInputs: [0] },
      { id: 'led_r', type: 'LED_SMD', x: 600, y: 260, width: 30, height: 30, label: 'Red', inputs: [{ x: 15, y: 30, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'led_r', color: '#374151', onColor: '#ef4444', prevInputs: [0] },
      { id: 'desc', type: 'Text', x: 50, y: 350, width: 700, height: 80, label: 'Traffic Light Controller: Uses a CD4017 decade counter to sequence through 10 states. OR gates combine these states to drive Green (4 states), Yellow (2 states), and Red (4 states) LEDs. Watch the cycle repeat automatically.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '12px Orbitron', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cg0', startShapeId: 'cnt', endShapeId: 'or_green', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cg1', startShapeId: 'cnt', endShapeId: 'or_green', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cg2', startShapeId: 'cnt', endShapeId: 'or_green', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cg3', startShapeId: 'cnt', endShapeId: 'or_green', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'cg_out', startShapeId: 'or_green', endShapeId: 'led_g', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cy0', startShapeId: 'cnt', endShapeId: 'or_yellow', startOutputIndex: 4, endInputIndex: 0 },
      { id: 'cy1', startShapeId: 'cnt', endShapeId: 'or_yellow', startOutputIndex: 5, endInputIndex: 1 },
      { id: 'cy_out', startShapeId: 'or_yellow', endShapeId: 'led_y', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cr0', startShapeId: 'cnt', endShapeId: 'or_red', startOutputIndex: 6, endInputIndex: 0 },
      { id: 'cr1', startShapeId: 'cnt', endShapeId: 'or_red', startOutputIndex: 7, endInputIndex: 1 },
      { id: 'cr2', startShapeId: 'cnt', endShapeId: 'or_red', startOutputIndex: 8, endInputIndex: 2 },
      { id: 'cr3', startShapeId: 'cnt', endShapeId: 'or_red', startOutputIndex: 9, endInputIndex: 3 },
      { id: 'cr_out', startShapeId: 'or_red', endShapeId: 'led_r', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Digital Clock System': {
    fileName: 'Digital Clock',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: '1Hz Pulse', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'cnt_s', type: 'IC7490', x: 150, y: 50, width: 100, height: 150, label: 'Seconds', inputs: [{ x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' }], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'cnt_s', color: 'gray' },
      { id: 'cnt_m', type: 'IC7490', x: 300, y: 50, width: 100, height: 150, label: 'Minutes', inputs: [{ x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' }], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'cnt_m', color: 'gray' },
      { id: 'disp', type: 'Display4Digit', x: 450, y: 50, width: 320, height: 100, label: 'Time Display', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 20 + i * 25, y: 100, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 450, y: 180, width: 60, height: 30, label: 'EN', inputs: [], outputs: [{ x: 50, y: 15, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 600, height: 50, label: 'Digital Clock: Cascaded 7490 counters track seconds and minutes.\nThe 4-digit display shows the time in multiplexed mode.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt_s', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'cnt_s', endShapeId: 'cnt_m', startOutputIndex: 3, endInputIndex: 0 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cs${i}`, startShapeId: 'cnt_s', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cm${i}`, startShapeId: 'cnt_m', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i + 4 })),
      { id: 'ce', startShapeId: 'high', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 8 },
    ]
  },
  '4066 Quad Bilateral Switch': {
    fileName: '4066 Switch',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Control', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw', color: 'gray' },
      { id: 'sig', type: 'Clock', x: 50, y: 120, width: 80, height: 40, label: 'Signal', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'sig', color: 'gray', frequency: 5 },
      { id: 'ic', type: 'IC4066', x: 200, y: 50, width: 120, height: 180, label: '4066 Switch', inputs: [{ x: 0, y: 20, label: 'IN1', value: 0, name: 'in1' }, { x: 0, y: 60, label: 'CTRL1', value: 0, name: 'ctrl1' }], outputs: [{ x: 120, y: 20, label: 'OUT1', value: 0, name: 'out1' }], name: 'ic', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 400, y: 50, width: 60, height: 30, label: 'Switched Sig', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '4066 Quad Bilateral Switch: Digitally controls the passage of signals.\nThe signal only passes when Control is HIGH.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sig', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'MCU Serial to Parallel': {
    fileName: 'MCU Serial',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 140, height: 280, label: 'MCU', inputs: [], outputs: [{ x: 140, y: 20, label: 'DATA', value: 0, name: 'd0' }, { x: 140, y: 50, label: 'CLK', value: 0, name: 'd1' }, { x: 140, y: 80, label: 'LATCH', value: 0, name: 'd2' }], name: 'mcu', color: 'gray' },
      { id: 'shift', type: 'IC74HC595', x: 250, y: 50, width: 120, height: 180, label: '74HC595', inputs: [{ x: 0, y: 30, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 60, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 90, label: 'STCP', value: 0, name: 'stcp' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'shift', color: 'gray' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led_${i}`, type: 'LED_SMD', x: 450, y: 20 + i * 30, width: 20, height: 20, label: `L${i}`, inputs: [{ x: 5, y: 5, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'gray' })),
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU Serial to Parallel: ATmega328P expands its I/O using a 74HC595 shift register to drive 8 LEDs.', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'shift', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'shift', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'mcu', endShapeId: 'shift', startOutputIndex: 2, endInputIndex: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl_${i}`, startShapeId: 'shift', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  'MCU Temperature Monitor': {
    fileName: 'MCU Temp',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 140, height: 280, label: 'MCU', inputs: [{ x: 0, y: 20, label: 'Sensor', value: 0, name: 'd0' }], outputs: [{ x: 140, y: 20, label: 'Alert', value: 0, name: 'pb0' }], name: 'mcu', color: 'gray' },
      { id: 'clk', type: 'Clock', x: 20, y: 70, width: 60, height: 30, label: 'Sensor', inputs: [], outputs: [{ x: 50, y: 15, label: 'OUT', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 0.5 },
      { id: 'oled', type: 'OLED_Display', x: 300, y: 100, width: 150, height: 80, label: 'Temp Panel', inputs: [{ x: 0, y: 40, label: 'Data', value: 0, name: 'sig' }], outputs: [], name: 'oled', color: 'gray' },
      { id: 'buzz', type: 'Buzzer', x: 300, y: 200, width: 60, height: 60, label: 'Alarm', inputs: [{ x: 0, y: 30, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'buzz', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 500, height: 50, label: 'MCU Temperature Monitor: Simulates a temperature sensor input. If the signal is HIGH, the alarm sounds.', inputs: [], outputs: [], name: 'desc', color: '#f87171', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'oled', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'mcu', endShapeId: 'buzz', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '74LS Series Counter': {
    fileName: '74LS Counter',
    shapes: [
      { id: 'cnt', type: 'IC7490', x: 200, y: 50, width: 120, height: 200, label: '74LS90 BCD', inputs: [{ x: 0, y: 20, label: 'CP0', value: 0, name: 'cp0' }, { x: 0, y: 45, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 70, label: 'MR1', value: 0, name: 'mr1' }, { x: 0, y: 95, label: 'MR2', value: 0, name: 'mr2' }], outputs: [{ x: 120, y: 20, label: 'Q0', value: 0, name: 'q0' }, { x: 120, y: 50, label: 'Q1', value: 0, name: 'q1' }, { x: 120, y: 80, label: 'Q2', value: 0, name: 'q2' }, { x: 120, y: 110, label: 'Q3', value: 1, name: 'q3' }], name: 'cnt', color: 'gray', state: { q0: 0, q123: 4 } },
      { id: 'and', type: 'IC7408', x: 350, y: 200, width: 100, height: 120, label: '74LS08 (Reset)', inputs: [{ x: 0, y: 20, label: '1A', value: 0, name: '1a' }, { x: 0, y: 40, label: '1B', value: 1, name: '1b' }], outputs: [{ x: 100, y: 30, label: '1Y', value: 0, name: '1y' }], name: 'and', color: 'gray' },
      { id: 'dec', type: 'IC7447', x: 400, y: 50, width: 120, height: 200, label: '74LS47 Decoder', inputs: [{ x: 0, y: 20, label: 'A0', value: 0, name: 'in_0' }, { x: 0, y: 50, label: 'A1', value: 0, name: 'in_1' }, { x: 0, y: 80, label: 'A2', value: 0, name: 'in_2' }, { x: 0, y: 110, label: 'A3', value: 1, name: 'in_3' }], outputs: [{ x: 120, y: 15, label: 'a', value: 1, name: 'out_0' }, { x: 120, y: 35, label: 'b', value: 1, name: 'out_1' }, { x: 120, y: 55, label: 'c', value: 1, name: 'out_2' }, { x: 120, y: 75, label: 'd', value: 1, name: 'out_3' }, { x: 120, y: 95, label: 'e', value: 1, name: 'out_4' }, { x: 120, y: 115, label: 'f', value: 1, name: 'out_5' }, { x: 120, y: 135, label: 'g', value: 1, name: 'out_6' }], name: 'dec', color: 'gray' },
      { id: 'disp', type: 'Display', x: 600, y: 50, width: 100, height: 300, label: '7-Seg (Anode)', inputs: [{ x: 0, y: 10, label: 'A', value: 1, name: 'seg_0' }, { x: 0, y: 35, label: 'B', value: 1, name: 'seg_1' }, { x: 0, y: 60, label: 'C', value: 1, name: 'seg_2' }, { x: 0, y: 85, label: 'D', value: 1, name: 'seg_3' }, { x: 0, y: 110, label: 'E', value: 1, name: 'seg_4' }, { x: 0, y: 135, label: 'F', value: 1, name: 'seg_5' }, { x: 0, y: 160, label: 'G', value: 1, name: 'seg_6' }], outputs: [], name: 'disp', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 650, height: 80, label: '74LS Series Counter: \n1. 555 Timer generates pulses.\n2. 74LS90 counts pulses in BCD.\n3. 74LS08 AND gate resets the counter at 10 (Q1 & Q3 HIGH).\n4. 74LS47 Decodes BCD to 7-Segment.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Orbitron' },
      { id: 'xmfhg3kwd', type: 'IC555', x: 96, y: 83, width: 100, height: 80, label: 'IC555', inputs: [{ x: 0, y: 20, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 40, label: 'THRES', value: 1, name: 'thres' }, { x: 0, y: 60, label: 'RESET', value: 1, name: 'reset' }], outputs: [{ x: 100, y: 40, label: 'OUT', value: 0, name: 'out' }], name: 'Shape_64m9y', color: 'gray', font: '14px Orbitron', state: { q: 0 } },
      { id: 'oga1uadd9', type: 'Oscilloscope', x: 185, y: 201, width: 160, height: 100, label: 'Oscilloscope', inputs: [{ x: 0, y: 15, label: 'CH1', value: 0, name: 'ch1' }, { x: 0, y: 35, label: 'CH2', value: 0, name: 'ch2' }, { x: 0, y: 55, label: 'CH3', value: 0, name: 'ch3' }, { x: 0, y: 75, label: 'CH4', value: 0, name: 'ch4' }], outputs: [], name: 'Shape_2y3qu', color: 'gray', font: '14px Orbitron' },
      { id: 'ffmd7e6q0', type: 'Clock', x: 22, y: 41, width: 100, height: 50, label: 'Clock\n', inputs: [], outputs: [{ x: 75, y: 25, label: 'CLK', value: 1, name: 'clk' }], name: 'Shape_y2lmf', color: 'green', font: '14px Orbitron', frequency: 1 }
    ] as Shape[],
    connectors: [
      { id: 'c2', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c7', startShapeId: 'cnt', endShapeId: 'and', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'cnt', endShapeId: 'and', startOutputIndex: 3, endInputIndex: 1 },
      { id: 'c9', startShapeId: 'and', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c10', startShapeId: 'and', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cd0', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd1', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cd2', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cd3', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'cd4', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 4, endInputIndex: 4 },
      { id: 'cd5', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 5, endInputIndex: 5 },
      { id: 'cd6', startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: 6, endInputIndex: 6 },
      { id: '277n31zgd', startShapeId: 'xmfhg3kwd', endShapeId: 'oga1uadd9', startOutputIndex: 0, endInputIndex: 2 },
      { id: '3qvv23015', startShapeId: 'xmfhg3kwd', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'zyhragowd', startShapeId: 'ffmd7e6q0', endShapeId: 'xmfhg3kwd', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'wcmbl6m8r', startShapeId: 'ffmd7e6q0', endShapeId: 'xmfhg3kwd', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  '74LS Digital Clock': {
    fileName: '74LS Digital Clock',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 150, width: 100, height: 80, label: '1Hz Pulse', inputs: [{ x: 0, y: 20, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 40, label: 'THRES', value: 1, name: 'thres' }, { x: 0, y: 60, label: 'RESET', value: 1, name: 'reset' }], outputs: [{ x: 100, y: 40, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray', frequency: 1 },
      { id: 'cnt_u', type: 'IC7490', x: 200, y: 50, width: 100, height: 150, label: 'Units', inputs: [{ x: 0, y: 20, label: 'CP0', value: 0, name: 'cp0' }, { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 60, label: 'MR1', value: 0, name: 'mr1' }, { x: 0, y: 80, label: 'MR2', value: 0, name: 'mr2' }], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 20 + i * 25, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'cnt_u', color: 'gray' },
      { id: 'dec_u', type: 'IC7447', x: 350, y: 50, width: 100, height: 150, label: 'Dec U', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 20 + i * 25, label: `A${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 7 }, (_, i) => ({ x: 100, y: 15 + i * 18, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec_u', color: 'gray' },
      { id: 'disp_u', type: 'Display', x: 500, y: 50, width: 80, height: 200, label: 'U', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 20, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp_u', color: 'gray' },
      { id: 'cnt_t', type: 'IC7490', x: 200, y: 250, width: 100, height: 150, label: 'Tens', inputs: [{ x: 0, y: 20, label: 'CP0', value: 0, name: 'cp0' }, { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 60, label: 'MR1', value: 0, name: 'mr1' }, { x: 0, y: 80, label: 'MR2', value: 0, name: 'mr2' }], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 20 + i * 25, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'cnt_t', color: 'gray' },
      { id: 'dec_t', type: 'IC7447', x: 350, y: 250, width: 100, height: 150, label: 'Dec T', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 20 + i * 25, label: `A${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 7 }, (_, i) => ({ x: 100, y: 15 + i * 18, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec_t', color: 'gray' },
      { id: 'disp_t', type: 'Display', x: 500, y: 250, width: 80, height: 200, label: 'T', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 20, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp_t', color: 'gray' },
      { id: 'and_t', type: 'IC7408', x: 50, y: 300, width: 100, height: 80, label: 'Reset Tens (6)', inputs: [{ x: 0, y: 20, label: '1A', value: 0, name: '1a' }, { x: 0, y: 40, label: '1B', value: 0, name: '1b' }], outputs: [{ x: 100, y: 30, label: '1Y', value: 0, name: '1y' }], name: 'and_t', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 60, label: '74LS Digital Clock (Seconds 00-59): \n1. 555 Timer (1Hz) drives Units counter.\n2. Units Q3 drives Tens counter.\n3. Tens counter resets at 6 (Q1 & Q2 HIGH).', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'cnt_u', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'cnt_u', endShapeId: 'cnt_u', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'cnt_u', endShapeId: 'cnt_t', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'cnt_t', endShapeId: 'cnt_t', startOutputIndex: 0, endInputIndex: 1 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cu${i}`, startShapeId: 'cnt_u', endShapeId: 'dec_u', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 7 }, (_, i) => ({ id: `du${i}`, startShapeId: 'dec_u', endShapeId: 'disp_u', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ct${i}`, startShapeId: 'cnt_t', endShapeId: 'dec_t', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 7 }, (_, i) => ({ id: `dt${i}`, startShapeId: 'dec_t', endShapeId: 'disp_t', startOutputIndex: i, endInputIndex: i })),
      { id: 'cr1', startShapeId: 'cnt_t', endShapeId: 'and_t', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cr2', startShapeId: 'cnt_t', endShapeId: 'and_t', startOutputIndex: 2, endInputIndex: 1 },
      { id: 'cr3', startShapeId: 'and_t', endShapeId: 'cnt_t', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cr4', startShapeId: 'and_t', endShapeId: 'cnt_t', startOutputIndex: 0, endInputIndex: 3 },
    ]
  },
  '555 Astable: LED Blinker': {
    fileName: '555 Blinker',
    shapes: [
      { id: 'timer', type: 'IC555', x: 100, y: 100, width: 100, height: 120, label: '555 Astable', inputs: [{ x: 0, y: 30, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 60, label: 'THR', value: 0, name: 'thr' }, { x: 0, y: 90, label: 'RST', value: 1, name: 'rst' }], outputs: [{ x: 100, y: 60, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray', frequency: 1 },
      { id: 'led', type: 'OutPutL', x: 300, y: 115, width: 60, height: 30, label: 'LED', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'red' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 400, height: 50, label: '555 Astable LED Blinker: Generates a 1Hz square wave to blink the LED.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },

  '555 Astable: Fast Pulse + Scope': {
    fileName: '555 Scope',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 100, height: 120, label: '555 Fast', inputs: [{ x: 0, y: 30, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 60, label: 'THR', value: 0, name: 'thr' }, { x: 0, y: 90, label: 'RST', value: 1, name: 'rst' }], outputs: [{ x: 100, y: 60, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray', frequency: 5 },
      { id: 'scope', type: 'Oscilloscope', x: 250, y: 50, width: 300, height: 200, label: 'Pulse View', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 20 + i * 40, label: `CH${i + 1}`, value: 0, name: `ch${i + 1}` })), outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: '555 Fast Pulse: 5Hz signal visualized on the oscilloscope.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '555 Astable: 8-Bit Shift Register': {
    fileName: '555 Shift Reg',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 150, width: 100, height: 120, label: '555 Clock', inputs: [{ x: 0, y: 30, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 60, label: 'THR', value: 0, name: 'thr' }, { x: 0, y: 90, label: 'RST', value: 1, name: 'rst' }], outputs: [{ x: 100, y: 60, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray', frequency: 2 },
      { id: 'high', type: 'HighConstant', x: 50, y: 50, width: 80, height: 40, label: 'Data In', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'shift', type: 'IC74HC595', x: 200, y: 50, width: 140, height: 260, label: '74HC595', inputs: [
        { x: 0, y: 20, label: 'SER', value: 0, name: 'ser' },
        { x: 0, y: 45, label: 'SRCLK', value: 0, name: 'srclk' },
        { x: 0, y: 70, label: 'RCLK', value: 0, name: 'rclk' },
        { x: 0, y: 95, label: 'SRCLR', value: 1, name: 'srclr' },
        { x: 0, y: 120, label: 'OE', value: 0, name: 'oe' }
      ], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 30, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'shift', color: 'gray' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL', x: 400, y: 20 + i * 40, width: 60, height: 30, label: `Q${i}`, inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'blue' })),
      { id: 't1', type: 'Text', x: 50, y: 350, width: 500, height: 50, label: '555 Shift Register Driver: 2Hz clock shifts HIGH data through the 74HC595.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'shift', startOutputIndex: 0, endInputIndex: 1 }, // SRCLK
      { id: 'c2', startShapeId: 'timer', endShapeId: 'shift', startOutputIndex: 0, endInputIndex: 2 }, // RCLK
      { id: 'c3', startShapeId: 'high', endShapeId: 'shift', startOutputIndex: 0, endInputIndex: 0 }, // SER
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl_${i}`, startShapeId: 'shift', endShapeId: `led_${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '555 SR Latch: Start/Stop Control': {
    fileName: '555 SR Latch',
    shapes: [
      { id: 'sw_start', type: 'PushButton', x: 50, y: 50, width: 80, height: 40, label: 'START', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_start', color: 'gray' },
      { id: 'sw_stop', type: 'ToggleSwitch', x: 50, y: 120, width: 80, height: 40, label: 'STOP', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_stop', color: 'gray' },
      { id: 'timer', type: 'IC555', x: 200, y: 50, width: 100, height: 120, label: '555 Latch', inputs: [{ x: 0, y: 30, label: 'TRIG', value: 1, name: 'trig' }, { x: 0, y: 60, label: 'THR', value: 0, name: 'thr' }, { x: 0, y: 90, label: 'RST', value: 1, name: 'rst' }], outputs: [{ x: 100, y: 60, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 'not', type: 'NOT', x: 140, y: 50, width: 40, height: 40, label: 'INV', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 40, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 350, y: 90, width: 60, height: 30, label: 'RUNNING', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '555 SR Latch Mode: START (Trig) sets the output, STOP (Thres) resets it.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_start', endShapeId: 'not', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'not', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 0 }, // TRIG (Active Low)
      { id: 'c3', startShapeId: 'sw_stop', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 1 }, // THRES (Active High)
      { id: 'c4', startShapeId: 'timer', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Gate-Level SR Flip-Flop': {
    fileName: 'SR Flip-Flop (Gates)',
    shapes: [
      { id: 'sw_s', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'SET (S)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s', color: 'gray' },
      { id: 'sw_r', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'RESET (R)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_r', color: 'gray' },
      { id: 'nor1', type: 'NOR', x: 200, y: 50, width: 80, height: 50, label: 'NOR 1', inputs: [{ x: 0, y: 15, label: 'R', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'Q\'', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q', value: 0, name: 'out_y' }], name: 'nor1', color: 'gray' },
      { id: 'nor2', type: 'NOR', x: 200, y: 140, width: 80, height: 50, label: 'NOR 2', inputs: [{ x: 0, y: 15, label: 'Q', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'S', value: 0, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q\'', value: 1, name: 'out_y' }], name: 'nor2', color: 'gray' },
      { id: 'led_q', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 'led_qn', type: 'OutPutL', x: 350, y: 150, width: 60, height: 30, label: 'Q\'', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led_qn', color: 'red' },
      { id: 't1', type: 'Text', x: 50, y: 220, width: 500, height: 50, label: 'SR Flip-Flop (NOR Gates): Cross-coupled NOR gates form a basic latch.\nS=1 sets Q, R=1 resets Q.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_r', endShapeId: 'nor1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_s', endShapeId: 'nor2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'nor1', endShapeId: 'nor2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'nor2', endShapeId: 'nor1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'nor1', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'nor2', endShapeId: 'led_qn', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Gate-Level D Latch': {
    fileName: 'D Latch (Gates)',
    shapes: [
      { id: 'sw_d', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'DATA (D)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_d', color: 'gray' },
      { id: 'sw_en', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'ENABLE (E)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_en', color: 'gray' },
      { id: 'not1', type: 'NOT', x: 140, y: 50, width: 40, height: 40, label: 'INV', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 40, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not1', color: 'gray' },
      { id: 'nand1', type: 'NAND', x: 200, y: 40, width: 80, height: 50, label: 'NAND 1', inputs: [{ x: 0, y: 15, label: 'D', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'E', value: 0, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'X', value: 1, name: 'out_y' }], name: 'nand1', color: 'gray' },
      { id: 'nand2', type: 'NAND', x: 200, y: 130, width: 80, height: 50, label: 'NAND 2', inputs: [{ x: 0, y: 15, label: 'E', value: 0, name: 'in_a' }, { x: 0, y: 35, label: '!D', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Y', value: 1, name: 'out_y' }], name: 'nand2', color: 'gray' },
      { id: 'nand3', type: 'NAND', x: 320, y: 50, width: 80, height: 50, label: 'NAND 3', inputs: [{ x: 0, y: 15, label: 'X', value: 1, name: 'in_a' }, { x: 0, y: 35, label: 'Q\'', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q', value: 0, name: 'out_y' }], name: 'nand3', color: 'gray' },
      { id: 'nand4', type: 'NAND', x: 320, y: 120, width: 80, height: 50, label: 'NAND 4', inputs: [{ x: 0, y: 15, label: 'Q', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'Y', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q\'', value: 1, name: 'out_y' }], name: 'nand4', color: 'gray' },
      { id: 'led_q', type: 'OutPutL', x: 450, y: 60, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 220, width: 500, height: 50, label: 'Gated D Latch (NAND Gates): Data (D) is latched when Enable (E) is HIGH.\nWhen E is LOW, the output Q remains unchanged.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_d', endShapeId: 'nand1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_d', endShapeId: 'not1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'not1', endShapeId: 'nand2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'sw_en', endShapeId: 'nand1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'sw_en', endShapeId: 'nand2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'nand1', endShapeId: 'nand3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'nand2', endShapeId: 'nand4', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c8', startShapeId: 'nand3', endShapeId: 'nand4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c9', startShapeId: 'nand4', endShapeId: 'nand3', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c10', startShapeId: 'nand3', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Gate-Level D Flip-Flop': {
    fileName: 'D Flip-Flop (Gates)',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'sw_d', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Data (D)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_d', color: 'gray' },
      { id: 'not_d', type: 'NOT', x: 140, y: 50, width: 40, height: 40, label: 'INV D', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 40, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not_d' },
      { id: 'not_clk', type: 'NOT', x: 140, y: 150, width: 40, height: 40, label: 'INV CLK', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 40, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not_clk' },
      // Master Latch
      { id: 'n1', type: 'NAND', x: 220, y: 40, width: 60, height: 40, label: 'M1', inputs: [{ x: 0, y: 10, label: 'D', value: 0, name: 'a' }, { x: 0, y: 30, label: 'C', value: 0, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'n1' },
      { id: 'n2', type: 'NAND', x: 220, y: 100, width: 60, height: 40, label: 'M2', inputs: [{ x: 0, y: 10, label: 'C', value: 0, name: 'a' }, { x: 0, y: 30, label: '!D', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'n2' },
      { id: 'n3', type: 'NAND', x: 300, y: 40, width: 60, height: 40, label: 'M3', inputs: [{ x: 0, y: 10, label: 'X', value: 1, name: 'a' }, { x: 0, y: 30, label: 'MQ\'', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'MQ', value: 0, name: 'y' }], name: 'n3' },
      { id: 'n4', type: 'NAND', x: 300, y: 100, width: 60, height: 40, label: 'M4', inputs: [{ x: 0, y: 10, label: 'MQ', value: 0, name: 'a' }, { x: 0, y: 30, label: 'Y', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'MQ\'', value: 1, name: 'y' }], name: 'n4' },
      // Slave Latch
      { id: 'n5', type: 'NAND', x: 400, y: 40, width: 60, height: 40, label: 'S1', inputs: [{ x: 0, y: 10, label: 'MQ', value: 0, name: 'a' }, { x: 0, y: 30, label: '!C', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'n5' },
      { id: 'n6', type: 'NAND', x: 400, y: 100, width: 60, height: 40, label: 'S2', inputs: [{ x: 0, y: 10, label: '!C', value: 1, name: 'a' }, { x: 0, y: 30, label: 'MQ\'', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'n6' },
      { id: 'n7', type: 'NAND', x: 480, y: 40, width: 60, height: 40, label: 'S3', inputs: [{ x: 0, y: 10, label: 'X', value: 1, name: 'a' }, { x: 0, y: 30, label: 'Q\'', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Q', value: 0, name: 'y' }], name: 'n7' },
      { id: 'n8', type: 'NAND', x: 480, y: 100, width: 60, height: 40, label: 'S4', inputs: [{ x: 0, y: 10, label: 'Q', value: 0, name: 'a' }, { x: 0, y: 30, label: 'Y', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Q\'', value: 1, name: 'y' }], name: 'n8' },
      { id: 'led_q', type: 'OutPutL', x: 580, y: 45, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 650, height: 50, label: 'Master-Slave D Flip-Flop: Composed of two gated latches. The first latch (master) samples\ndata when CLK is HIGH, and the second (slave) transfers it to output when CLK is LOW.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_d', endShapeId: 'not_d', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_d', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'not_d', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'clk', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'clk', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'clk', endShapeId: 'not_clk', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'n1', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'n2', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c9', startShapeId: 'n3', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'n4', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'n3', endShapeId: 'n5', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c12', startShapeId: 'n4', endShapeId: 'n6', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c13', startShapeId: 'not_clk', endShapeId: 'n5', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c14', startShapeId: 'not_clk', endShapeId: 'n6', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c15', startShapeId: 'n5', endShapeId: 'n7', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c16', startShapeId: 'n6', endShapeId: 'n8', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c17', startShapeId: 'n7', endShapeId: 'n8', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c18', startShapeId: 'n8', endShapeId: 'n7', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c19', startShapeId: 'n7', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Gate-Level JK Flip-Flop': {
    fileName: 'JK Flip-Flop (Gates)',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'sw_j', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'J', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_j', color: 'gray' },
      { id: 'sw_k', type: 'ToggleSwitch', x: 50, y: 250, width: 80, height: 40, label: 'K', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_k', color: 'gray' },
      { id: 'n1', type: 'NAND3', x: 200, y: 50, width: 80, height: 60, label: 'NAND 1', inputs: [{ x: 0, y: 10, label: 'J', value: 0, name: 'in_0' }, { x: 0, y: 30, label: 'CLK', value: 0, name: 'in_1' }, { x: 0, y: 50, label: 'Q\'', value: 1, name: 'in_2' }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'out_y' }], name: 'n1' },
      { id: 'n2', type: 'NAND3', x: 200, y: 230, width: 80, height: 60, label: 'NAND 2', inputs: [{ x: 0, y: 10, label: 'Q', value: 0, name: 'in_0' }, { x: 0, y: 30, label: 'CLK', value: 0, name: 'in_1' }, { x: 0, y: 50, label: 'K', value: 0, name: 'in_2' }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'out_y' }], name: 'n2' },
      { id: 'n3', type: 'NAND', x: 350, y: 80, width: 80, height: 50, label: 'NAND 3', inputs: [{ x: 0, y: 15, label: 'X', value: 1, name: 'in_a' }, { x: 0, y: 35, label: 'Q\'', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q', value: 0, name: 'out_y' }], name: 'n3' },
      { id: 'n4', type: 'NAND', x: 350, y: 210, width: 80, height: 50, label: 'NAND 4', inputs: [{ x: 0, y: 15, label: 'Q', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'Y', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q\'', value: 1, name: 'out_y' }], name: 'n4' },
      { id: 'led_q', type: 'OutPutL', x: 500, y: 90, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 320, width: 600, height: 50, label: 'JK Flip-Flop (NAND Gates): The most versatile flip-flop.\nJ=1, K=1 results in Toggle mode.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_j', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'n4', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'n3', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'clk', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c6', startShapeId: 'sw_k', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c7', startShapeId: 'n1', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'n2', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c9', startShapeId: 'n3', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'n4', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'n3', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Gate-Level T Flip-Flop': {
    fileName: 'T Flip-Flop (Gates)',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'sw_t', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Toggle (T)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_t', color: 'gray' },
      { id: 'n1', type: 'NAND3', x: 200, y: 50, width: 80, height: 60, label: 'NAND 1', inputs: [{ x: 0, y: 10, label: 'T', value: 0, name: 'in_0' }, { x: 0, y: 30, label: 'CLK', value: 0, name: 'in_1' }, { x: 0, y: 50, label: 'Q\'', value: 1, name: 'in_2' }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'out_y' }], name: 'n1' },
      { id: 'n2', type: 'NAND3', x: 200, y: 230, width: 80, height: 60, label: 'NAND 2', inputs: [{ x: 0, y: 10, label: 'Q', value: 0, name: 'in_0' }, { x: 0, y: 30, label: 'CLK', value: 0, name: 'in_1' }, { x: 0, y: 50, label: 'T', value: 0, name: 'in_2' }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'out_y' }], name: 'n2' },
      { id: 'n3', type: 'NAND', x: 350, y: 80, width: 80, height: 50, label: 'NAND 3', inputs: [{ x: 0, y: 15, label: 'X', value: 1, name: 'in_a' }, { x: 0, y: 35, label: 'Q\'', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q', value: 0, name: 'out_y' }], name: 'n3' },
      { id: 'n4', type: 'NAND', x: 350, y: 210, width: 80, height: 50, label: 'NAND 4', inputs: [{ x: 0, y: 15, label: 'Q', value: 0, name: 'in_a' }, { x: 0, y: 35, label: 'Y', value: 1, name: 'in_b' }], outputs: [{ x: 80, y: 25, label: 'Q\'', value: 1, name: 'out_y' }], name: 'n4' },
      { id: 'led_q', type: 'OutPutL', x: 500, y: 90, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 320, width: 600, height: 50, label: 'T Flip-Flop (NAND Gates): A Toggle Flip-Flop built from a JK configuration.\nWhen T is HIGH, the output toggles on each clock pulse.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_t', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'n4', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'n3', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'clk', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c6', startShapeId: 'sw_t', endShapeId: 'n2', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c7', startShapeId: 'n1', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'n2', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c9', startShapeId: 'n3', endShapeId: 'n4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'n4', endShapeId: 'n3', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'n3', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7400 Series IC Tester': {
    fileName: '7400 Series IC Tester',
    shapes: [
      { id: 't_title', type: 'Text', x: 50, y: 10, width: 1200, height: 40, label: '7400 Series IC Functional Gallery: A comprehensive test bench for all 74-series integrated circuits.', inputs: [], outputs: [], name: 't_title', color: '#eab308', font: '20px Orbitron' },
      
      // Row 1: Basic Quad Gates
      { id: '7400_ic', type: 'IC7400', x: 50, y: 100, width: 120, height: 180, label: '7400 NAND', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${Math.floor(i/2)+1}${i%2===0?'A':'B'}`,value:0,name:`in_${i}`})), outputs: Array.from({length:4}, (_,i)=>({x:120,y:25+i*40,label:`${i+1}Y`,value:1,name:`out_${i}`})), name: '7400_ic' },
      { id: '7400_s1', type: 'ToggleSwitch', x: -50, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7400_s1' },
      { id: '7400_s2', type: 'ToggleSwitch', x: -50, y: 135, width: 60, height: 30, label: '1B', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7400_s2' },
      { id: '7400_l1', type: 'OutPutL', x: 180, y: 125, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7400_l1' },

      { id: '7402_ic', type: 'IC7402', x: 300, y: 100, width: 120, height: 180, label: '7402 NOR', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${Math.floor(i/2)+1}${i%2===0?'A':'B'}`,value:0,name:`in_${i}`})), outputs: Array.from({length:4}, (_,i)=>({x:120,y:25+i*40,label:`${i+1}Y`,value:1,name:`out_${i}`})), name: '7402_ic' },
      { id: '7402_s1', type: 'ToggleSwitch', x: 200, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7402_s1' },
      { id: '7402_s2', type: 'ToggleSwitch', x: 200, y: 135, width: 60, height: 30, label: '1B', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7402_s2' },
      { id: '7402_l1', type: 'OutPutL', x: 430, y: 125, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7402_l1' },

      { id: '7404_ic', type: 'IC7404', x: 550, y: 100, width: 120, height: 180, label: '7404 NOT', inputs: Array.from({length:6}, (_,i)=>({x:0,y:15+i*25,label:`${i+1}A`,value:0,name:`in_${i}`})), outputs: Array.from({length:6}, (_,i)=>({x:120,y:15+i*25,label:`${i+1}Y`,value:1,name:`out_${i}`})), name: '7404_ic' },
      { id: '7404_s1', type: 'ToggleSwitch', x: 450, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7404_s1' },
      { id: '7404_l1', type: 'OutPutL', x: 680, y: 115, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7404_l1' },

      { id: '7408_ic', type: 'IC7408', x: 800, y: 100, width: 120, height: 180, label: '7408 AND', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${Math.floor(i/2)+1}${i%2===0?'A':'B'}`,value:0,name:`in_${i}`})), outputs: Array.from({length:4}, (_,i)=>({x:120,y:25+i*40,label:`${i+1}Y`,value:0,name:`out_${i}`})), name: '7408_ic' },
      { id: '7408_s1', type: 'ToggleSwitch', x: 700, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7408_s1' },
      { id: '7408_s2', type: 'ToggleSwitch', x: 700, y: 135, width: 60, height: 30, label: '1B', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '7408_s2' },
      { id: '7408_l1', type: 'OutPutL', x: 930, y: 125, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:0,name:'in'}], outputs: [], name: '7408_l1' },
      
      { id: '7432_ic', type: 'IC7432', x: 1050, y: 100, width: 120, height: 180, label: '7432 OR', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${Math.floor(i/2)+1}${i%2===0?'A':'B'}`,value:0,name:`in_${i}`})), outputs: Array.from({length:4}, (_,i)=>({x:120,y:25+i*40,label:`${i+1}Y`,value:0,name:`out_${i}`})), name: '7432_ic' },
      { id: '7432_s1', type: 'ToggleSwitch', x: 950, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '7432_s1' },
      { id: '7432_l1', type: 'OutPutL', x: 1180, y: 125, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7432_l1' },

      { id: '7486_ic', type: 'IC7486', x: 1300, y: 100, width: 120, height: 180, label: '7486 XOR', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${Math.floor(i/2)+1}${i%2===0?'A':'B'}`,value:0,name:`in_${i}`})), outputs: Array.from({length:4}, (_,i)=>({x:120,y:25+i*40,label:`${i+1}Y`,value:0,name:`out_${i}`})), name: '7486_ic' },
      { id: '7486_s1', type: 'ToggleSwitch', x: 1200, y: 115, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '7486_s1' },
      { id: '7486_l1', type: 'OutPutL', x: 1430, y: 125, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7486_l1' },

      // Row 2: Multi-input & Decoders
      { id: '7410_ic', type: 'IC7410', x: 50, y: 400, width: 120, height: 200, label: '7410 3-NAND', inputs: Array.from({length:9}, (_,i)=>({x:0,y:15+i*20,label:`${i+1}`,value:0,name:`in_${i}`})), outputs: Array.from({length:3}, (_,i)=>({x:120,y:35+i*60,label:`${i+1}Y`,value:1,name:`out_${i}`})), name: '7410_ic' },
      { id: '7410_s1', type: 'ToggleSwitch', x: -50, y: 415, width: 60, height: 30, label: '1A', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '7410_s1' },
      { id: '7410_s2', type: 'ToggleSwitch', x: -50, y: 435, width: 60, height: 30, label: '1B', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '7410_s2' },
      { id: '7410_s3', type: 'ToggleSwitch', x: -50, y: 455, width: 60, height: 30, label: '1C', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '7410_s3' },
      { id: '7410_l1', type: 'OutPutL', x: 180, y: 435, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:0,name:'in'}], outputs: [], name: '7410_l1' },

      { id: '7420_ic', type: 'IC7420', x: 300, y: 400, width: 120, height: 180, label: '7420 4-NAND', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${i+1}`,value:0,name:`in_${i}`})), outputs: Array.from({length:2}, (_,i)=>({x:120,y:45+i*80,label:`${i+1}Y`,value:1,name:`out_${i}`})), name: '7420_ic' },
      { id: '7420_l1', type: 'OutPutL', x: 430, y: 445, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7420_l1' },

      { id: '7430_ic', type: 'IC7430', x: 550, y: 400, width: 120, height: 180, label: '7430 8-NAND', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`${i+1}`,value:0,name:`in_${i}`})), outputs: [{x:120,y:85,label:'Y',value:1,name:'out_y'}], name: '7430_ic' },
      { id: '7430_l1', type: 'OutPutL', x: 680, y: 485, width: 60, height: 30, label: 'Y', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7430_l1' },

      { id: '7447_ic', type: 'IC7447', x: 800, y: 400, width: 120, height: 220, label: '7447 BCD-7S', inputs: [{x:0,y:15,label:'A',value:0,name:'a'},{x:0,y:40,label:'B',value:0,name:'b'},{x:0,y:65,label:'C',value:0,name:'c'},{x:0,y:90,label:'D',value:0,name:'d'}], outputs: Array.from({length:7}, (_,i)=>({x:120,y:15+i*25,label:String.fromCharCode(97+i),value:0,name:`out_${i}`})), name: '7447_ic' },
      { id: '7447_disp', type: 'Display', x: 950, y: 400, width: 100, height: 220, label: '7-Seg', inputs: Array.from({length:7}, (_,i)=>({x:0,y:10+i*25,label:String.fromCharCode(65+i),value:0,name:`seg_${i}`})), outputs: [], name: '7447_disp' },

      { id: '7445_ic', type: 'IC7445', x: 1100, y: 400, width: 120, height: 280, label: '7445 BCD-Dec', inputs: [{x:0,y:15,label:'A',value:0,name:'a'},{x:0,y:40,label:'B',value:0,name:'b'},{x:0,y:65,label:'C',value:0,name:'c'},{x:0,y:90,label:'D',value:0,name:'d'}], outputs: Array.from({length:10}, (_,i)=>({x:120,y:15+i*25,label:`Y${i}`,value:1,name:`y${i}`})), name: '7445_ic' },
      { id: '7445_l0', type: 'OutPutL', x: 1230, y: 415, width: 40, height: 20, label: 'Y0', inputs: [{x:20,y:10,label:'In',value:1,name:'in'}], outputs: [], name: '7445_l0' },

      // Row 3: Counters & Mux
      { id: '7490_ic', type: 'IC7490', x: 50, y: 700, width: 120, height: 180, label: '7490 Decade', inputs: [{x:0,y:15,label:'CP0',value:0,name:'cp0'},{x:0,y:40,label:'CP1',value:0,name:'cp1'},{x:0,y:65,label:'MR1',value:0,name:'mr1'},{x:0,y:90,label:'MR2',value:0,name:'mr2'},{x:0,y:115,label:'MS1',value:0,name:'ms1'},{x:0,y:140,label:'MS2',value:0,name:'ms2'}], outputs: Array.from({length:4}, (_,i)=>({x:120,y:15+i*25,label:`Q${i}`,value:0,name:`q${i}`})), name: '7490_ic' },
      { id: '7490_clk', type: 'Clock', x: -50, y: 715, width: 60, height: 30, label: 'CLK', inputs: [], outputs: [{x:50,y:15,label:'CLK',value:0,name:'clk'}], name: '7490_clk', frequency: 2 },
      { id: '7490_l0', type: 'OutPutL', x: 180, y: 715, width: 40, height: 20, label: 'Q0', inputs: [{x:20,y:10,label:'In',value:0,name:'in'}], outputs: [], name: '7490_l0' },

      { id: '74138_ic', type: 'IC74138', x: 300, y: 700, width: 120, height: 240, label: '74138 Decoder', inputs: [{x:0,y:20,label:'A',value:0,name:'a'},{x:0,y:45,label:'B',value:0,name:'b'},{x:0,y:70,label:'C',value:0,name:'c'},{x:0,y:95,label:'G1',value:1,name:'g1'},{x:0,y:120,label:'G2A',value:0,name:'g2a'},{x:0,y:145,label:'G2B',value:0,name:'g2b'}], outputs: Array.from({length:8}, (_,i)=>({x:120,y:15+i*25,label:`Y${i}`,value:1,name:`y${i}`})), name: '74138_ic' },
      { id: '74138_l0', type: 'OutPutL', x: 430, y: 715, width: 40, height: 20, label: 'Y0', inputs: [{x:20,y:10,label:'In',value:1,name:'in'}], outputs: [], name: '74138_l0' },

      { id: '74151_ic', type: 'IC74151', x: 550, y: 700, width: 120, height: 280, label: '74151 Mux', inputs: Array.from({length:8}, (_,i)=>({x:0,y:15+i*20,label:`D${i}`,value:i%2,name:`d${i}`})).concat([{x:0,y:180,label:'A',value:0,name:'a'},{x:0,y:200,label:'B',value:0,name:'b'},{x:0,y:220,label:'C',value:0,name:'c'},{x:0,y:245,label:'S',value:0,name:'strobe'}]), outputs: [{x:120,y:100,label:'Y',value:0,name:'y'},{x:120,y:130,label:'W',value:1,name:'w'}], name: '74151_ic' },
      { id: '74151_l1', type: 'OutPutL', x: 680, y: 800, width: 60, height: 30, label: 'Y', inputs: [{x:30,y:15,label:'In',value:0,name:'in'}], outputs: [], name: '74151_l1' },

      { id: '74153_ic', type: 'IC74153', x: 1050, y: 700, width: 120, height: 240, label: '74153 Dual Mux', inputs: Array.from({length:4}, (_,i)=>({x:0,y:15+i*20,label:`1D${i}`,value:i%2,name:`1d${i}`})).concat([{x:0,y:100,label:'A',value:0,name:'a'},{x:0,y:120,label:'B',value:0,name:'b'},{x:0,y:140,label:'1G',value:0,name:'1g'}]), outputs: [{x:120,y:60,label:'1Y',value:0,name:'1y'}], name: '74153_ic' },
      { id: '74153_l1', type: 'OutPutL', x: 1180, y: 760, width: 60, height: 30, label: '1Y', inputs: [{x:30,y:15,label:'In',value:0,name:'in'}], outputs: [], name: '74153_l1' },

      { id: '74161_ic', type: 'IC74161', x: 800, y: 700, width: 120, height: 220, label: '74161 Counter', inputs: [{x:0,y:15,label:'CLK',value:0,name:'clk'},{x:0,y:35,label:'CLR',value:1,name:'clr'},{x:0,y:55,label:'LD',value:1,name:'ld'},{x:0,y:75,label:'ENP',value:1,name:'enp'},{x:0,y:95,label:'ENT',value:1,name:'ent'},{x:0,y:115,label:'D0',value:0,name:'d0'},{x:0,y:135,label:'D1',value:0,name:'d1'},{x:0,y:155,label:'D2',value:0,name:'d2'},{x:0,y:175,label:'D3',value:0,name:'d3'}], outputs: [{x:120,y:25,label:'Q0',value:0,name:'q0'},{x:120,y:50,label:'Q1',value:0,name:'q1'},{x:120,y:75,label:'Q2',value:0,name:'q2'},{x:120,y:100,label:'Q3',value:0,name:'q3'},{x:120,y:130,label:'RCO',value:0,name:'rco'}], name: '74161_ic' },
      { id: '74161_clk', type: 'Clock', x: 700, y: 715, width: 60, height: 30, label: 'CLK', inputs: [], outputs: [{x:50,y:15,label:'CLK',value:0,name:'clk'}], name: '74161_clk', frequency: 1 },

      // Row 4: Advanced & Interface
      { id: '7485_ic', type: 'IC7485', x: 50, y: 1050, width: 120, height: 260, label: '7485 Comp', inputs: Array.from({length:4}, (_,i)=>({x:0,y:15+i*20,label:`A${i}`,value:0,name:`a${i}`})).concat(Array.from({length:4}, (_,i)=>({x:0,y:105+i*20,label:`B${i}`,value:0,name:`b${i}`})), [{x:0,y:185,label:'I<',value:0,name:'lt'},{x:0,y:205,label:'I=',value:1,name:'eq'},{x:0,y:225,label:'I>',value:0,name:'gt'}]), outputs: [{x:120,y:50,label:'A<B',value:0,name:'altb'},{x:120,y:100,label:'A=B',value:1,name:'aeqb'},{x:120,y:150,label:'A>B',value:0,name:'agtb'}], name: '7485_ic' },
      { id: '7485_l1', type: 'OutPutL', x: 180, y: 1150, width: 60, height: 30, label: 'A=B', inputs: [{x:30,y:15,label:'In',value:1,name:'in'}], outputs: [], name: '7485_l1' },

      { id: '74181_ic', type: 'IC74181', x: 300, y: 1050, width: 140, height: 300, label: '74181 ALU', inputs: [{x:0,y:20,label:'A',value:0,name:'a'},{x:0,y:60,label:'B',value:0,name:'b'},{x:0,y:100,label:'S',value:0,name:'s'},{x:0,y:140,label:'M',value:0,name:'m'},{x:0,y:180,label:'Cn',value:1,name:'cn'}], outputs: [{x:140,y:40,label:'F',value:0,name:'f'},{x:140,y:80,label:'Cn+4',value:0,name:'cn4'},{x:140,y:120,label:'A=B',value:0,name:'aeqb'}], name: '74181_ic' },
      
      { id: '74595_ic', type: 'IC74HC595', x: 550, y: 1050, width: 120, height: 200, label: '74HC595 SR', inputs: [{x:0,y:15,label:'DS',value:0,name:'ds'},{x:0,y:35,label:'SHCP',value:0,name:'shcp'},{x:0,y:55,label:'STCP',value:0,name:'stcp'},{x:0,y:75,label:'OE',value:0,name:'oe'},{x:0,y:95,label:'MR',value:1,name:'mr'}], outputs: Array.from({length:8}, (_,i)=>({x:120,y:15+i*20,label:`Q${i}`,value:0,name:`q${i}`})), name: '74595_ic' },
      { id: '74595_ds', type: 'ToggleSwitch', x: 450, y: 1065, width: 60, height: 30, label: 'Data', inputs: [], outputs: [{x:50,y:15,label:'Out',value:1,name:'out'}], name: '74595_ds' },
      { id: '74595_sh', type: 'PushButton', x: 450, y: 1100, width: 60, height: 30, label: 'Shift', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '74595_sh' },
      { id: '74595_st', type: 'PushButton', x: 450, y: 1135, width: 60, height: 30, label: 'Latch', inputs: [], outputs: [{x:50,y:15,label:'Out',value:0,name:'out'}], name: '74595_st' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: '7400_s1', endShapeId: '7400_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: '7400_s2', endShapeId: '7400_ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: '7400_ic', endShapeId: '7400_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: '7402_s1', endShapeId: '7402_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: '7402_s2', endShapeId: '7402_ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c6', startShapeId: '7402_ic', endShapeId: '7402_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: '7404_s1', endShapeId: '7404_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: '7404_ic', endShapeId: '7404_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c9', startShapeId: '7408_s1', endShapeId: '7408_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: '7408_s2', endShapeId: '7408_ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c11', startShapeId: '7408_ic', endShapeId: '7408_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c11_1', startShapeId: '7432_s1', endShapeId: '7432_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c11_2', startShapeId: '7432_ic', endShapeId: '7432_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c11_3', startShapeId: '7486_s1', endShapeId: '7486_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c11_4', startShapeId: '7486_ic', endShapeId: '7486_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c12', startShapeId: '7410_s1', endShapeId: '7410_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c13', startShapeId: '7410_s2', endShapeId: '7410_ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c14', startShapeId: '7410_s3', endShapeId: '7410_ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c15', startShapeId: '7410_ic', endShapeId: '7410_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c16', startShapeId: '7420_ic', endShapeId: '7420_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c17', startShapeId: '7430_ic', endShapeId: '7430_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c18', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c19', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c20', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c21', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c22', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 4, endInputIndex: 4 },
      { id: 'c23', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 5, endInputIndex: 5 },
      { id: 'c24', startShapeId: '7447_ic', endShapeId: '7447_disp', startOutputIndex: 6, endInputIndex: 6 },
      { id: 'c24_1', startShapeId: '7445_ic', endShapeId: '7445_l0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c25', startShapeId: '7490_clk', endShapeId: '7490_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c26', startShapeId: '7490_ic', endShapeId: '7490_l0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c27', startShapeId: '74138_ic', endShapeId: '74138_l0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c28', startShapeId: '74151_ic', endShapeId: '74151_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c28_1', startShapeId: '74153_ic', endShapeId: '74153_l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c29', startShapeId: '74161_clk', endShapeId: '74161_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c30', startShapeId: '7485_ic', endShapeId: '7485_l1', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c31', startShapeId: '74595_ds', endShapeId: '74595_ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c32', startShapeId: '74595_sh', endShapeId: '74595_ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c33', startShapeId: '74595_st', endShapeId: '74595_ic', startOutputIndex: 0, endInputIndex: 2 },
    ]
  },
  'MCU 4-Digit Display Controller': {
    fileName: 'MCU 4-Digit',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 100, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'clk', type: 'Clock', x: 20, y: 70, width: 60, height: 30, label: 'Clock', inputs: [], outputs: [{ x: 50, y: 15, label: 'CLK', value: 1, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'disp', type: 'Display4Digit', x: 400, y: 50, width: 240, height: 100, label: '4-Digit Display', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 10 + i * 15, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 'high', type: 'HighConstant', x: 300, y: 200, width: 80, height: 40, label: 'Digit 1 EN', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU 4-Digit Display Controller: The ATmega328P drives a 4-digit 7-segment display. It cycles through numbers on the first digit.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `c_seg_${i}`, startShapeId: 'mcu', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      { id: 'c_en', startShapeId: 'high', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 8 },
    ]
  },
  'MCU Smart Security System': {
    fileName: 'MCU Security',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 200, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 100, height: 50, label: 'Door Sensor', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 180, width: 100, height: 50, label: 'Window Sensor', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'buzz', type: 'Buzzer', x: 400, y: 50, width: 80, height: 80, label: 'Alarm', inputs: [{ x: 0, y: 40, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'buzz', color: 'gray' },
      { id: 'oled', type: 'OLED_Display', x: 400, y: 150, width: 150, height: 80, label: 'Status', inputs: [{ x: 0, y: 40, label: 'Signal', value: 0, name: 'sig' }], outputs: [], name: 'oled', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU Smart Security System: Monitors sensors. If triggered, the MCU activates the alarm and updates the status panel.', inputs: [], outputs: [], name: 'desc', color: '#f87171', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_sw1', startShapeId: 'sw1', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_sw2', startShapeId: 'sw2', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_buzz', startShapeId: 'mcu', endShapeId: 'buzz', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_oled', startShapeId: 'mcu', endShapeId: 'oled', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'MCU Mood Light Controller': {
    fileName: 'MCU Mood Light',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 200, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'btn', type: 'PushButton', x: 50, y: 150, width: 100, height: 50, label: 'Change Color', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'btn', color: 'gray' },
      { id: 'rgb', type: 'RGB_LED', x: 400, y: 100, width: 80, height: 80, label: 'Mood LED', inputs: [{ x: 0, y: 10, label: 'R', value: 0, name: 'r' }, { x: 0, y: 30, label: 'G', value: 0, name: 'g' }, { x: 0, y: 50, label: 'B', value: 0, name: 'b' }], outputs: [], name: 'rgb', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU Mood Light Controller: Cycles through different colors on an RGB LED when the button is pressed.', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_btn', startShapeId: 'btn', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_r', startShapeId: 'mcu', endShapeId: 'rgb', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_g', startShapeId: 'mcu', endShapeId: 'rgb', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_b', startShapeId: 'mcu', endShapeId: 'rgb', startOutputIndex: 2, endInputIndex: 2 },
    ]
  },
  'MCU Motor Speed Monitor': {
    fileName: 'MCU Motor Monitor',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 200, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Encoder', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 5 },
      { id: 'motor', type: 'Motor', x: 400, y: 50, width: 100, height: 100, label: 'DC Motor', inputs: [{ x: 0, y: 50, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'motor', color: 'gray' },
      { id: 'oled', type: 'OLED_Display', x: 400, y: 180, width: 150, height: 80, label: 'RPM Display', inputs: [{ x: 0, y: 40, label: 'Signal', value: 0, name: 'sig' }], outputs: [], name: 'oled', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU Motor Speed Monitor: Measures encoder frequency and controls motor speed while displaying status.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_motor', startShapeId: 'mcu', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_oled', startShapeId: 'mcu', endShapeId: 'oled', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'MCU Multi-Gate Logic Lab': {
    fileName: 'MCU Logic Lab',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 300, y: 50, width: 140, height: 280, label: 'ATmega328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: 'gray' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'and', type: 'AND', x: 150, y: 75, width: 80, height: 50, label: 'AND', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'a' }, { x: 0, y: 35, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 80, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and' },
      { id: 'led', type: 'OutPutL', x: 500, y: 100, width: 60, height: 30, label: 'Result', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'MCU Multi-Gate Logic Lab: The MCU acts as a central processing unit for external logic gate signals.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_a', startShapeId: 'sw1', endShapeId: 'and', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_b', startShapeId: 'sw2', endShapeId: 'and', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_and', startShapeId: 'and', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_led', startShapeId: 'mcu', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Hexadecimal Up-Counter': {
    fileName: 'Hex Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 1 },
      { id: '74161', type: 'IC74161', x: 200, y: 50, width: 120, height: 220, label: '74161 Counter', inputs: [{ x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 35, label: 'CLR', value: 1, name: 'clr' }, { x: 0, y: 55, label: 'LD', value: 1, name: 'ld' }, { x: 0, y: 75, label: 'ENP', value: 1, name: 'enp' }, { x: 0, y: 95, label: 'ENT', value: 1, name: 'ent' }, { x: 0, y: 115, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 135, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 155, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 175, label: 'D3', value: 0, name: 'd3' }], outputs: [{ x: 120, y: 25, label: 'Q0', value: 0, name: 'q0' }, { x: 120, y: 65, label: 'Q1', value: 0, name: 'q1' }, { x: 120, y: 105, label: 'Q2', value: 0, name: 'q2' }, { x: 120, y: 145, label: 'Q3', value: 0, name: 'q3' }, { x: 120, y: 185, label: 'RCO', value: 0, name: 'rco' }], name: '74161' },
      { id: 'disp', type: 'DisplayBCD', x: 400, y: 60, width: 120, height: 200, label: 'Hex Display', inputs: [{ x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }], outputs: [], name: 'disp' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Hexadecimal Up-Counter: A 74161 4-bit synchronous counter cycles through 0-F, displayed on a 4-bit 7-segment display.', inputs: [], outputs: [], name: 'desc', color: '#fbbf24', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: '74161', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: '74161', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: '74161', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c4', startShapeId: '74161', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c5', startShapeId: '74161', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'Decade Counter (0-9)': {
    fileName: 'Decade Counter',
    shapes: [
      { id: '7490', type: 'IC7490', x: 250, y: 50, width: 120, height: 180, label: '7490 Decade', inputs: [
        { x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' },
        { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' },
        { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' },
        { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' },
        { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' },
        { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' }
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' }
      ], name: '7490', state: { q0: 0, q123: 0 } },
      { id: 'disp', type: 'DisplayBCD', x: 420, y: 40, width: 120, height: 200, label: 'BCD Display', inputs: [
        { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }
      ], outputs: [], name: 'disp' },
      { id: '555', type: 'IC555', x: 100, y: 100, width: 100, height: 80, label: '555 Astable', inputs: [
        { x: 0, y: 20, label: 'TRIG', value: 0, name: 'trig' },
        { x: 0, y: 40, label: 'THRES', value: 0, name: 'thres' },
        { x: 0, y: 60, label: 'RESET', value: 1, name: 'reset' }
      ], outputs: [{ x: 100, y: 40, label: 'OUT', value: 0, name: 'out' }], name: '555', frequency: 1, mode: 'astable' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Decade Counter (0-9): A 7490 asynchronous counter configured for BCD counting (0-9). The 555 timer provides the clock pulses.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_q0_cp1', startShapeId: '7490', endShapeId: '7490', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_555_cp0', startShapeId: '555', endShapeId: '7490', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q0_d0', startShapeId: '7490', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q1_d1', startShapeId: '7490', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_q2_d2', startShapeId: '7490', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_q3_d3', startShapeId: '7490', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'Priority Encoder Lab': {
    fileName: 'Priority Encoder',
    shapes: [
      { id: '74147', type: 'IC74147', x: 200, y: 50, width: 120, height: 220, label: '74147 Encoder', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i + 1}`, value: 1, name: `in_${i + 1}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Y${i}`, value: 1, name: `out_${i}` })), name: '74147' },
      { id: 'disp', type: 'DisplayBCD', x: 400, y: 60, width: 120, height: 200, label: 'Result', inputs: [{ x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }], outputs: [], name: 'disp' },
      { id: 'sw1', type: 'PushButton', x: 50, y: 50, width: 80, height: 30, label: 'Input 9', inputs: [], outputs: [{ x: 70, y: 15, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'PushButton', x: 50, y: 100, width: 80, height: 30, label: 'Input 5', inputs: [], outputs: [{ x: 70, y: 15, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'not1', type: 'IC7404', x: 140, y: 50, width: 40, height: 100, label: 'Inverters', inputs: [{ x: 0, y: 15, label: '1A', value: 0, name: '1a' }, { x: 0, y: 40, label: '2A', value: 0, name: '2a' }], outputs: [{ x: 40, y: 15, label: '1Y', value: 1, name: '1y' }, { x: 40, y: 40, label: '2Y', value: 1, name: '2y' }], name: 'not1' },
      { id: 'not2', type: 'IC7404', x: 340, y: 50, width: 40, height: 150, label: 'Out Inv', inputs: [{ x: 0, y: 15, label: '1A', value: 1, name: '1a' }, { x: 0, y: 40, label: '2A', value: 1, name: '2a' }, { x: 0, y: 65, label: '3A', value: 1, name: '3a' }, { x: 0, y: 90, label: '4A', value: 1, name: '4a' }], outputs: [{ x: 40, y: 15, label: '1Y', value: 0, name: '1y' }, { x: 40, y: 40, label: '2Y', value: 0, name: '2y' }, { x: 40, y: 65, label: '3Y', value: 0, name: '3y' }, { x: 40, y: 90, label: '4Y', value: 0, name: '4y' }], name: 'not2' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Priority Encoder Lab: Uses a 74147 to encode the highest active input. Inverters are used to handle active-low signals.', inputs: [], outputs: [], name: 'desc', color: '#f472b6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'not1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'not1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'not1', endShapeId: '74147', startOutputIndex: 0, endInputIndex: 8 }, // I9
      { id: 'c4', startShapeId: 'not1', endShapeId: '74147', startOutputIndex: 1, endInputIndex: 4 }, // I5
      { id: 'c5', startShapeId: '74147', endShapeId: 'not2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: '74147', endShapeId: 'not2', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c7', startShapeId: '74147', endShapeId: 'not2', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c8', startShapeId: '74147', endShapeId: 'not2', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c9', startShapeId: 'not2', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'not2', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'not2', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c12', startShapeId: 'not2', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'ALU Arithmetic Lab': {
    fileName: 'ALU Lab',
    shapes: [
      { id: '74181', type: 'IC74181', x: 250, y: 50, width: 140, height: 300, label: '74181 ALU', inputs: [{ x: 0, y: 20, label: 'A', value: 0, name: 'a' }, { x: 0, y: 60, label: 'B', value: 0, name: 'b' }, { x: 0, y: 100, label: 'S', value: 0, name: 's' }, { x: 0, y: 140, label: 'M', value: 0, name: 'm' }, { x: 0, y: 180, label: 'Cn', value: 1, name: 'cn' }], outputs: [{ x: 140, y: 40, label: 'F', value: 0, name: 'f' }, { x: 140, y: 80, label: 'Cn+4', value: 0, name: 'cn4' }, { x: 140, y: 120, label: 'A=B', value: 0, name: 'aeqb' }], name: '74181' },
      { id: 'sw_a', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: 'Input A', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_a' },
      { id: 'sw_b', type: 'ToggleSwitch', x: 50, y: 120, width: 100, height: 50, label: 'Input B', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_b' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: 'ALU Result', inputs: [{ x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }], outputs: [], name: 'disp' },
      { id: 't1', type: 'Text', x: 50, y: 380, width: 600, height: 50, label: 'ALU Arithmetic Lab: Demonstrates 4-bit addition using the 74181 ALU. The result is displayed in Hex.', inputs: [], outputs: [], name: 'desc', color: '#34d399', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_a', endShapeId: '74181', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_b', endShapeId: '74181', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: '74181', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      // Note: 74181 simulation in App.tsx is simplified, usually just outputs 'a + b' or similar
    ]
  },
  'Shift Register Monitor': {
    fileName: 'SR Monitor',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Shift CLK', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 2 },
      { id: 'data', type: 'ToggleSwitch', x: 50, y: 160, width: 100, height: 50, label: 'Serial Data', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'data' },
      { id: '74595', type: 'IC74HC595', x: 250, y: 50, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: '74595' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 50, width: 120, height: 200, label: 'Hex Monitor', inputs: [{ x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }], outputs: [], name: 'disp' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Shift Register Monitor: Visualizes the first 4 bits of a 74HC595 shift register as a Hex digit.', inputs: [], outputs: [], name: 'desc', color: '#a78bfa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: '74595', startOutputIndex: 0, endInputIndex: 1 }, // SHCP
      { id: 'c2', startShapeId: 'clk', endShapeId: '74595', startOutputIndex: 0, endInputIndex: 2 }, // STCP (latch with shift)
      { id: 'c3', startShapeId: 'data', endShapeId: '74595', startOutputIndex: 0, endInputIndex: 0 }, // DS
      { id: 'c4', startShapeId: '74595', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: '74595', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c6', startShapeId: '74595', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c7', startShapeId: '74595', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'Logic Lab: AND Family': {
    fileName: 'AND Lab',
    shapes: [
      { id: 'and2', type: 'AND', x: 200, y: 50, width: 100, height: 50, label: 'AND-2', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and2' },
      { id: 'and3', type: 'AND3', x: 200, y: 120, width: 100, height: 50, label: 'AND-3', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 25, label: 'B', value: 0, name: 'b' }, { x: 0, y: 40, label: 'C', value: 0, name: 'c' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and3' },
      { id: 'and4', type: 'AND4', x: 200, y: 190, width: 100, height: 50, label: 'AND-4', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 18, label: 'B', value: 0, name: 'b' }, { x: 0, y: 32, label: 'C', value: 0, name: 'c' }, { x: 0, y: 45, label: 'D', value: 0, name: 'd' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and4' },
      { id: 'and5', type: 'AND5', x: 200, y: 260, width: 100, height: 50, label: 'AND-5', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 15, label: 'B', value: 0, name: 'b' }, { x: 0, y: 25, label: 'C', value: 0, name: 'c' }, { x: 0, y: 35, label: 'D', value: 0, name: 'd' }, { x: 0, y: 45, label: 'E', value: 0, name: 'e' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and5' },
      { id: 'sw_h', type: 'HighConstant', x: 50, y: 150, width: 80, height: 40, label: 'Logic 1', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'sw_h' },
      { id: 'l2', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'Y2', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l2' },
      { id: 'l3', type: 'OutPutL', x: 350, y: 130, width: 60, height: 30, label: 'Y3', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l3' },
      { id: 'l4', type: 'OutPutL', x: 350, y: 200, width: 60, height: 30, label: 'Y4', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l4' },
      { id: 'l5', type: 'OutPutL', x: 350, y: 270, width: 60, height: 30, label: 'Y5', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l5' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Logic Lab - AND Family: Demonstrates AND gates with 2, 3, 4, and 5 inputs. All inputs must be HIGH for the output to be HIGH.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_h', endShapeId: 'and2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_h', endShapeId: 'and2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'sw_h', endShapeId: 'and3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_h', endShapeId: 'and3', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'sw_h', endShapeId: 'and3', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'and2', endShapeId: 'l2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'and3', endShapeId: 'l3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'and4', endShapeId: 'l4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c9', startShapeId: 'and5', endShapeId: 'l5', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Logic Lab: OR Family': {
    fileName: 'OR Lab',
    shapes: [
      { id: 'or2', type: 'OR', x: 200, y: 50, width: 100, height: 50, label: 'OR-2', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'or2' },
      { id: 'or3', type: 'OR3', x: 200, y: 120, width: 100, height: 50, label: 'OR-3', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 25, label: 'B', value: 0, name: 'b' }, { x: 0, y: 40, label: 'C', value: 0, name: 'c' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'or3' },
      { id: 'or4', type: 'OR4', x: 200, y: 190, width: 100, height: 50, label: 'OR-4', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 18, label: 'B', value: 0, name: 'b' }, { x: 0, y: 32, label: 'C', value: 0, name: 'c' }, { x: 0, y: 45, label: 'D', value: 0, name: 'd' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'or4' },
      { id: 'or5', type: 'OR5', x: 200, y: 260, width: 100, height: 50, label: 'OR-5', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 15, label: 'B', value: 0, name: 'b' }, { x: 0, y: 25, label: 'C', value: 0, name: 'c' }, { x: 0, y: 35, label: 'D', value: 0, name: 'd' }, { x: 0, y: 45, label: 'E', value: 0, name: 'e' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'or5' },
      { id: 'sw_a', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Input A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_a' },
      { id: 'l2', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'Y2', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l2' },
      { id: 'l3', type: 'OutPutL', x: 350, y: 130, width: 60, height: 30, label: 'Y3', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l3' },
      { id: 'l4', type: 'OutPutL', x: 350, y: 200, width: 60, height: 30, label: 'Y4', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l4' },
      { id: 'l5', type: 'OutPutL', x: 350, y: 270, width: 60, height: 30, label: 'Y5', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l5' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Logic Lab - OR Family: Demonstrates OR gates with 2, 3, 4, and 5 inputs. Any HIGH input results in a HIGH output.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_a', endShapeId: 'or2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_a', endShapeId: 'or3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'sw_a', endShapeId: 'or4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_a', endShapeId: 'or5', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'or2', endShapeId: 'l2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'or3', endShapeId: 'l3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'or4', endShapeId: 'l4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'or5', endShapeId: 'l5', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Logic Lab: Universal Gates': {
    fileName: 'Universal Lab',
    shapes: [
      { id: 'nand2', type: 'NAND', x: 150, y: 50, width: 100, height: 50, label: 'NAND-2', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nand2' },
      { id: 'nand3', type: 'NAND3', x: 150, y: 120, width: 100, height: 50, label: 'NAND-3', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 25, label: 'B', value: 0, name: 'b' }, { x: 0, y: 40, label: 'C', value: 0, name: 'c' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nand3' },
      { id: 'nand4', type: 'NAND4', x: 150, y: 190, width: 100, height: 50, label: 'NAND-4', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 18, label: 'B', value: 0, name: 'b' }, { x: 0, y: 32, label: 'C', value: 0, name: 'c' }, { x: 0, y: 45, label: 'D', value: 0, name: 'd' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nand4' },
      { id: 'nor2', type: 'NOR', x: 350, y: 50, width: 100, height: 50, label: 'NOR-2', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nor2' },
      { id: 'nor3', type: 'NOR3', x: 350, y: 120, width: 100, height: 50, label: 'NOR-3', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 25, label: 'B', value: 0, name: 'b' }, { x: 0, y: 40, label: 'C', value: 0, name: 'c' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nor3' },
      { id: 'nor4', type: 'NOR4', x: 350, y: 190, width: 100, height: 50, label: 'NOR-4', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 18, label: 'B', value: 0, name: 'b' }, { x: 0, y: 32, label: 'C', value: 0, name: 'c' }, { x: 0, y: 45, label: 'D', value: 0, name: 'd' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'nor4' },
      { id: 'sw_a', type: 'ToggleSwitch', x: 20, y: 120, width: 80, height: 40, label: 'Input A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_a' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Logic Lab - Universal Gates: Showcases NAND and NOR gates. These are "universal" because any logic function can be built using only NAND or only NOR gates.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_a', endShapeId: 'nand2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_a', endShapeId: 'nand3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'sw_a', endShapeId: 'nand4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_a', endShapeId: 'nor2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'sw_a', endShapeId: 'nor3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'sw_a', endShapeId: 'nor4', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Logic Lab: Exclusive Gates': {
    fileName: 'Exclusive Lab',
    shapes: [
      { id: 'xor2', type: 'XOR', x: 200, y: 50, width: 100, height: 50, label: 'XOR-2', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'xor2' },
      { id: 'xor3', type: 'XOR3', x: 200, y: 120, width: 100, height: 50, label: 'XOR-3', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 25, label: 'B', value: 0, name: 'b' }, { x: 0, y: 40, label: 'C', value: 0, name: 'c' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'xor3' },
      { id: 'xor4', type: 'XOR4', x: 200, y: 190, width: 100, height: 50, label: 'XOR-4', inputs: [{ x: 0, y: 5, label: 'A', value: 0, name: 'a' }, { x: 0, y: 18, label: 'B', value: 0, name: 'b' }, { x: 0, y: 32, label: 'C', value: 0, name: 'c' }, { x: 0, y: 45, label: 'D', value: 0, name: 'd' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'xor4' },
      { id: 'xnor', type: 'XNOR', x: 200, y: 260, width: 100, height: 50, label: 'XNOR', inputs: [{ x: 0, y: 10, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'xnor' },
      { id: 'sw_a', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'Input A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_a' },
      { id: 'sw_b', type: 'ToggleSwitch', x: 50, y: 180, width: 80, height: 40, label: 'Input B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_b' },
      { id: 'l1', type: 'OutPutL', x: 350, y: 60, width: 60, height: 30, label: 'XOR2', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l1' },
      { id: 'l2', type: 'OutPutL', x: 350, y: 270, width: 60, height: 30, label: 'XNOR', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l2' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Logic Lab - Exclusive Gates: XOR outputs HIGH when an odd number of inputs are HIGH. XNOR is the inverse of XOR.', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_a', endShapeId: 'xor2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_b', endShapeId: 'xor2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'sw_a', endShapeId: 'xnor', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_b', endShapeId: 'xnor', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'xor2', endShapeId: 'l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'xnor', endShapeId: 'l2', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Logic Lab: Inverters & Buffers': {
    fileName: 'Inv Lab',
    shapes: [
      { id: 'not', type: 'NOT', x: 200, y: 100, width: 100, height: 50, label: 'NOT', inputs: [{ x: 0, y: 25, label: 'A', value: 0, name: 'a' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'not' },
      { id: 'buf', type: 'Buffer', x: 200, y: 200, width: 100, height: 50, label: 'Buffer', inputs: [{ x: 0, y: 25, label: 'A', value: 0, name: 'a' }], outputs: [{ x: 100, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'buf' },
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Input', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'l1', type: 'OutPutL', x: 350, y: 110, width: 60, height: 30, label: 'NOT Out', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'l1' },
      { id: 'l2', type: 'OutPutL', x: 350, y: 210, width: 60, height: 30, label: 'BUF Out', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'l2' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'Logic Lab - Inverters & Buffers: NOT inverts the input signal. Buffer passes the signal through (often used for amplification or delay).', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'not', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'buf', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'not', endShapeId: 'l1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'buf', endShapeId: 'l2', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7408: Basic AND Logic': {
    fileName: '7408 Basic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'ic', type: 'IC7408', x: 200, y: 100, width: 160, height: 80, label: '74LS08', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7408 Basic AND Logic: Demonstrates a single AND gate within the 74LS08 IC. Both inputs must be HIGH for the LED to light up.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7408: 3-Input AND Gate': {
    fileName: '7408 3-Input',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 110, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'sw3', type: 'ToggleSwitch', x: 50, y: 170, width: 80, height: 40, label: 'C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw3' },
      { id: 'ic', type: 'IC7408', x: 200, y: 100, width: 160, height: 80, label: '74LS08', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7408 3-Input AND Gate: Cascades two AND gates within the same IC to create a 3-input AND gate. (A AND B) AND C.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 }, // 1Y to 2A
      { id: 'c4', startShapeId: 'sw3', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 }, // C to 2B
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 }, // 2Y to LED
    ]
  },
  '7408: Quad AND Tester': {
    fileName: '7408 Quad Tester',
    shapes: [
      { id: 'ic', type: 'IC7408', x: 200, y: 100, width: 160, height: 80, label: '74LS08', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'high', type: 'HighConstant', x: 50, y: 120, width: 80, height: 40, label: 'Logic 1', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high' },
      { id: 'led1', type: 'OutPutL', x: 400, y: 50, width: 60, height: 30, label: 'Y1', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led1' },
      { id: 'led2', type: 'OutPutL', x: 400, y: 100, width: 60, height: 30, label: 'Y2', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led2' },
      { id: 'led3', type: 'OutPutL', x: 400, y: 150, width: 60, height: 30, label: 'Y3', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led3' },
      { id: 'led4', type: 'OutPutL', x: 400, y: 200, width: 60, height: 30, label: 'Y4', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led4' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: '7408 Quad AND Tester: Tests all four AND gates in the IC by connecting all inputs to a HIGH constant.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c7', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'c8', startShapeId: 'high', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'c9', startShapeId: 'ic', endShapeId: 'led1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'ic', endShapeId: 'led2', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c11', startShapeId: 'ic', endShapeId: 'led3', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c12', startShapeId: 'ic', endShapeId: 'led4', startOutputIndex: 3, endInputIndex: 0 },
    ]
  },
  '7400: Basic NAND Logic': {
    fileName: '7400 Basic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'ic', type: 'IC7400', x: 200, y: 100, width: 160, height: 80, label: '74LS00', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7400 Basic NAND Logic: Demonstrates a single NAND gate. The output is LOW only when both inputs are HIGH.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7400: NAND as Inverter': {
    fileName: '7400 Inverter',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 125, width: 80, height: 40, label: 'Input', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'ic', type: 'IC7400', x: 200, y: 100, width: 160, height: 80, label: '74LS00', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7400 NAND as Inverter: By tying both inputs of a NAND gate together, it functions as a NOT gate (Inverter).', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7400: SR Latch (NAND)': {
    fileName: '7400 SR Latch',
    shapes: [
      { id: 'sw_s', type: 'PushButton', x: 50, y: 80, width: 80, height: 40, label: 'SET (Active Low)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_s' },
      { id: 'sw_r', type: 'PushButton', x: 50, y: 180, width: 80, height: 40, label: 'RESET (Active Low)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_r' },
      { id: 'ic', type: 'IC7400', x: 200, y: 100, width: 160, height: 80, label: '74LS00', inputs: [{ x: 20, y: 80, label: '1A', value: 1, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 1, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led_q', type: 'OutPutL', x: 400, y: 80, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led_q' },
      { id: 'led_qn', type: 'OutPutL', x: 400, y: 180, width: 60, height: 30, label: 'Q!', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_qn' },
      { id: 't1', type: 'Text', x: 50, y: 280, width: 500, height: 50, label: '7400 SR Latch: A basic memory element built using cross-coupled NAND gates. Active-low inputs.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_s', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 }, // S to 1A
      { id: 'c2', startShapeId: 'sw_r', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 }, // R to 2B
      { id: 'c3', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 }, // 1Y to 2A
      { id: 'c4', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 1, endInputIndex: 1 }, // 2Y to 1B
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'ic', endShapeId: 'led_qn', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  '7432: Basic OR Logic': {
    fileName: '7432 Basic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'ic', type: 'IC7432', x: 200, y: 100, width: 160, height: 80, label: '74LS32', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7432 Basic OR Logic: Demonstrates a single OR gate. The output is HIGH if at least one input is HIGH.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7432: 3-Input OR Gate': {
    fileName: '7432 3-Input',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 110, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'sw3', type: 'ToggleSwitch', x: 50, y: 170, width: 80, height: 40, label: 'C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw3' },
      { id: 'ic', type: 'IC7432', x: 200, y: 100, width: 160, height: 80, label: '74LS32', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7432 3-Input OR Gate: Cascades two OR gates within the same IC to create a 3-input OR gate. (A OR B) OR C.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 }, // 1Y to 2A
      { id: 'c4', startShapeId: 'sw3', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 }, // C to 2B
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 }, // 2Y to LED
    ]
  },
  '7432: Quad OR Tester': {
    fileName: '7432 Quad Tester',
    shapes: [
      { id: 'ic', type: 'IC7432', x: 200, y: 100, width: 160, height: 80, label: '74LS32', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Gate 1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'Gate 2', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw2' },
      { id: 'sw3', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Gate 3', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw3' },
      { id: 'sw4', type: 'ToggleSwitch', x: 50, y: 200, width: 80, height: 40, label: 'Gate 4', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw4' },
      { id: 'led1', type: 'OutPutL', x: 400, y: 50, width: 60, height: 30, label: 'Y1', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led1' },
      { id: 'led2', type: 'OutPutL', x: 400, y: 100, width: 60, height: 30, label: 'Y2', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led2' },
      { id: 'led3', type: 'OutPutL', x: 400, y: 150, width: 60, height: 30, label: 'Y3', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led3' },
      { id: 'led4', type: 'OutPutL', x: 400, y: 200, width: 60, height: 30, label: 'Y4', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led4' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: '7432 Quad OR Tester: Tests all four OR gates in the IC. Activating any gate switch will light its corresponding LED.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'sw3', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c4', startShapeId: 'sw4', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'ic', endShapeId: 'led2', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'ic', endShapeId: 'led3', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'ic', endShapeId: 'led4', startOutputIndex: 3, endInputIndex: 0 },
    ]
  },
  '7402: Basic NOR Logic': {
    fileName: '7402 Basic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'ic', type: 'IC7402', x: 200, y: 100, width: 160, height: 80, label: '74LS02', inputs: [{ x: 40, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '1B', value: 0, name: '1b' }, { x: 100, y: 80, label: '2A', value: 0, name: '2a' }, { x: 120, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 20, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7402 Basic NOR Logic: Demonstrates a single NOR gate. The output is HIGH only when both inputs are LOW.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7402: NOR SR Latch': {
    fileName: '7402 SR Latch',
    shapes: [
      { id: 'sw_s', type: 'PushButton', x: 50, y: 80, width: 80, height: 40, label: 'SET (Active High)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s' },
      { id: 'sw_r', type: 'PushButton', x: 50, y: 180, width: 80, height: 40, label: 'RESET (Active High)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_r' },
      { id: 'ic', type: 'IC7402', x: 200, y: 100, width: 160, height: 80, label: '74LS02', inputs: [{ x: 40, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '1B', value: 1, name: '1b' }, { x: 100, y: 80, label: '2A', value: 1, name: '2a' }, { x: 120, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 20, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led_q', type: 'OutPutL', x: 400, y: 80, width: 60, height: 30, label: 'Q', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q' },
      { id: 'led_qn', type: 'OutPutL', x: 400, y: 180, width: 60, height: 30, label: 'Q!', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led_qn' },
      { id: 't1', type: 'Text', x: 50, y: 280, width: 500, height: 50, label: '7402 NOR SR Latch: A basic memory element built using cross-coupled NOR gates. Active-high inputs.', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_s', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 }, // S to 2B
      { id: 'c2', startShapeId: 'sw_r', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 }, // R to 1A
      { id: 'c3', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 }, // 1Y to 2A
      { id: 'c4', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 1, endInputIndex: 1 }, // 2Y to 1B
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led_q', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'ic', endShapeId: 'led_qn', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7402: NOR as Inverter': {
    fileName: '7402 Inverter',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 125, width: 80, height: 40, label: 'Input', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'ic', type: 'IC7402', x: 200, y: 100, width: 160, height: 80, label: '74LS02', inputs: [{ x: 40, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '1B', value: 0, name: '1b' }, { x: 100, y: 80, label: '2A', value: 0, name: '2a' }, { x: 120, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 20, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 1, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 1, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7402 NOR as Inverter: By tying both inputs of a NOR gate together, it functions as a NOT gate (Inverter).', inputs: [], outputs: [], name: 'desc', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7486: Basic XOR Logic': {
    fileName: '7486 Basic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'ic', type: 'IC7486', x: 200, y: 100, width: 160, height: 80, label: '74LS86', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7486 Basic XOR Logic: Demonstrates a single XOR gate. The output is HIGH only when the inputs are different.', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7486: Controlled Inverter': {
    fileName: '7486 Inverter',
    shapes: [
      { id: 'sw_data', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'Data', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_data' },
      { id: 'sw_ctrl', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'Invert?', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_ctrl' },
      { id: 'ic', type: 'IC7486', x: 200, y: 100, width: 160, height: 80, label: '74LS86', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Result', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7486 Controlled Inverter: When "Invert?" is HIGH, the output is the inverse of "Data". When LOW, the output matches "Data".', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_data', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_ctrl', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7486: Parity Bit Generator': {
    fileName: '7486 Parity',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Bit 0', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 110, width: 80, height: 40, label: 'Bit 1', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw2' },
      { id: 'sw3', type: 'ToggleSwitch', x: 50, y: 170, width: 80, height: 40, label: 'Bit 2', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw3' },
      { id: 'ic', type: 'IC7486', x: 200, y: 100, width: 160, height: 80, label: '74LS86', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Even Parity', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7486 Parity Bit Generator: Uses XOR gates to generate an even parity bit for a 3-bit input. The LED is HIGH if an odd number of inputs are HIGH.', inputs: [], outputs: [], name: 'desc', color: '#8b5cf6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 }, // (B0 XOR B1) to 2A
      { id: 'c4', startShapeId: 'sw3', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 }, // B2 to 2B
      { id: 'c5', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 }, // 2Y to LED
    ]
  },
  '7404: Basic NOT Logic': {
    fileName: '7404 Basic',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 125, width: 80, height: 40, label: 'Input', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'ic', type: 'IC7404', x: 200, y: 100, width: 160, height: 80, label: '74LS04', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '4A', value: 0, name: '4a' }, { x: 80, y: 0, label: '5A', value: 0, name: '5a' }, { x: 40, y: 0, label: '6A', value: 0, name: '6a' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 40, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 120, y: 80, label: '3Y', value: 1, name: '3y' }, { x: 140, y: 0, label: '4Y', value: 1, name: '4y' }, { x: 100, y: 0, label: '5Y', value: 1, name: '5y' }, { x: 60, y: 0, label: '6Y', value: 1, name: '6y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7404 Basic NOT Logic: Demonstrates a single inverter. The output is always the opposite of the input.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '7404: Hex NOT Tester': {
    fileName: '7404 Hex Tester',
    shapes: [
      { id: 'ic', type: 'IC7404', x: 200, y: 100, width: 160, height: 80, label: '74LS04', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '4A', value: 0, name: '4a' }, { x: 80, y: 0, label: '5A', value: 0, name: '5a' }, { x: 40, y: 0, label: '6A', value: 0, name: '6a' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 40, y: 80, label: '1Y', value: 1, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 120, y: 80, label: '3Y', value: 1, name: '3y' }, { x: 140, y: 0, label: '4Y', value: 1, name: '4y' }, { x: 100, y: 0, label: '5Y', value: 1, name: '5y' }, { x: 60, y: 0, label: '6Y', value: 1, name: '6y' }], name: 'ic' },
      { id: 'low', type: 'LowConstant', x: 50, y: 120, width: 80, height: 40, label: 'Logic 0', inputs: [], outputs: [{ x: 70, y: 20, label: '0', value: 0, name: 'out' }], name: 'low' },
      { id: 'led1', type: 'OutPutL', x: 400, y: 20, width: 60, height: 30, label: 'Y1', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led1' },
      { id: 'led2', type: 'OutPutL', x: 400, y: 60, width: 60, height: 30, label: 'Y2', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led2' },
      { id: 'led3', type: 'OutPutL', x: 400, y: 100, width: 60, height: 30, label: 'Y3', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led3' },
      { id: 'led4', type: 'OutPutL', x: 400, y: 140, width: 60, height: 30, label: 'Y4', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led4' },
      { id: 'led5', type: 'OutPutL', x: 400, y: 180, width: 60, height: 30, label: 'Y5', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led5' },
      { id: 'led6', type: 'OutPutL', x: 400, y: 220, width: 60, height: 30, label: 'Y6', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led6' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: '7404 Hex NOT Tester: Tests all six inverters in the IC by connecting all inputs to a LOW constant. All LEDs should be HIGH.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6', startShapeId: 'low', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c7', startShapeId: 'ic', endShapeId: 'led1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'ic', endShapeId: 'led2', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c9', startShapeId: 'ic', endShapeId: 'led3', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'ic', endShapeId: 'led4', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c11', startShapeId: 'ic', endShapeId: 'led5', startOutputIndex: 4, endInputIndex: 0 },
      { id: 'c12', startShapeId: 'ic', endShapeId: 'led6', startOutputIndex: 5, endInputIndex: 0 },
    ]
  },
  '7404: Cascaded NOT (Buffer)': {
    fileName: '7404 Buffer',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 125, width: 80, height: 40, label: 'Input', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw' },
      { id: 'ic', type: 'IC7404', x: 200, y: 100, width: 160, height: 80, label: '74LS04', inputs: [{ x: 20, y: 80, label: '1A', value: 1, name: '1a' }, { x: 60, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '4A', value: 0, name: '4a' }, { x: 80, y: 0, label: '5A', value: 0, name: '5a' }, { x: 40, y: 0, label: '6A', value: 0, name: '6a' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 40, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 1, name: '2y' }, { x: 120, y: 80, label: '3Y', value: 1, name: '3y' }, { x: 140, y: 0, label: '4Y', value: 1, name: '4y' }, { x: 100, y: 0, label: '5Y', value: 1, name: '5y' }, { x: 60, y: 0, label: '6Y', value: 1, name: '6y' }], name: 'ic' },
      { id: 'led', type: 'OutPutL', x: 400, y: 125, width: 60, height: 30, label: 'Output', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: '7404 Cascaded NOT (Buffer): Cascading two inverters results in a non-inverting buffer. The output matches the input.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 }, // In to 1A
      { id: 'c2', startShapeId: 'ic', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 1 }, // 1Y to 2A
      { id: 'c3', startShapeId: 'ic', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 }, // 2Y to LED
    ]
  },


  'Reloj Digital 74Ls93': {
    fileName: 'Reloj Digital 74LS93',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 800, height: 40, label: 'Digital Clock using 74LS93 Counters', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 24px Orbitron' },
      { id: 'timer_555', type: 'IC555', x: 50, y: 650, width: 100, height: 80, label: '1Hz Clock', inputs: [{ x: 0, y: 20, label: 'TRIG', value: 0, name: 'trig' }, { x: 0, y: 40, label: 'THRES', value: 0, name: 'thres' }, { x: 0, y: 60, label: 'RESET', value: 1, name: 'reset' }], outputs: [{ x: 100, y: 40, label: 'OUT', value: 0, name: 'out' }], name: 'timer_555' },

      // SECONDS
      { id: 'u_s_cnt', type: 'IC7493', x: 1000, y: 450, width: 120, height: 120, label: 'U_S', inputs: [{ x: 0, y: 15, label: 'CKA', value: 0 }, { x: 0, y: 35, label: 'CKB', value: 0 }, { x: 0, y: 55, label: 'R01', value: 0 }, { x: 0, y: 75, label: 'R02', value: 0 }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 'u_s_cnt' },
      { id: 'u_s_dec', type: 'IC7447', x: 1000, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u_s_dec' },
      { id: 'u_s_disp', type: 'Display', x: 1000, y: 50, width: 100, height: 180, label: 'Sec Units', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u_s_disp' },
      
      { id: 't_s_cnt', type: 'IC7493', x: 850, y: 450, width: 120, height: 120, label: 'T_S', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 't_s_cnt' },
      { id: 't_s_dec', type: 'IC7447', x: 850, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 't_s_dec' },
      { id: 't_s_disp', type: 'Display', x: 850, y: 50, width: 100, height: 180, label: 'Sec Tens', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 't_s_disp' },

      // MINUTES
      { id: 'u_m_cnt', type: 'IC7493', x: 650, y: 450, width: 120, height: 120, label: 'U_M', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 'u_m_cnt' },
      { id: 'u_m_dec', type: 'IC7447', x: 650, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u_m_dec' },
      { id: 'u_m_disp', type: 'Display', x: 650, y: 50, width: 100, height: 180, label: 'Min Units', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u_m_disp' },
      
      { id: 't_m_cnt', type: 'IC7493', x: 500, y: 450, width: 120, height: 120, label: 'T_M', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 't_m_cnt' },
      { id: 't_m_dec', type: 'IC7447', x: 500, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 't_m_dec' },
      { id: 't_m_disp', type: 'Display', x: 500, y: 50, width: 100, height: 180, label: 'Min Tens', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 't_m_disp' },

      // HOURS
      { id: 'u_h_cnt', type: 'IC7493', x: 300, y: 450, width: 120, height: 120, label: 'U_H', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 'u_h_cnt' },
      { id: 'u_h_dec', type: 'IC7447', x: 300, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u_h_dec' },
      { id: 'u_h_disp', type: 'Display', x: 300, y: 50, width: 100, height: 180, label: 'Hour Units', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u_h_disp' },
      
      { id: 't_h_cnt', type: 'IC7493', x: 150, y: 450, width: 120, height: 120, label: 'T_H', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 't_h_cnt' },
      { id: 't_h_dec', type: 'IC7447', x: 150, y: 250, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 't_h_dec' },
      { id: 't_h_disp', type: 'Display', x: 150, y: 50, width: 100, height: 180, label: 'Hour Tens', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 't_h_disp' },

      { id: 'desc', type: 'Text', x: 50, y: 750, width: 800, height: 100, label: 'Digital Clock using 74LS93 (4-bit binary counter) and 74LS47 (BCD to 7-segment decoder). The 555 timer provides a 1Hz clock signal. Reset logic is implemented by connecting specific outputs to the R0(1) and R0(2) pins of the 74LS93 to create Mod-10, Mod-6, and Mod-24 counters.', inputs: [], outputs: [], name: 'desc', color: '#fbbf24', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c_s_u_clk', startShapeId: 'timer_555', endShapeId: 'u_s_cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_s_u_qa_ckb', startShapeId: 'u_s_cnt', endShapeId: 'u_s_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_s_u_r1', startShapeId: 'u_s_cnt', endShapeId: 'u_s_cnt', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c_s_u_r2', startShapeId: 'u_s_cnt', endShapeId: 'u_s_cnt', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c_s_u_dec_a', startShapeId: 'u_s_cnt', endShapeId: 'u_s_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_s_u_dec_b', startShapeId: 'u_s_cnt', endShapeId: 'u_s_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_s_u_dec_c', startShapeId: 'u_s_cnt', endShapeId: 'u_s_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_s_u_dec_d', startShapeId: 'u_s_cnt', endShapeId: 'u_s_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_s_u_disp_${i}`, startShapeId: 'u_s_dec', endShapeId: 'u_s_disp', startOutputIndex: i, endInputIndex: i })),

      { id: 'c_s_t_clk', startShapeId: 'u_s_cnt', endShapeId: 't_s_cnt', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c_s_t_qa_ckb', startShapeId: 't_s_cnt', endShapeId: 't_s_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_s_t_r1', startShapeId: 't_s_cnt', endShapeId: 't_s_cnt', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c_s_t_r2', startShapeId: 't_s_cnt', endShapeId: 't_s_cnt', startOutputIndex: 2, endInputIndex: 3 },
      { id: 'c_s_t_dec_a', startShapeId: 't_s_cnt', endShapeId: 't_s_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_s_t_dec_b', startShapeId: 't_s_cnt', endShapeId: 't_s_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_s_t_dec_c', startShapeId: 't_s_cnt', endShapeId: 't_s_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_s_t_dec_d', startShapeId: 't_s_cnt', endShapeId: 't_s_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_s_t_disp_${i}`, startShapeId: 't_s_dec', endShapeId: 't_s_disp', startOutputIndex: i, endInputIndex: i })),

      { id: 'c_m_u_clk', startShapeId: 't_s_cnt', endShapeId: 'u_m_cnt', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c_m_u_qa_ckb', startShapeId: 'u_m_cnt', endShapeId: 'u_m_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_m_u_r1', startShapeId: 'u_m_cnt', endShapeId: 'u_m_cnt', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c_m_u_r2', startShapeId: 'u_m_cnt', endShapeId: 'u_m_cnt', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c_m_u_dec_a', startShapeId: 'u_m_cnt', endShapeId: 'u_m_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_m_u_dec_b', startShapeId: 'u_m_cnt', endShapeId: 'u_m_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_m_u_dec_c', startShapeId: 'u_m_cnt', endShapeId: 'u_m_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_m_u_dec_d', startShapeId: 'u_m_cnt', endShapeId: 'u_m_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_m_u_disp_${i}`, startShapeId: 'u_m_dec', endShapeId: 'u_m_disp', startOutputIndex: i, endInputIndex: i })),

      { id: 'c_m_t_clk', startShapeId: 'u_m_cnt', endShapeId: 't_m_cnt', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c_m_t_qa_ckb', startShapeId: 't_m_cnt', endShapeId: 't_m_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_m_t_r1', startShapeId: 't_m_cnt', endShapeId: 't_m_cnt', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c_m_t_r2', startShapeId: 't_m_cnt', endShapeId: 't_m_cnt', startOutputIndex: 2, endInputIndex: 3 },
      { id: 'c_m_t_dec_a', startShapeId: 't_m_cnt', endShapeId: 't_m_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_m_t_dec_b', startShapeId: 't_m_cnt', endShapeId: 't_m_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_m_t_dec_c', startShapeId: 't_m_cnt', endShapeId: 't_m_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_m_t_dec_d', startShapeId: 't_m_cnt', endShapeId: 't_m_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_m_t_disp_${i}`, startShapeId: 't_m_dec', endShapeId: 't_m_disp', startOutputIndex: i, endInputIndex: i })),

      { id: 'c_h_u_clk', startShapeId: 't_m_cnt', endShapeId: 'u_h_cnt', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c_h_u_qa_ckb', startShapeId: 'u_h_cnt', endShapeId: 'u_h_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_h_u_dec_a', startShapeId: 'u_h_cnt', endShapeId: 'u_h_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_h_u_dec_b', startShapeId: 'u_h_cnt', endShapeId: 'u_h_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_h_u_dec_c', startShapeId: 'u_h_cnt', endShapeId: 'u_h_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_h_u_dec_d', startShapeId: 'u_h_cnt', endShapeId: 'u_h_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_h_u_disp_${i}`, startShapeId: 'u_h_dec', endShapeId: 'u_h_disp', startOutputIndex: i, endInputIndex: i })),

      { id: 'c_h_t_clk', startShapeId: 'u_h_cnt', endShapeId: 't_h_cnt', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c_h_t_qa_ckb', startShapeId: 't_h_cnt', endShapeId: 't_h_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_h_t_dec_a', startShapeId: 't_h_cnt', endShapeId: 't_h_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_h_t_dec_b', startShapeId: 't_h_cnt', endShapeId: 't_h_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_h_t_dec_c', startShapeId: 't_h_cnt', endShapeId: 't_h_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_h_t_dec_d', startShapeId: 't_h_cnt', endShapeId: 't_h_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_h_t_disp_${i}`, startShapeId: 't_h_dec', endShapeId: 't_h_disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'Digital Clock': {
    fileName: 'Digital Clock',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 800, height: 40, label: 'Digital Clock: 24-Hour System (7490 & 7447)', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 24px Orbitron' },
      { id: 'desc', type: 'Text', x: 50, y: 50, width: 1000, height: 40, label: 'Reloj Digital de 24 horas usando contadores 7490 y decodificadores 7447. Incluye botones para ajuste de horas y minutos.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      
      // Displays (U1-U6)
      { id: 'u1', type: 'Display', x: 100, y: 50, width: 100, height: 180, label: 'U1', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u1' },
      { id: 'u2', type: 'Display', x: 250, y: 50, width: 100, height: 180, label: 'U2', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u2' },
      { id: 'u3', type: 'Display', x: 450, y: 50, width: 100, height: 180, label: 'U3', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u3' },
      { id: 'u4', type: 'Display', x: 600, y: 50, width: 100, height: 180, label: 'U4', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u4' },
      { id: 'u5', type: 'Display', x: 800, y: 50, width: 100, height: 180, label: 'U5', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u5' },
      { id: 'u6', type: 'Display', x: 950, y: 50, width: 100, height: 180, label: 'U6', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u6' },

      // Decoders (U7-U12)
      { id: 'u7', type: 'IC7447', x: 100, y: 250, width: 120, height: 180, label: 'U7 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u7' },
      { id: 'u8', type: 'IC7447', x: 250, y: 250, width: 120, height: 180, label: 'U8 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u8' },
      { id: 'u9', type: 'IC7447', x: 450, y: 250, width: 120, height: 180, label: 'U9 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u9' },
      { id: 'u10', type: 'IC7447', x: 600, y: 250, width: 120, height: 180, label: 'U10 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u10' },
      { id: 'u11', type: 'IC7447', x: 800, y: 250, width: 120, height: 180, label: 'U11 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u11' },
      { id: 'u12', type: 'IC7447', x: 950, y: 250, width: 120, height: 180, label: 'U12 (7447)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u12' },

      // Counters (U13-U18)
      { id: 'u13', type: 'IC7490', x: 100, y: 450, width: 120, height: 180, label: 'U13 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u13' },
      { id: 'u14', type: 'IC7490', x: 250, y: 450, width: 120, height: 180, label: 'U14 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u14' },
      { id: 'u15', type: 'IC7490', x: 450, y: 450, width: 120, height: 180, label: 'U15 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u15' },
      { id: 'u16', type: 'IC7490', x: 600, y: 450, width: 120, height: 180, label: 'U16 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u16' },
      { id: 'u17', type: 'IC7490', x: 800, y: 450, width: 120, height: 180, label: 'U17 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u17' },
      { id: 'u18', type: 'IC7490', x: 950, y: 450, width: 120, height: 180, label: 'U18 (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u18' },

      // Control Logic
      { id: 'u19', type: 'OR', x: 550, y: 650, width: 60, height: 60, label: 'U19 (OR)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 45, label: 'B' }], outputs: [{ x: 60, y: 30, label: 'Y' }], name: 'u19' },
      { id: 'u20', type: 'OR', x: 200, y: 650, width: 60, height: 60, label: 'U20 (OR)', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 45, label: 'B' }], outputs: [{ x: 60, y: 30, label: 'Y' }], name: 'u20' },
      { id: 'x1', type: 'PushButton', x: 550, y: 750, width: 60, height: 40, label: 'Set Min', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out' }], name: 'x1' },
      { id: 'x2', type: 'PushButton', x: 200, y: 750, width: 60, height: 40, label: 'Set Hour', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out' }], name: 'x2' },
      { id: 'xfg1', type: 'Clock', x: 1100, y: 450, width: 100, height: 60, label: 'XFG1 (1Hz)', inputs: [], outputs: [{ x: 100, y: 30, label: 'CLK' }], name: 'xfg1', frequency: 1 },
      { id: 'gnd', type: 'LowConstant', x: 1100, y: 600, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      // Seconds Units (U18)
      { id: 'c1', startShapeId: 'xfg1', endShapeId: 'u18', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'u18', endShapeId: 'u18', startOutputIndex: 0, endInputIndex: 1 }, // Q0 to CP1
      { id: 'c3', startShapeId: 'u18', endShapeId: 'u12', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'u18', endShapeId: 'u12', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'u18', endShapeId: 'u12', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'u18', endShapeId: 'u12', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u12_u6_${i}`, startShapeId: 'u12', endShapeId: 'u6', startOutputIndex: i, endInputIndex: i })),

      // Seconds Tens (U17)
      { id: 'c7', startShapeId: 'u18', endShapeId: 'u17', startOutputIndex: 3, endInputIndex: 0 }, // U18 Q3 to U17 CP0
      { id: 'c8', startShapeId: 'u17', endShapeId: 'u17', startOutputIndex: 0, endInputIndex: 1 }, // Q0 to CP1
      { id: 'c9', startShapeId: 'u17', endShapeId: 'u17', startOutputIndex: 1, endInputIndex: 2 }, // Q1 to MR1 (Reset at 6)
      { id: 'c10', startShapeId: 'u17', endShapeId: 'u17', startOutputIndex: 2, endInputIndex: 3 }, // Q2 to MR2 (Reset at 6)
      { id: 'c11', startShapeId: 'u17', endShapeId: 'u11', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c12', startShapeId: 'u17', endShapeId: 'u11', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c13', startShapeId: 'u17', endShapeId: 'u11', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c14', startShapeId: 'u17', endShapeId: 'u11', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u11_u5_${i}`, startShapeId: 'u11', endShapeId: 'u5', startOutputIndex: i, endInputIndex: i })),

      // Minutes Units (U16)
      { id: 'c15', startShapeId: 'u17', endShapeId: 'u19', startOutputIndex: 2, endInputIndex: 0 }, // U17 Q2 to OR
      { id: 'c16', startShapeId: 'x1', endShapeId: 'u19', startOutputIndex: 0, endInputIndex: 1 }, // Button to OR
      { id: 'c17', startShapeId: 'u19', endShapeId: 'u16', startOutputIndex: 0, endInputIndex: 0 }, // OR to U16 CP0
      { id: 'c18', startShapeId: 'u16', endShapeId: 'u16', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c19', startShapeId: 'u16', endShapeId: 'u10', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c20', startShapeId: 'u16', endShapeId: 'u10', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c21', startShapeId: 'u16', endShapeId: 'u10', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c22', startShapeId: 'u16', endShapeId: 'u10', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u10_u4_${i}`, startShapeId: 'u10', endShapeId: 'u4', startOutputIndex: i, endInputIndex: i })),

      // Minutes Tens (U15)
      { id: 'c23', startShapeId: 'u16', endShapeId: 'u15', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c24', startShapeId: 'u15', endShapeId: 'u15', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c25', startShapeId: 'u15', endShapeId: 'u15', startOutputIndex: 1, endInputIndex: 2 }, // Reset at 6
      { id: 'c26', startShapeId: 'u15', endShapeId: 'u15', startOutputIndex: 2, endInputIndex: 3 }, // Reset at 6
      { id: 'c27', startShapeId: 'u15', endShapeId: 'u9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c28', startShapeId: 'u15', endShapeId: 'u9', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c29', startShapeId: 'u15', endShapeId: 'u9', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c30', startShapeId: 'u15', endShapeId: 'u9', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u9_u3_${i}`, startShapeId: 'u9', endShapeId: 'u3', startOutputIndex: i, endInputIndex: i })),

      // Hours Units (U14)
      { id: 'c31', startShapeId: 'u15', endShapeId: 'u20', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c32', startShapeId: 'x2', endShapeId: 'u20', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c33', startShapeId: 'u20', endShapeId: 'u14', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c34', startShapeId: 'u14', endShapeId: 'u14', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c35', startShapeId: 'u14', endShapeId: 'u8', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c36', startShapeId: 'u14', endShapeId: 'u8', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c37', startShapeId: 'u14', endShapeId: 'u8', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c38', startShapeId: 'u14', endShapeId: 'u8', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u8_u2_${i}`, startShapeId: 'u8', endShapeId: 'u2', startOutputIndex: i, endInputIndex: i })),

      // Hours Tens (U13)
      { id: 'c39', startShapeId: 'u14', endShapeId: 'u13', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c40', startShapeId: 'u13', endShapeId: 'u13', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c41', startShapeId: 'u13', endShapeId: 'u7', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c42', startShapeId: 'u13', endShapeId: 'u7', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c43', startShapeId: 'u13', endShapeId: 'u7', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c44', startShapeId: 'u13', endShapeId: 'u7', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_u7_u1_${i}`, startShapeId: 'u7', endShapeId: 'u1', startOutputIndex: i, endInputIndex: i })),

      // 24-Hour Reset Logic (U13 Q1 and U14 Q2)
      { id: 'c45', startShapeId: 'u13', endShapeId: 'u13', startOutputIndex: 1, endInputIndex: 2 }, // U13 Q1 to U13 MR1
      { id: 'c46', startShapeId: 'u14', endShapeId: 'u13', startOutputIndex: 2, endInputIndex: 3 }, // U14 Q2 to U13 MR2
      { id: 'c47', startShapeId: 'u13', endShapeId: 'u14', startOutputIndex: 1, endInputIndex: 2 }, // U13 Q1 to U14 MR1
      { id: 'c48', startShapeId: 'u14', endShapeId: 'u14', startOutputIndex: 2, endInputIndex: 3 }, // U14 Q2 to U14 MR2
    ]
  },
  '74LS47: BCD to 7-Segment Decoder': {
    fileName: '74LS47 BCD Decoder',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74LS47: BCD to 7-Segment Decoder', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Decodifica una entrada BCD (0-9) para mostrarla en un display de 7 segmentos.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'sw3', type: 'ToggleSwitch', x: 50, y: 80, width: 80, height: 40, label: 'D (MSB)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0 }], name: 'sw3' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 140, width: 80, height: 40, label: 'C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0 }], name: 'sw2' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 200, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0 }], name: 'sw1' },
      { id: 'sw0', type: 'ToggleSwitch', x: 50, y: 260, width: 80, height: 40, label: 'A (LSB)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0 }], name: 'sw0' },
      { id: 'dec', type: 'IC7447', x: 200, y: 100, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec' },
      { id: 'disp', type: 'Display', x: 400, y: 80, width: 100, height: 200, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp' },
      { id: 'label', type: 'Text', x: 50, y: 350, width: 500, height: 60, label: 'Decodificador BCD a 7 segmentos 74LS47. Convierte una entrada binaria de 4 bits en el código necesario para encender un display de ánodo común.', inputs: [], outputs: [], name: 'label', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c0', startShapeId: 'sw0', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'sw3', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `cd${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '74LS93 & 74LS47: Decade Counter (0-9)': {
    fileName: 'Decade Counter 0-9',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74LS93 & 74LS47: Decade Counter (0-9)', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Contador de décadas que utiliza el 74LS93 para contar pulsos y el 74LS47 para visualizar el resultado.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 1 },
      { id: 'cnt', type: 'IC7493', x: 200, y: 100, width: 120, height: 120, label: '74LS93', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 'cnt' },
      { id: 'dec', type: 'IC7447', x: 400, y: 100, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec' },
      { id: 'disp', type: 'Display', x: 600, y: 80, width: 100, height: 200, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 1, endInputIndex: 2 }, // QB to R01
      { id: 'c4', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 3, endInputIndex: 3 }, // QD to R02
      { id: 'c5', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c7', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c8', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `cd${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'BCD to 7-Segment Decoder (Schematic)': {
    fileName: 'BCD to 7-Seg Schematic',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 800, height: 40, label: 'BCD to 7-Segment Display Decoder', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 24px Inter' },
      
      // Inputs
      { id: 'in_w', type: 'ToggleSwitch', x: 50, y: 80, width: 80, height: 40, label: 'W (MSB)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'in_w', color: '#9333ea' },
      { id: 'in_x', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'X', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'in_x', color: '#9333ea' },
      { id: 'in_y', type: 'ToggleSwitch', x: 50, y: 240, width: 80, height: 40, label: 'Y', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'in_y', color: '#9333ea' },
      { id: 'in_z', type: 'ToggleSwitch', x: 50, y: 320, width: 80, height: 40, label: 'Z (LSB)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'in_z', color: '#9333ea' },

      // Inverters
      { id: 'not_x', type: 'NOT', x: 220, y: 180, width: 60, height: 40, label: 'NOT X', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not_x' },
      { id: 'not_y', type: 'NOT', x: 220, y: 280, width: 60, height: 40, label: 'NOT Y', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not_y' },
      { id: 'not_z', type: 'NOT', x: 220, y: 380, width: 60, height: 40, label: 'NOT Z', inputs: [{ x: 0, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'not_z' },

      // AND Gates (Logic terms)
      { id: 'and1', type: 'AND', x: 450, y: 100, width: 60, height: 40, label: '1', inputs: [{ x: 0, y: 10, label: 'X', value: 0, name: 'a' }, { x: 0, y: 30, label: 'Z', value: 0, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and1' },
      { id: 'and2', type: 'AND', x: 450, y: 170, width: 60, height: 40, label: '2', inputs: [{ x: 0, y: 10, label: '!X', value: 1, name: 'a' }, { x: 0, y: 30, label: '!Z', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'and2' },
      { id: 'and3', type: 'AND', x: 450, y: 240, width: 60, height: 40, label: '3', inputs: [{ x: 0, y: 10, label: '!Y', value: 1, name: 'a' }, { x: 0, y: 30, label: '!Z', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'and3' },
      { id: 'and4', type: 'AND', x: 450, y: 310, width: 60, height: 40, label: '4', inputs: [{ x: 0, y: 10, label: '!X', value: 1, name: 'a' }, { x: 0, y: 30, label: 'Y', value: 0, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and4' },
      { id: 'and5', type: 'AND', x: 450, y: 380, width: 60, height: 40, label: '5', inputs: [{ x: 0, y: 10, label: 'Y', value: 0, name: 'a' }, { x: 0, y: 30, label: '!Z', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and5' },
      { id: 'and6', type: 'AND', x: 450, y: 450, width: 60, height: 40, label: '6', inputs: [{ x: 0, y: 10, label: '!X', value: 1, name: 'a' }, { x: 0, y: 30, label: '!Z', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'and6' },
      { id: 'and7', type: 'AND3', x: 450, y: 520, width: 60, height: 50, label: '7', inputs: [{ x: 0, y: 10, label: 'X', value: 0, name: 'a' }, { x: 0, y: 25, label: '!Y', value: 1, name: 'b' }, { x: 0, y: 40, label: 'Z', value: 0, name: 'c' }], outputs: [{ x: 60, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'and7' },
      { id: 'and8', type: 'AND', x: 450, y: 600, width: 60, height: 40, label: '8', inputs: [{ x: 0, y: 10, label: 'X', value: 0, name: 'a' }, { x: 0, y: 30, label: '!Y', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and8' },
      { id: 'and9', type: 'AND', x: 450, y: 670, width: 60, height: 40, label: '9', inputs: [{ x: 0, y: 10, label: 'X', value: 0, name: 'a' }, { x: 0, y: 30, label: '!Z', value: 1, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and9' },
      { id: 'and_yz', type: 'AND', x: 450, y: 740, width: 60, height: 40, label: 'YZ', inputs: [{ x: 0, y: 10, label: 'Y', value: 0, name: 'a' }, { x: 0, y: 30, label: 'Z', value: 0, name: 'b' }], outputs: [{ x: 60, y: 20, label: 'Y', value: 0, name: 'y' }], name: 'and_yz' },

      // OR Gates (Segments)
      { id: 'or_a', type: 'OR4', x: 750, y: 100, width: 80, height: 60, label: 'a', inputs: [{ x: 0, y: 10, label: 'W', value: 0 }, { x: 0, y: 25, label: 'Y', value: 0 }, { x: 0, y: 40, label: '1', value: 0 }, { x: 0, y: 55, label: '2', value: 1 }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'y' }], name: 'or_a' },
      { id: 'or_b', type: 'OR3', x: 750, y: 200, width: 80, height: 50, label: 'b', inputs: [{ x: 0, y: 10, label: '!X', value: 1 }, { x: 0, y: 25, label: '3', value: 1 }, { x: 0, y: 40, label: 'YZ', value: 0 }], outputs: [{ x: 80, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'or_b' },
      { id: 'or_c', type: 'OR3', x: 750, y: 300, width: 80, height: 50, label: 'c', inputs: [{ x: 0, y: 10, label: 'X', value: 0 }, { x: 0, y: 25, label: '!Y', value: 1 }, { x: 0, y: 40, label: 'Z', value: 0 }], outputs: [{ x: 80, y: 25, label: 'Y', value: 1, name: 'y' }], name: 'or_c' },
      { id: 'or_d', type: 'OR5', x: 750, y: 400, width: 80, height: 75, label: 'd', inputs: [{ x: 0, y: 10, label: 'W', value: 0 }, { x: 0, y: 25, label: '6', value: 1 }, { x: 0, y: 40, label: '4', value: 0 }, { x: 0, y: 55, label: '5', value: 0 }, { x: 0, y: 70, label: '7', value: 0 }], outputs: [{ x: 80, y: 37, label: 'Y', value: 1, name: 'y' }], name: 'or_d' },
      { id: 'or_e', type: 'OR', x: 750, y: 520, width: 80, height: 40, label: 'e', inputs: [{ x: 0, y: 10, label: '6', value: 1 }, { x: 0, y: 30, label: '5', value: 0 }], outputs: [{ x: 80, y: 20, label: 'Y', value: 1, name: 'y' }], name: 'or_e' },
      { id: 'or_f', type: 'OR4', x: 750, y: 620, width: 80, height: 60, label: 'f', inputs: [{ x: 0, y: 10, label: 'W', value: 0 }, { x: 0, y: 25, label: '8', value: 0 }, { x: 0, y: 40, label: '9', value: 0 }, { x: 0, y: 55, label: '6', value: 1 }], outputs: [{ x: 80, y: 30, label: 'Y', value: 1, name: 'y' }], name: 'or_f' },
      { id: 'or_g', type: 'OR3', x: 750, y: 740, width: 80, height: 50, label: 'g', inputs: [{ x: 0, y: 10, label: 'W', value: 0 }, { x: 0, y: 25, label: '8', value: 0 }, { x: 0, y: 40, label: '4', value: 0 }], outputs: [{ x: 80, y: 25, label: 'Y', value: 0, name: 'y' }], name: 'or_g' },

      // Outputs
      { id: 'out_a', type: 'OutPutL', x: 950, y: 115, width: 60, height: 30, label: 'a', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_a', color: '#3b82f6' },
      { id: 'out_b', type: 'OutPutL', x: 950, y: 210, width: 60, height: 30, label: 'b', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_b', color: '#3b82f6' },
      { id: 'out_c', type: 'OutPutL', x: 950, y: 310, width: 60, height: 30, label: 'c', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_c', color: '#3b82f6' },
      { id: 'out_d', type: 'OutPutL', x: 950, y: 422, width: 60, height: 30, label: 'd', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_d', color: '#3b82f6' },
      { id: 'out_e', type: 'OutPutL', x: 950, y: 525, width: 60, height: 30, label: 'e', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_e', color: '#3b82f6' },
      { id: 'out_f', type: 'OutPutL', x: 950, y: 635, width: 60, height: 30, label: 'f', inputs: [{ x: 30, y: 15, label: 'In', value: 1, name: 'in' }], outputs: [], name: 'out_f', color: '#3b82f6' },
      { id: 'out_g', type: 'OutPutL', x: 950, y: 750, width: 60, height: 30, label: 'g', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'out_g', color: '#3b82f6' },

      // Display
      { id: 'disp', type: 'Display', x: 1100, y: 250, width: 100, height: 300, label: '7-Seg Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp', color: 'gray' },
    ] as Shape[],
    connectors: [
      // Input to NOTs
      { id: 'c_nx', startShapeId: 'in_x', endShapeId: 'not_x', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ny', startShapeId: 'in_y', endShapeId: 'not_y', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_nz', startShapeId: 'in_z', endShapeId: 'not_z', startOutputIndex: 0, endInputIndex: 0 },

      // AND Gate Connections
      { id: 'c_a1_x', startShapeId: 'in_x', endShapeId: 'and1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a1_z', startShapeId: 'in_z', endShapeId: 'and1', startOutputIndex: 0, endInputIndex: 1 },
      
      { id: 'c_a2_nx', startShapeId: 'not_x', endShapeId: 'and2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a2_nz', startShapeId: 'not_z', endShapeId: 'and2', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a3_ny', startShapeId: 'not_y', endShapeId: 'and3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a3_nz', startShapeId: 'not_z', endShapeId: 'and3', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a4_nx', startShapeId: 'not_x', endShapeId: 'and4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a4_y', startShapeId: 'in_y', endShapeId: 'and4', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a5_y', startShapeId: 'in_y', endShapeId: 'and5', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a5_nz', startShapeId: 'not_z', endShapeId: 'and5', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a6_nx', startShapeId: 'not_x', endShapeId: 'and6', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a6_nz', startShapeId: 'not_z', endShapeId: 'and6', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a7_x', startShapeId: 'in_x', endShapeId: 'and7', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a7_ny', startShapeId: 'not_y', endShapeId: 'and7', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_a7_z', startShapeId: 'in_z', endShapeId: 'and7', startOutputIndex: 0, endInputIndex: 2 },

      { id: 'c_a8_x', startShapeId: 'in_x', endShapeId: 'and8', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a8_ny', startShapeId: 'not_y', endShapeId: 'and8', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_a9_x', startShapeId: 'in_x', endShapeId: 'and9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_a9_nz', startShapeId: 'not_z', endShapeId: 'and9', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_ayz_y', startShapeId: 'in_y', endShapeId: 'and_yz', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ayz_z', startShapeId: 'in_z', endShapeId: 'and_yz', startOutputIndex: 0, endInputIndex: 1 },

      // OR Gate Connections
      { id: 'c_ora_w', startShapeId: 'in_w', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ora_y', startShapeId: 'in_y', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_ora_1', startShapeId: 'and1', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_ora_2', startShapeId: 'and2', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 3 },

      { id: 'c_orb_nx', startShapeId: 'not_x', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_orb_3', startShapeId: 'and3', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_orb_yz', startShapeId: 'and_yz', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 2 },

      { id: 'c_orc_x', startShapeId: 'in_x', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_orc_ny', startShapeId: 'not_y', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_orc_z', startShapeId: 'in_z', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 2 },

      { id: 'c_ord_w', startShapeId: 'in_w', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ord_6', startShapeId: 'and6', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_ord_4', startShapeId: 'and4', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_ord_5', startShapeId: 'and5', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_ord_7', startShapeId: 'and7', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 4 },

      { id: 'c_ore_6', startShapeId: 'and6', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ore_5', startShapeId: 'and5', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'c_orf_w', startShapeId: 'in_w', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_orf_8', startShapeId: 'and8', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_orf_9', startShapeId: 'and9', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_orf_6', startShapeId: 'and6', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 3 },

      { id: 'c_org_w', startShapeId: 'in_w', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_org_8', startShapeId: 'and8', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_org_4', startShapeId: 'and4', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 2 },

      // OR to Output LEDs
      { id: 'c_oa', startShapeId: 'or_a', endShapeId: 'out_a', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_ob', startShapeId: 'or_b', endShapeId: 'out_b', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_oc', startShapeId: 'or_c', endShapeId: 'out_c', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_od', startShapeId: 'or_d', endShapeId: 'out_d', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_oe', startShapeId: 'or_e', endShapeId: 'out_e', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_of', startShapeId: 'or_f', endShapeId: 'out_f', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_og', startShapeId: 'or_g', endShapeId: 'out_g', startOutputIndex: 0, endInputIndex: 0 },

      // Output to Display
      { id: 'cd1', startShapeId: 'out_a', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd2', startShapeId: 'out_b', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cd3', startShapeId: 'out_c', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cd4', startShapeId: 'out_d', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cd5', startShapeId: 'out_e', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cd6', startShapeId: 'out_f', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cd7', startShapeId: 'out_g', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 6 },
    ]
  },
  'Countdown (9-0)': {
    fileName: 'Countdown 9-0',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: 'Countdown (9-0) using 74LS192', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Contador regresivo que inicia en 9 y desciende hasta 0 usando el chip 74LS192.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 1 },
      { id: 'high', type: 'HighConstant', x: 50, y: 180, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 240, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'cnt', type: 'IC74192', x: 200, y: 100, width: 120, height: 180, label: '74LS192', inputs: [{ x: 0, y: 15, label: 'UP' }, { x: 0, y: 35, label: 'DN' }, { x: 0, y: 55, label: 'PL' }, { x: 0, y: 75, label: 'MR' }, { x: 0, y: 95, label: 'D0' }, { x: 0, y: 115, label: 'D1' }, { x: 0, y: 135, label: 'D2' }, { x: 0, y: 155, label: 'D3' }], outputs: [{ x: 120, y: 25, label: 'Q0' }, { x: 120, y: 50, label: 'Q1' }, { x: 120, y: 75, label: 'Q2' }, { x: 120, y: 100, label: 'Q3' }, { x: 120, y: 130, label: 'TCU' }, { x: 120, y: 155, label: 'TCD' }], name: 'cnt' },
      { id: 'dec', type: 'IC7447', x: 400, y: 100, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec' },
      { id: 'disp', type: 'Display', x: 600, y: 100, width: 100, height: 180, label: 'Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk_dn', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_high_up', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_high_pl', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_mr', startShapeId: 'low', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_q0_a', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q1_b', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_q2_c', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_q3_d', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_dec_disp_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'Binary Counter (0-15)': {
    fileName: 'Binary Counter 0-15',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: 'Binary Counter (0-15) using 74LS93', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Contador binario de 4 bits que muestra valores del 0 al 15 en formato binario y BCD.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 1 },
      { id: 'low', type: 'LowConstant', x: 50, y: 180, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'cnt', type: 'IC7493', x: 200, y: 100, width: 120, height: 120, label: '74LS93', inputs: [{ x: 0, y: 15, label: 'CKA' }, { x: 0, y: 35, label: 'CKB' }, { x: 0, y: 55, label: 'R01' }, { x: 0, y: 75, label: 'R02' }], outputs: [{ x: 120, y: 25, label: 'QA' }, { x: 120, y: 45, label: 'QB' }, { x: 120, y: 65, label: 'QC' }, { x: 120, y: 85, label: 'QD' }], name: 'cnt' },
      { id: 'disp', type: 'DisplayBCD', x: 400, y: 100, width: 100, height: 180, label: 'Display', inputs: [{ x: 0, y: 20, label: 'A' }, { x: 0, y: 60, label: 'B' }, { x: 0, y: 100, label: 'C' }, { x: 0, y: 140, label: 'D' }], outputs: [], name: 'disp' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk_cka', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_qa_ckb', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_low_r1', startShapeId: 'low', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_r2', startShapeId: 'low', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_qa_da', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_qb_db', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_qc_dc', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_qd_dd', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'Decade Counter (0-99)': {
    fileName: 'Decade Counter 0-99',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: 'Decade Counter (0-99) using 74LS90', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Contador de dos dígitos (0-99) utilizando dos etapas de contadores de décadas 74LS90.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 2 },
      { id: 'low', type: 'LowConstant', x: 50, y: 180, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      
      // Units
      { id: 'u_cnt', type: 'IC7490', x: 200, y: 100, width: 120, height: 180, label: 'Units (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 'u_cnt' },
      { id: 'u_dec', type: 'IC7447', x: 200, y: 300, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u_dec' },
      { id: 'u_disp', type: 'Display', x: 200, y: 500, width: 100, height: 180, label: 'Units Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u_disp' },

      // Tens
      { id: 't_cnt', type: 'IC7490', x: 400, y: 100, width: 120, height: 180, label: 'Tens (7490)', inputs: [{ x: 0, y: 15, label: 'CP0' }, { x: 0, y: 40, label: 'CP1' }, { x: 0, y: 65, label: 'MR1' }, { x: 0, y: 90, label: 'MR2' }, { x: 0, y: 115, label: 'MS1' }, { x: 0, y: 140, label: 'MS2' }], outputs: [{ x: 120, y: 15, label: 'Q0' }, { x: 120, y: 40, label: 'Q1' }, { x: 120, y: 65, label: 'Q2' }, { x: 120, y: 90, label: 'Q3' }], name: 't_cnt' },
      { id: 't_dec', type: 'IC7447', x: 400, y: 300, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 't_dec' },
      { id: 't_disp', type: 'Display', x: 400, y: 500, width: 100, height: 180, label: 'Tens Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 't_disp' },
    ] as Shape[],
    connectors: [
      // Units Logic
      { id: 'c_clk_ucp0', startShapeId: 'clk', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_uq0_ucp1', startShapeId: 'u_cnt', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_low_umr1', startShapeId: 'low', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_umr2', startShapeId: 'low', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_low_ums1', startShapeId: 'low', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c_low_ums2', startShapeId: 'low', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c_uq0_ua', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_uq1_ub', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_uq2_uc', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_uq3_ud', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_udec_udisp_${i}`, startShapeId: 'u_dec', endShapeId: 'u_disp', startOutputIndex: i, endInputIndex: i })),

      // Tens Logic
      { id: 'c_uq3_tcp0', startShapeId: 'u_cnt', endShapeId: 't_cnt', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c_tq0_tcp1', startShapeId: 't_cnt', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_low_tmr1', startShapeId: 'low', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_tmr2', startShapeId: 'low', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_low_tms1', startShapeId: 'low', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c_low_tms2', startShapeId: 'low', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c_tq0_ta', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_tq1_tb', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_tq2_tc', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_tq3_td', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_tdec_tdisp_${i}`, startShapeId: 't_dec', endShapeId: 't_disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'Decade Counter (0-99) Alt': {
    fileName: 'Decade Counter 0-99 Alt',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: 'Decade Counter (0-99) using 74LS192', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Versión alternativa del contador 0-99 utilizando chips 74LS192 con capacidad de carga.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 2 },
      { id: 'high', type: 'HighConstant', x: 50, y: 180, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 240, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      
      // Units
      { id: 'u_cnt', type: 'IC74192', x: 200, y: 100, width: 120, height: 180, label: 'Units (74192)', inputs: [{ x: 0, y: 15, label: 'UP' }, { x: 0, y: 35, label: 'DN' }, { x: 0, y: 55, label: 'PL' }, { x: 0, y: 75, label: 'MR' }, { x: 0, y: 95, label: 'D0' }, { x: 0, y: 115, label: 'D1' }, { x: 0, y: 135, label: 'D2' }, { x: 0, y: 155, label: 'D3' }], outputs: [{ x: 120, y: 25, label: 'Q0' }, { x: 120, y: 50, label: 'Q1' }, { x: 120, y: 75, label: 'Q2' }, { x: 120, y: 100, label: 'Q3' }, { x: 120, y: 130, label: 'TCU' }, { x: 120, y: 155, label: 'TCD' }], name: 'u_cnt' },
      { id: 'u_dec', type: 'IC7447', x: 200, y: 300, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'u_dec' },
      { id: 'u_disp', type: 'Display', x: 200, y: 500, width: 100, height: 180, label: 'Units Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'u_disp' },

      // Tens
      { id: 't_cnt', type: 'IC74192', x: 400, y: 100, width: 120, height: 180, label: 'Tens (74192)', inputs: [{ x: 0, y: 15, label: 'UP' }, { x: 0, y: 35, label: 'DN' }, { x: 0, y: 55, label: 'PL' }, { x: 0, y: 75, label: 'MR' }, { x: 0, y: 95, label: 'D0' }, { x: 0, y: 115, label: 'D1' }, { x: 0, y: 135, label: 'D2' }, { x: 0, y: 155, label: 'D3' }], outputs: [{ x: 120, y: 25, label: 'Q0' }, { x: 120, y: 50, label: 'Q1' }, { x: 120, y: 75, label: 'Q2' }, { x: 120, y: 100, label: 'Q3' }, { x: 120, y: 130, label: 'TCU' }, { x: 120, y: 155, label: 'TCD' }], name: 't_cnt' },
      { id: 't_dec', type: 'IC7447', x: 400, y: 300, width: 120, height: 180, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 40, label: 'B' }, { x: 0, y: 65, label: 'C' }, { x: 0, y: 90, label: 'D' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 't_dec' },
      { id: 't_disp', type: 'Display', x: 400, y: 500, width: 100, height: 180, label: 'Tens Display', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 't_disp' },
    ] as Shape[],
    connectors: [
      // Units Logic
      { id: 'c_clk_uup', startShapeId: 'clk', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_high_udn', startShapeId: 'high', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_high_upl', startShapeId: 'high', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_umr', startShapeId: 'low', endShapeId: 'u_cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_uq0_ua', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_uq1_ub', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_uq2_uc', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_uq3_ud', startShapeId: 'u_cnt', endShapeId: 'u_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_udec_udisp_${i}`, startShapeId: 'u_dec', endShapeId: 'u_disp', startOutputIndex: i, endInputIndex: i })),

      // Tens Logic
      { id: 'c_utcu_tup', startShapeId: 'u_cnt', endShapeId: 't_cnt', startOutputIndex: 4, endInputIndex: 0 },
      { id: 'c_high_tdn', startShapeId: 'high', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_high_tpl', startShapeId: 'high', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_low_tmr', startShapeId: 'low', endShapeId: 't_cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_tq0_ta', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_tq1_tb', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_tq2_tc', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_tq3_td', startShapeId: 't_cnt', endShapeId: 't_dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_tdec_tdisp_${i}`, startShapeId: 't_dec', endShapeId: 't_disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '74161: Basic 4-Bit Counter': {
    fileName: '74161 Basic Counter',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74161: Basic 4-Bit Binary Counter', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Contador binario sincrónico de 4 bits con funciones de carga y limpieza.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 1 },
      { id: 'high', type: 'HighConstant', x: 50, y: 180, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'cnt', type: 'IC74161', x: 200, y: 100, width: 120, height: 220, label: '74LS161', inputs: [{ x: 0, y: 15, label: 'CLK' }, { x: 0, y: 35, label: 'CLR' }, { x: 0, y: 55, label: 'LD' }, { x: 0, y: 75, label: 'ENP' }, { x: 0, y: 95, label: 'ENT' }, { x: 0, y: 115, label: 'D0' }, { x: 0, y: 135, label: 'D1' }, { x: 0, y: 155, label: 'D2' }, { x: 0, y: 175, label: 'D3' }], outputs: [{ x: 120, y: 25, label: 'Q0' }, { x: 120, y: 65, label: 'Q1' }, { x: 120, y: 105, label: 'Q2' }, { x: 120, y: 145, label: 'Q3' }, { x: 120, y: 185, label: 'RCO' }], name: 'cnt' },
      { id: 'led0', type: 'OutPutL', x: 400, y: 80, width: 40, height: 40, label: 'Q0', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: 'led0' },
      { id: 'led1', type: 'OutPutL', x: 400, y: 130, width: 40, height: 40, label: 'Q1', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: 'led1' },
      { id: 'led2', type: 'OutPutL', x: 400, y: 180, width: 40, height: 40, label: 'Q2', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: 'led2' },
      { id: 'led3', type: 'OutPutL', x: 400, y: 230, width: 40, height: 40, label: 'Q3', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: 'led3' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6', startShapeId: 'cnt', endShapeId: 'led0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'cnt', endShapeId: 'led1', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'cnt', endShapeId: 'led2', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c9', startShapeId: 'cnt', endShapeId: 'led3', startOutputIndex: 3, endInputIndex: 0 },
    ]
  },
  '74161: Modulo-10 Counter': {
    fileName: '74161 Mod-10',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74161: Modulo-10 Counter (0-9)', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Configuración del 74161 para contar solo hasta 9 y reiniciarse, formando un contador de décadas.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 2 },
      { id: 'high', type: 'HighConstant', x: 50, y: 180, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'cnt', type: 'IC74161', x: 200, y: 100, width: 120, height: 220, label: '74LS161', inputs: [{ x: 0, y: 15, label: 'CLK' }, { x: 0, y: 35, label: 'CLR' }, { x: 0, y: 55, label: 'LD' }, { x: 0, y: 75, label: 'ENP' }, { x: 0, y: 95, label: 'ENT' }, { x: 0, y: 115, label: 'D0' }, { x: 0, y: 135, label: 'D1' }, { x: 0, y: 155, label: 'D2' }, { x: 0, y: 175, label: 'D3' }], outputs: [{ x: 120, y: 25, label: 'Q0' }, { x: 120, y: 65, label: 'Q1' }, { x: 120, y: 105, label: 'Q2' }, { x: 120, y: 145, label: 'Q3' }, { x: 120, y: 185, label: 'RCO' }], name: 'cnt' },
      { id: 'nand', type: 'NAND', x: 400, y: 150, width: 60, height: 40, label: 'Reset Logic', inputs: [{ x: 0, y: 10, label: 'Q1' }, { x: 0, y: 30, label: 'Q3' }], outputs: [{ x: 60, y: 20, label: 'CLR' }], name: 'nand' },
      { id: 'disp', type: 'DisplayBCD', x: 550, y: 100, width: 100, height: 180, label: 'Display', inputs: [{ x: 0, y: 15, label: 'D0' }, { x: 0, y: 35, label: 'D1' }, { x: 0, y: 55, label: 'D2' }, { x: 0, y: 75, label: 'D3' }], outputs: [], name: 'disp' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'nand', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6', startShapeId: 'cnt', endShapeId: 'nand', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'cnt', endShapeId: 'nand', startOutputIndex: 3, endInputIndex: 1 },
      { id: 'c8', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c9', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c10', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c11', startShapeId: 'cnt', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '74138: 3-to-8 Decoder Demo': {
    fileName: '74138 Decoder',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74138: 3-to-8 Decoder Demo', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Decodificador que activa una de sus 8 salidas basándose en una dirección de 3 bits.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'sw0', type: 'ToggleSwitch', x: 50, y: 80, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw0' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 140, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 200, width: 80, height: 40, label: 'C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw2' },
      { id: 'high', type: 'HighConstant', x: 50, y: 260, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 320, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'dec', type: 'IC74138', x: 200, y: 100, width: 120, height: 180, label: '74LS138', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 35, label: 'B' }, { x: 0, y: 55, label: 'C' }, { x: 0, y: 75, label: 'G1' }, { x: 0, y: 95, label: 'G2A' }, { x: 0, y: 115, label: 'G2B' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Y${i}` })), name: 'dec' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led${i}`, type: 'OutPutL', x: 400, y: 50 + i * 40, width: 30, height: 30, label: `Y${i}`, inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: `led${i}` })),
    ] as Shape[],
    connectors: [
      { id: 'c0', startShapeId: 'sw0', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'high', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c4', startShapeId: 'low', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c5', startShapeId: 'low', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 5 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl${i}`, startShapeId: 'dec', endShapeId: `led${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '74138: 2-to-4 Decoder': {
    fileName: '74138 2-to-4',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74138: 2-to-4 Decoder with Enable', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Uso parcial del 74138 para decodificar 2 bits en 4 salidas, ideal para selección de periféricos.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'swA', type: 'ToggleSwitch', x: 50, y: 80, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swA' },
      { id: 'swB', type: 'ToggleSwitch', x: 50, y: 140, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swB' },
      { id: 'swE', type: 'ToggleSwitch', x: 50, y: 200, width: 80, height: 40, label: 'Enable', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swE' },
      { id: 'low', type: 'LowConstant', x: 50, y: 260, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'dec', type: 'IC74138', x: 200, y: 100, width: 120, height: 180, label: '74LS138', inputs: [{ x: 0, y: 15, label: 'A' }, { x: 0, y: 35, label: 'B' }, { x: 0, y: 55, label: 'C' }, { x: 0, y: 75, label: 'G1' }, { x: 0, y: 95, label: 'G2A' }, { x: 0, y: 115, label: 'G2B' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Y${i}` })), name: 'dec' },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `led${i}`, type: 'OutPutL', x: 400, y: 80 + i * 50, width: 40, height: 40, label: `Y${i}`, inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: `led${i}` })),
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'swA', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'swB', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'low', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'swE', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'low', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6', startShapeId: 'low', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 5 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cl${i}`, startShapeId: 'dec', endShapeId: `led${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '74153: Dual 4-to-1 Mux Demo': {
    fileName: '74153 Mux',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74153: Dual 4-to-1 Mux Demo', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Selector de datos dual que permite elegir una de cuatro entradas para cada salida.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `sw${i}`, type: 'ToggleSwitch', x: 50, y: 80 + i * 50, width: 80, height: 40, label: `D${i}`, inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: `sw${i}` })),
      { id: 'swA', type: 'ToggleSwitch', x: 50, y: 300, width: 80, height: 40, label: 'Select A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swA' },
      { id: 'swB', type: 'ToggleSwitch', x: 50, y: 360, width: 80, height: 40, label: 'Select B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swB' },
      { id: 'low', type: 'LowConstant', x: 50, y: 420, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'mux', type: 'IC74153', x: 250, y: 100, width: 120, height: 260, label: '74LS153', inputs: [...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `1D${i}` })), { x: 0, y: 95, label: '1G' }, ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 115 + i * 20, label: `2D${i}` })), { x: 0, y: 195, label: '2G' }, { x: 0, y: 215, label: 'A' }, { x: 0, y: 235, label: 'B' }], outputs: [{ x: 120, y: 25, label: '1Y' }, { x: 120, y: 125, label: '2Y' }], name: 'mux' },
      { id: 'led', type: 'OutPutL', x: 450, y: 100, width: 50, height: 50, label: 'Output Y', inputs: [{ x: 0, y: 25, label: 'In' }], outputs: [], name: 'led' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c${i}`, startShapeId: `sw${i}`, endShapeId: 'mux', startOutputIndex: 0, endInputIndex: i })),
      { id: 'c4', startShapeId: 'low', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c5', startShapeId: 'swA', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c6', startShapeId: 'swB', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'c7', startShapeId: 'mux', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '74153: XOR Implementation': {
    fileName: '74153 XOR',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74153: XOR Gate Implementation', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Demostración de cómo implementar funciones lógicas complejas usando un multiplexor.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'swA', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'Input A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swA' },
      { id: 'swB', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'Input B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swB' },
      { id: 'high', type: 'HighConstant', x: 50, y: 220, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 280, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'mux', type: 'IC74153', x: 250, y: 100, width: 120, height: 260, label: '74LS153', inputs: [...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `1D${i}` })), { x: 0, y: 95, label: '1G' }, ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 115 + i * 20, label: `2D${i}` })), { x: 0, y: 195, label: '2G' }, { x: 0, y: 215, label: 'A' }, { x: 0, y: 235, label: 'B' }], outputs: [{ x: 120, y: 25, label: '1Y' }, { x: 120, y: 125, label: '2Y' }], name: 'mux' },
      { id: 'led', type: 'OutPutL', x: 450, y: 100, width: 50, height: 50, label: 'A XOR B', inputs: [{ x: 0, y: 25, label: 'In' }], outputs: [], name: 'led' },
    ] as Shape[],
    connectors: [
      { id: 'c0', startShapeId: 'low', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 0 }, // D0=0
      { id: 'c1', startShapeId: 'high', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 1 }, // D1=1
      { id: 'c2', startShapeId: 'high', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 2 }, // D2=1
      { id: 'c3', startShapeId: 'low', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 3 }, // D3=0
      { id: 'c4', startShapeId: 'low', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 4 }, // G=0
      { id: 'c5', startShapeId: 'swA', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 10 }, // Select A
      { id: 'c6', startShapeId: 'swB', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 11 }, // Select B
      { id: 'c7', startShapeId: 'mux', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '74HC595: 8-Bit Serial-to-Parallel': {
    fileName: '74HC595 Serial-Parallel',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74HC595: 8-Bit Serial-to-Parallel', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Registro de desplazamiento que convierte datos serie en paralelo, ahorrando pines de salida.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'swData', type: 'ToggleSwitch', x: 50, y: 80, width: 80, height: 40, label: 'Data (DS)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swData' },
      { id: 'swClk', type: 'PushButton', x: 50, y: 140, width: 80, height: 40, label: 'Shift (SHCP)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swClk' },
      { id: 'swLatch', type: 'PushButton', x: 50, y: 200, width: 80, height: 40, label: 'Latch (STCP)', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swLatch' },
      { id: 'high', type: 'HighConstant', x: 50, y: 260, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 320, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'sr', type: 'IC74HC595', x: 200, y: 100, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS' }, { x: 0, y: 35, label: 'SHCP' }, { x: 0, y: 55, label: 'STCP' }, { x: 0, y: 75, label: 'OE' }, { x: 0, y: 95, label: 'MR' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}` })), name: 'sr' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led${i}`, type: 'OutPutL', x: 400, y: 50 + i * 40, width: 30, height: 30, label: `Q${i}`, inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: `led${i}` })),
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'swData', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'swClk', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'swLatch', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'low', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 4 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl${i}`, startShapeId: 'sr', endShapeId: `led${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },
  '74HC595: Running Light': {
    fileName: '74HC595 Running Light',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 400, height: 40, label: '74HC595: Running Light Effect', inputs: [], outputs: [], name: 'title', color: '#000000', font: 'bold 18px Inter' },
      { id: 'desc', type: 'Text', x: 50, y: 45, width: 600, height: 30, label: 'Efecto de luces secuenciales creado desplazando un bit a través del registro 74HC595.', inputs: [], outputs: [], name: 'desc', color: '#4b5563', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', frequency: 2 },
      { id: 'swData', type: 'ToggleSwitch', x: 50, y: 180, width: 80, height: 40, label: 'Data In', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'swData' },
      { id: 'high', type: 'HighConstant', x: 50, y: 260, width: 40, height: 40, label: '1', inputs: [], outputs: [{ x: 40, y: 20, label: '1' }], name: 'high' },
      { id: 'low', type: 'LowConstant', x: 50, y: 320, width: 40, height: 40, label: '0', inputs: [], outputs: [{ x: 40, y: 20, label: '0' }], name: 'low' },
      { id: 'sr', type: 'IC74HC595', x: 200, y: 100, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS' }, { x: 0, y: 35, label: 'SHCP' }, { x: 0, y: 55, label: 'STCP' }, { x: 0, y: 75, label: 'OE' }, { x: 0, y: 95, label: 'MR' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}` })), name: 'sr' },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `led${i}`, type: 'OutPutL', x: 400, y: 50 + i * 40, width: 30, height: 30, label: `Q${i}`, inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: `led${i}` })),
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'swData', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'clk', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'low', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c5', startShapeId: 'high', endShapeId: 'sr', startOutputIndex: 0, endInputIndex: 4 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `cl${i}`, startShapeId: 'sr', endShapeId: `led${i}`, startOutputIndex: i, endInputIndex: 0 })),
    ]
  },

  'Transistor Switch (NPN)': {
    fileName: 'Transistor Switch',
    shapes: [
      { id: 'bat', type: 'Battery', x: 50, y: 150, width: 60, height: 50, label: '9V Battery', inputs: [], outputs: [{ x: 60, y: 15, label: '+', value: 1, name: 'pos' }, { x: 60, y: 35, label: '-', value: 0, name: 'neg' }], name: 'bat' },
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: 'Switch', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'res', type: 'Resistor', x: 200, y: 50, width: 60, height: 50, label: '1kΩ', inputs: [{ x: 0, y: 25, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 25, label: '2', value: 0, name: 'p2' }], name: 'res' },
      { id: 'q1', type: 'Transistor_NPN', x: 300, y: 100, width: 60, height: 60, label: '2N2222', inputs: [{ x: 0, y: 25, label: 'B', value: 0, name: 'base' }, { x: 30, y: 0, label: 'C', value: 0, name: 'collector' }], outputs: [{ x: 30, y: 60, label: 'E', value: 0, name: 'emitter' }], name: 'q1' },
      { id: 'led', type: 'LED', x: 450, y: 115, width: 60, height: 50, label: 'LED', inputs: [{ x: 0, y: 25, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 25, label: '2', value: 0, name: 'p2' }], name: 'led' },
      { id: 'gnd', type: 'GND', x: 550, y: 125, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 30, y: 0, label: 'GND', value: 0, name: 'gnd' }], name: 'gnd' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 600, height: 50, label: 'Transistor Switch: The switch controls the base of the NPN transistor.\nWhen base is HIGH, current flows from Collector to Emitter, lighting the LED.', inputs: [], outputs: [], name: 'desc', color: '#eab308', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'res', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'res', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'bat', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'q1', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'led', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Relay Control Circuit': {
    fileName: 'Relay Control',
    shapes: [
      { id: 'bat1', type: 'Battery', x: 50, y: 50, width: 60, height: 50, label: '5V Bat', inputs: [], outputs: [{ x: 60, y: 15, label: '+', value: 1, name: 'pos' }, { x: 60, y: 35, label: '-', value: 0, name: 'neg' }], name: 'bat1' },
      { id: 'sw', type: 'PushButton', x: 150, y: 50, width: 100, height: 50, label: 'Activate', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw' },
      { id: 'relay', type: 'Relay', x: 300, y: 50, width: 100, height: 90, label: 'Relay', inputs: [{ x: 0, y: 15, label: 'C1', value: 0, name: 'coil1' }, { x: 0, y: 45, label: 'C2', value: 0, name: 'coil2' }, { x: 0, y: 75, label: 'COM', value: 0, name: 'com' }], outputs: [{ x: 100, y: 30, label: 'NO', value: 0, name: 'no' }, { x: 100, y: 60, label: 'NC', value: 0, name: 'nc' }], name: 'relay' },
      { id: 'bat2', type: 'Battery', x: 150, y: 200, width: 60, height: 50, label: '12V Bat', inputs: [], outputs: [{ x: 60, y: 15, label: '+', value: 1, name: 'pos' }, { x: 60, y: 35, label: '-', value: 0, name: 'neg' }], name: 'bat2' },
      { id: 'motor', type: 'Motor', x: 450, y: 50, width: 100, height: 100, label: 'DC Motor', inputs: [{ x: 0, y: 50, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'motor' },
      { id: 'gnd1', type: 'GND', x: 300, y: 10, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 30, y: 0, label: 'GND', value: 0, name: 'gnd' }], name: 'gnd1' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 600, height: 50, label: 'Relay Control: A low-power circuit (5V) controls a high-power load (12V Motor).\nWhen the button is pressed, the relay coil activates, closing the NO contact.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'bat1', endShapeId: 'sw', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'gnd1', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'bat2', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c5', startShapeId: 'relay', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },

  'Potentiometer Control': {
    fileName: 'Pot Control',
    shapes: [
      { id: 'bat', type: 'Battery', x: 50, y: 100, width: 60, height: 50, label: '9V Bat', inputs: [], outputs: [{ x: 60, y: 15, label: '+', value: 1, name: 'pos' }, { x: 60, y: 35, label: '-', value: 0, name: 'neg' }], name: 'bat' },
      { id: 'pot', type: 'Potentiometer', x: 200, y: 100, width: 80, height: 50, label: '10kΩ Pot', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }, { x: 0, y: 40, label: '2', value: 0, name: 'p2' }], outputs: [{ x: 80, y: 25, label: 'W', value: 0, name: 'wiper' }], name: 'pot' },
      { id: 'led', type: 'LED', x: 350, y: 100, width: 60, height: 50, label: 'LED', inputs: [{ x: 0, y: 25, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 25, label: '2', value: 0, name: 'p2' }], name: 'led' },
      { id: 'gnd', type: 'GND', x: 500, y: 100, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 30, y: 0, label: 'GND', value: 0, name: 'gnd' }], name: 'gnd' },
      { id: 't1', type: 'Text', x: 50, y: 200, width: 600, height: 50, label: 'Potentiometer Control: In this digital simulation, the wiper is HIGH only if both ends are HIGH.\nUsed here to demonstrate basic connectivity.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'bat', endShapeId: 'pot', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'bat', endShapeId: 'pot', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'pot', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'led', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'NPN Transistor LED Driver': {
    fileName: 'NPN LED Driver',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '5V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC', value: 1, name: 'vcc' }], name: 'vcc' },
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'Control', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw' },
      { id: 'rb', type: 'Resistor', x: 150, y: 100, width: 60, height: 40, label: '10k', inputs: [{ x: 0, y: 20, label: '1' }], outputs: [{ x: 60, y: 20, label: '2' }], name: 'rb' },
      { id: 'q1', type: 'Transistor_NPN', x: 250, y: 100, width: 60, height: 60, label: 'NPN', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'C' }], outputs: [{ x: 30, y: 60, label: 'E' }], name: 'q1' },
      { id: 'led', type: 'LED', x: 235, y: 30, width: 40, height: 40, label: 'LED', inputs: [{ x: 20, y: 0, label: 'A' }], outputs: [{ x: 20, y: 40, label: 'K' }], name: 'led' },
      { id: 'rc', type: 'Resistor', x: 150, y: 30, width: 60, height: 40, label: '220', inputs: [{ x: 0, y: 20, label: '1' }], outputs: [{ x: 60, y: 20, label: '2' }], name: 'rc' },
      { id: 'gnd', type: 'GND', x: 265, y: 200, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'rc', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'rc', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'led', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'sw', endShapeId: 'rb', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'rb', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'q1', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'PNP Transistor Switch': {
    fileName: 'PNP Switch',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '5V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC', value: 1, name: 'vcc' }], name: 'vcc' },
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Control', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw' },
      { id: 'rb', type: 'Resistor', x: 150, y: 150, width: 60, height: 40, label: '10k', inputs: [{ x: 0, y: 20, label: '1' }], outputs: [{ x: 60, y: 20, label: '2' }], name: 'rb' },
      { id: 'q1', type: 'Transistor_PNP', x: 250, y: 50, width: 60, height: 60, label: 'PNP', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'E' }], outputs: [{ x: 30, y: 60, label: 'C' }], name: 'q1' },
      { id: 'led', type: 'LED', x: 235, y: 150, width: 40, height: 40, label: 'LED', inputs: [{ x: 20, y: 0, label: 'A' }], outputs: [{ x: 20, y: 40, label: 'K' }], name: 'led' },
      { id: 'rc', type: 'Resistor', x: 240, y: 220, width: 60, height: 40, label: '220', inputs: [{ x: 0, y: 20, label: '1' }], outputs: [{ x: 60, y: 20, label: '2' }], name: 'rc' },
      { id: 'gnd', type: 'GND', x: 255, y: 300, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'rb', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'rb', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'q1', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'led', endShapeId: 'rc', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'rc', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Relay Self-Latching': {
    fileName: 'Relay Latch',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '12V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC', value: 1, name: 'vcc' }], name: 'vcc' },
      { id: 'sw_start', type: 'PushButton', x: 50, y: 100, width: 80, height: 40, label: 'Start', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw_start' },
      { id: 'sw_stop', type: 'PushButton', x: 50, y: 160, width: 80, height: 40, label: 'Stop', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw_stop' },
      { id: 'relay', type: 'Relay', x: 250, y: 100, width: 100, height: 90, label: 'Relay', inputs: [{ x: 0, y: 15, label: 'C1' }, { x: 0, y: 45, label: 'C2' }, { x: 0, y: 75, label: 'COM' }], outputs: [{ x: 100, y: 30, label: 'NO' }, { x: 100, y: 60, label: 'NC' }], name: 'relay' },
      { id: 'led', type: 'OutPutL', x: 400, y: 115, width: 60, height: 30, label: 'Active', inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: 'led' },
      { id: 'gnd', type: 'GND', x: 285, y: 220, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'sw_start', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_start', endShapeId: 'sw_stop', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'sw_stop', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'relay', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'vcc', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'relay', endShapeId: 'sw_stop', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'relay', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'DC Motor with Flyback Diode': {
    fileName: 'Motor Protection',
    shapes: [
      { id: 'bat', type: 'Battery', x: 50, y: 100, width: 60, height: 50, label: '12V', inputs: [], outputs: [{ x: 60, y: 15, label: '+' }, { x: 60, y: 35, label: '-' }], name: 'bat' },
      { id: 'sw', type: 'ToggleSwitch', x: 150, y: 50, width: 80, height: 40, label: 'Motor SW', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw' },
      { id: 'motor', type: 'Motor', x: 300, y: 100, width: 80, height: 80, label: 'DC Motor', inputs: [{ x: 0, y: 40, label: 'In' }], outputs: [], name: 'motor' },
      { id: 'diode', type: 'Diode', x: 280, y: 50, width: 40, height: 30, label: '1N4007', inputs: [{ x: 0, y: 15, label: 'A' }], outputs: [{ x: 40, y: 15, label: 'K' }], name: 'diode' },
      { id: 'gnd', type: 'GND', x: 450, y: 140, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'bat', endShapeId: 'sw', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'sw', endShapeId: 'diode', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'diode', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'motor', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Voltage Divider with Potentiometer': {
    fileName: 'Voltage Divider',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '10V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC' }], name: 'vcc' },
      { id: 'pot', type: 'Potentiometer', x: 150, y: 50, width: 80, height: 50, label: '10k Pot', inputs: [{ x: 0, y: 10, label: '1' }, { x: 0, y: 40, label: '2' }], outputs: [{ x: 80, y: 25, label: 'W' }], name: 'pot' },
      { id: 'scope', type: 'Oscilloscope', x: 300, y: 50, width: 150, height: 100, label: 'V-Out', inputs: [{ x: 0, y: 50, label: 'In' }], outputs: [], name: 'scope' },
      { id: 'gnd', type: 'GND', x: 175, y: 150, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'pot', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'gnd', endShapeId: 'pot', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'pot', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Transistor AND Gate (Discrete)': {
    fileName: 'Discrete AND',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '5V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC' }], name: 'vcc' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw2' },
      { id: 'q1', type: 'Transistor_NPN', x: 200, y: 100, width: 60, height: 60, label: 'Q1', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'C' }], outputs: [{ x: 30, y: 60, label: 'E' }], name: 'q1' },
      { id: 'q2', type: 'Transistor_NPN', x: 200, y: 180, width: 60, height: 60, label: 'Q2', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'C' }], outputs: [{ x: 30, y: 60, label: 'E' }], name: 'q2' },
      { id: 'led', type: 'OutPutL', x: 350, y: 200, width: 60, height: 30, label: 'Y', inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: 'led' },
      { id: 'gnd', type: 'GND', x: 215, y: 260, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw1', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'q1', endShapeId: 'q2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'sw2', endShapeId: 'q2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'q2', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'q2', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Transistor OR Gate (Discrete)': {
    fileName: 'Discrete OR',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: '5V', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC' }], name: 'vcc' },
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw1' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out' }], name: 'sw2' },
      { id: 'q1', type: 'Transistor_NPN', x: 200, y: 80, width: 60, height: 60, label: 'Q1', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'C' }], outputs: [{ x: 30, y: 60, label: 'E' }], name: 'q1' },
      { id: 'q2', type: 'Transistor_NPN', x: 200, y: 160, width: 60, height: 60, label: 'Q2', inputs: [{ x: 0, y: 25, label: 'B' }, { x: 30, y: 0, label: 'C' }], outputs: [{ x: 30, y: 60, label: 'E' }], name: 'q2' },
      { id: 'led', type: 'OutPutL', x: 350, y: 130, width: 60, height: 30, label: 'Y', inputs: [{ x: 0, y: 15, label: 'In' }], outputs: [], name: 'led' },
      { id: 'gnd', type: 'GND', x: 215, y: 260, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'vcc', endShapeId: 'q2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'sw1', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw2', endShapeId: 'q2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'q1', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'q2', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'q1', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'q2', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Battery Charger Indicator': {
    fileName: 'Charger Indicator',
    shapes: [
      { id: 'bat', type: 'Battery', x: 50, y: 100, width: 60, height: 50, label: 'Battery', inputs: [{ x: 0, y: 15, label: 'CHG' }], outputs: [{ x: 60, y: 15, label: '+' }, { x: 60, y: 35, label: '-' }], name: 'bat' },
      { id: 'vcc', type: 'VCC', x: 50, y: 30, width: 30, height: 30, label: 'Charger', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC' }], name: 'vcc' },
      { id: 'diode', type: 'Diode', x: 150, y: 30, width: 40, height: 30, label: '1N4001', inputs: [{ x: 0, y: 15, label: 'A' }], outputs: [{ x: 40, y: 15, label: 'K' }], name: 'diode' },
      { id: 'led', type: 'LED', x: 250, y: 30, width: 40, height: 40, label: 'Charging', inputs: [{ x: 0, y: 20, label: 'A' }], outputs: [{ x: 40, y: 20, label: 'K' }], name: 'led' },
      { id: 'res', type: 'Resistor', x: 350, y: 30, width: 60, height: 40, label: '1k', inputs: [{ x: 0, y: 20, label: '1' }], outputs: [{ x: 60, y: 20, label: '2' }], name: 'res' },
      { id: 'gnd', type: 'GND', x: 450, y: 100, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'diode', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'diode', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'led', endShapeId: 'res', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'res', endShapeId: 'bat', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'bat', endShapeId: 'gnd', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'Emergency Light Circuit': {
    fileName: 'Emergency Light',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 50, width: 30, height: 30, label: 'Mains', inputs: [], outputs: [{ x: 15, y: 30, label: 'VCC' }], name: 'vcc' },
      { id: 'relay', type: 'Relay', x: 200, y: 50, width: 100, height: 90, label: 'Relay', inputs: [{ x: 0, y: 15, label: 'C1' }, { x: 0, y: 45, label: 'C2' }, { x: 0, y: 75, label: 'COM' }], outputs: [{ x: 100, y: 30, label: 'NO' }, { x: 100, y: 60, label: 'NC' }], name: 'relay' },
      { id: 'bat', type: 'Battery', x: 50, y: 150, width: 60, height: 50, label: 'Backup', inputs: [], outputs: [{ x: 60, y: 15, label: '+' }], name: 'bat' },
      { id: 'led', type: 'OutPutL', x: 400, y: 100, width: 80, height: 40, label: 'Emergency LED', inputs: [{ x: 0, y: 20, label: 'In' }], outputs: [], name: 'led' },
      { id: 'gnd', type: 'GND', x: 215, y: 200, width: 30, height: 30, label: 'GND', inputs: [], outputs: [{ x: 15, y: 0, label: 'GND' }], name: 'gnd' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'gnd', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'bat', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'relay', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'Oscilloscope: Sine & Square': {
    fileName: 'Oscilloscope: Sine & Square',
    shapes: [
      { id: 'v1', type: 'AC_Voltage_Source', x: 50, y: 50, width: 60, height: 60, label: 'Sine 1kHz', inputs: [], outputs: [{ x: 60, y: 30, label: '+', value: 0, name: 'p1' }], name: 'v1', color: 'gray', voltage: 5, frequency: 1000 },
      { id: 'v2', type: 'Step_Voltage_Source', x: 50, y: 150, width: 60, height: 60, label: 'Square 500Hz', inputs: [], outputs: [{ x: 60, y: 30, label: '+', value: 0, name: 'p1' }], name: 'v2', color: 'gray', voltage: 5, frequency: 500, dutyCycle: 50 },
      { id: 'scope', type: 'Oscilloscope', x: 250, y: 50, width: 120, height: 80, label: 'Scope', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }, { x: 0, y: 40, label: 'CH2', value: 0, name: 'ch2' }, { x: 0, y: 60, label: 'CH3', value: 0, name: 'ch3' }, { x: 0, y: 80, label: 'CH4', value: 0, name: 'ch4' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 400, height: 30, label: 'Oscilloscope monitoring Sine and Square waves.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v2', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  'Comparator Monitoring': {
    fileName: 'Comparator Monitoring',
    shapes: [
      { id: 'v1', type: 'AC_Voltage_Source', x: 50, y: 50, width: 60, height: 60, label: 'Signal', inputs: [], outputs: [{ x: 60, y: 30, label: '+', value: 0, name: 'p1' }], name: 'v1', color: 'gray', voltage: 5, frequency: 1000 },
      { id: 'v2', type: 'DC_Voltage_Source', x: 50, y: 150, width: 60, height: 60, label: 'Ref 2.5V', inputs: [], outputs: [{ x: 60, y: 30, label: '+', value: 2.5, name: 'p1' }], name: 'v2', color: 'gray', voltage: 2.5 },
      { id: 'cmp', type: 'Comparator', x: 200, y: 80, width: 100, height: 100, label: 'Comparator', inputs: [{ x: 0, y: 25, label: '+', value: 0, name: 'pos' }, { x: 0, y: 75, label: '-', value: 0, name: 'neg' }], outputs: [{ x: 100, y: 50, label: 'Y', value: 0, name: 'out' }], name: 'cmp', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 350, y: 50, width: 120, height: 80, label: 'Scope', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }, { x: 0, y: 40, label: 'CH2', value: 0, name: 'ch2' }, { x: 0, y: 60, label: 'CH3', value: 0, name: 'ch3' }, { x: 0, y: 80, label: 'CH4', value: 0, name: 'ch4' }], outputs: [], name: 'scope', color: 'gray' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'cmp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v2', endShapeId: 'cmp', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'v1', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'cmp', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  '4-Bit Adder Monitor': {
    fileName: '4-Bit Adder Monitor',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 50, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'adder', type: 'Adder_4bit', x: 200, y: 50, width: 160, height: 60, label: '4-Bit Adder', inputs: [
        { x: 20, y: 0, label: 'A0', value: 0, name: 'a0' }, { x: 50, y: 0, label: 'A1', value: 0, name: 'a1' }, { x: 80, y: 0, label: 'A2', value: 0, name: 'a2' }, { x: 110, y: 0, label: 'A3', value: 0, name: 'a3' },
        { x: 20, y: 60, label: 'B0', value: 1, name: 'b0' }, { x: 50, y: 60, label: 'B1', value: 0, name: 'b1' }, { x: 80, y: 60, label: 'B2', value: 0, name: 'b2' }, { x: 110, y: 60, label: 'B3', value: 0, name: 'b3' },
        { x: 0, y: 30, label: 'Ci', value: 0, name: 'cin' }
      ], outputs: [
        { x: 20, y: 60, label: 'S0', value: 0, name: 's0' }, { x: 50, y: 60, label: 'S1', value: 0, name: 's1' }, { x: 80, y: 60, label: 'S2', value: 0, name: 's2' }, { x: 110, y: 60, label: 'S3', value: 0, name: 's3' },
        { x: 160, y: 30, label: 'Co', value: 0, name: 'cout' }
      ], name: 'adder', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 400, y: 50, width: 120, height: 80, label: 'Scope', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }, { x: 0, y: 40, label: 'CH2', value: 0, name: 'ch2' }, { x: 0, y: 60, label: 'CH3', value: 0, name: 'ch3' }, { x: 0, y: 80, label: 'CH4', value: 0, name: 'ch4' }], outputs: [], name: 'scope', color: 'gray' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'adder', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'adder', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'adder', endShapeId: 'scope', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'adder', endShapeId: 'scope', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c5', startShapeId: 'adder', endShapeId: 'scope', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'MOSFET Switch Circuit': {
    fileName: 'MOSFET Switch',
    shapes: [
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 50, width: 60, height: 60, label: '12V', inputs: [], outputs: [{ x: 60, y: 30, label: '+', value: 12, name: 'p1' }], name: 'v1', color: 'gray', voltage: 12 },
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Control', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw', color: 'gray' },
      { id: 'mos', type: 'MOSFET_N', x: 200, y: 100, width: 70, height: 100, label: 'IRF530', inputs: [{ x: 0, y: 50, label: 'G', value: 0, name: 'gate' }], outputs: [{ x: 70, y: 35, label: 'D', value: 0, name: 'drain' }, { x: 70, y: 65, label: 'S', value: 0, name: 'source' }], name: 'mos', color: 'gray', model: 'IRF530' },
      { id: 'motor', type: 'Motor', x: 350, y: 50, width: 60, height: 60, label: 'DC Motor', inputs: [{ x: 0, y: 30, label: '+', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 30, label: '-', value: 0, name: 'p2' }], name: 'motor', color: 'gray' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'mos', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v1', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'motor', endShapeId: 'mos', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Control Blocks Demo': {
    fileName: 'Control Blocks',
    shapes: [
      { id: 's1', type: 'AC_Voltage_Source', x: 50, y: 50, width: 80, height: 60, label: 'AC In', inputs: [], outputs: [{ x: 80, y: 30, label: '+', value: 0, name: 'pos' }], name: 'ac_in', color: 'gray', amplitude: 5, frequency: 1 },
      { id: 'lb1', type: 'LB1', x: 200, y: 50, width: 100, height: 60, label: 'Gain Block', inputs: [{ x: 0, y: 30, label: 'IN', value: 0, name: 'in' }], outputs: [{ x: 100, y: 30, label: 'OUT', value: 0, name: 'out' }], name: 'lb1', color: 'gray', gain: 2 },
      { id: 'sum', type: 'SUM2', x: 350, y: 80, width: 60, height: 60, label: 'SUM', inputs: [{ x: 0, y: 30, label: 'A', value: 0, name: 'in1' }, { x: 30, y: 60, label: 'B', value: 0, name: 'in2' }], outputs: [{ x: 60, y: 30, label: 'Y', value: 0, name: 'out' }], name: 'sum', color: 'gray' },
      { id: 'dc', type: 'DC_Voltage_Source', x: 50, y: 150, width: 80, height: 60, label: 'DC Offset', inputs: [], outputs: [{ x: 80, y: 30, label: '+', value: 0, name: 'pos' }], name: 'dc_offset', color: 'gray', voltage: 2 },
      { id: 'scope', type: 'Oscilloscope', x: 500, y: 50, width: 250, height: 180, label: 'Scope', inputs: [{ x: 0, y: 40, label: 'CH1', value: 0, name: 'ch1' }, { x: 0, y: 80, label: 'CH2', value: 0, name: 'ch2' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 600, height: 50, label: 'Control Blocks: Demonstrating LB1 (Gain) and SUM blocks.\nCH1: AC In * 2, CH2: (AC In * 2) + DC Offset.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 's1', endShapeId: 'lb1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'lb1', endShapeId: 'sum', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'dc', endShapeId: 'sum', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'lb1', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'sum', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },

  'Pocket Pager Circuit': {
    fileName: 'Pocket Pager Circuit',
    shapes: [
      { id: 'vcc', type: 'VCC', x: 50, y: 20, width: 40, height: 40, label: 'VCC', inputs: [], outputs: [{ x: 20, y: 40, label: '+', value: 9, name: 'out' }], name: 'vcc', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 50, y: 550, width: 40, height: 40, label: 'GND', inputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'in' }], outputs: [], name: 'gnd', color: 'gray' },
      
      // 555 Timer Section
      { id: 'timer', type: 'IC555', x: 150, y: 150, width: 120, height: 160, label: 'OCS/TIMER', inputs: [
        { x: 0, y: 30, label: 'RES', value: 0, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 0, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      
      { id: 'r1', type: 'Resistor', x: 300, y: 50, width: 60, height: 30, label: 'R1 10K', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r1', color: 'gray', resistance: 10000 },
      { id: 'r2', type: 'Resistor', x: 300, y: 100, width: 60, height: 30, label: 'R2 53.6K', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r2', color: 'gray', resistance: 53600 },
      { id: 'r3', type: 'Potentiometer', x: 300, y: 150, width: 60, height: 30, label: 'R3 20K', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r3', color: 'gray', resistance: 20000 },
      
      { id: 'c1', type: 'Capacitor', x: 150, y: 80, width: 60, height: 30, label: 'C1 10uF', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'c1', color: 'gray', capacitance: 0.00001 },
      { id: 'c2', type: 'Capacitor', x: 100, y: 350, width: 60, height: 30, label: 'C2 200uF', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'c2', color: 'gray', capacitance: 0.0002 },
      { id: 'c3', type: 'Capacitor', x: 300, y: 250, width: 60, height: 30, label: 'C3 .22uF', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'c3', color: 'gray', capacitance: 0.00000022 },
      
      { id: 'l3', type: 'Inductor', x: 150, y: 350, width: 60, height: 30, label: 'L3 50uH', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'l3', color: 'gray', inductance: 0.00005 },
      
      // Transistor Stage
      { id: 'q1', type: 'Transistor_NPN', x: 500, y: 150, width: 60, height: 80, label: 'Q1 MPSH11', inputs: [{ x: 0, y: 40, label: 'B', value: 0, name: 'base' }], outputs: [{ x: 30, y: 0, label: 'C', value: 0, name: 'collector' }, { x: 30, y: 80, label: 'E', value: 0, name: 'emitter' }], name: 'q1', color: 'gray' },
      { id: 'r4', type: 'Resistor', x: 400, y: 150, width: 60, height: 30, label: 'R4 6.2K', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r4', color: 'gray', resistance: 6200 },
      { id: 'r5', type: 'Resistor', x: 400, y: 250, width: 60, height: 30, label: 'R5 3.3K', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r5', color: 'gray', resistance: 3300 },
      { id: 'r6', type: 'Resistor', x: 500, y: 300, width: 60, height: 30, label: 'R6 220', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'r6', color: 'gray', resistance: 220 },
      
      { id: 'xtal', type: 'Crystal', x: 600, y: 200, width: 80, height: 60, label: 'XTAL 149.89MHz', inputs: [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 80, y: 30, label: '2', value: 0, name: 'p2' }], name: 'xtal', color: 'gray' },
      
      // Output Stage
      { id: 't1', type: 'Transformer', x: 750, y: 150, width: 80, height: 80, label: 'T1', inputs: [{ x: 0, y: 20, label: 'P1', value: 0, name: 'p1' }, { x: 0, y: 60, label: 'P2', value: 0, name: 'p2' }], outputs: [{ x: 80, y: 20, label: 'S1', value: 0, name: 's1' }, { x: 80, y: 60, label: 'S2', value: 0, name: 's2' }], name: 't1', color: 'gray' },
      { id: 'l2', type: 'Inductor', x: 850, y: 100, width: 60, height: 30, label: 'L2 0.06uH', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'l2', color: 'gray', inductance: 0.00000006 },
      { id: 'ant', type: 'Antenna', x: 950, y: 50, width: 60, height: 80, label: 'Antenna', inputs: [{ x: 30, y: 80, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'ant', color: 'gray' },
      
      // Power Section
      { id: 's1', type: 'Switch_SPST', x: 700, y: 450, width: 60, height: 40, label: 'S1', inputs: [{ x: 0, y: 20, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 20, label: '2', value: 0, name: 'p2' }], name: 's1', color: 'gray' },
      { id: 'l4', type: 'Inductor', x: 600, y: 450, width: 60, height: 30, label: 'L4 50uH', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'l4', color: 'gray', inductance: 0.00005 },
      { id: 'l5', type: 'Inductor', x: 600, y: 500, width: 60, height: 30, label: 'L5 50uH', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 15, label: '2', value: 0, name: 'p2' }], name: 'l5', color: 'gray', inductance: 0.00005 },
      
      { id: 'title', type: 'Text', x: 300, y: 600, width: 400, height: 50, label: 'POCKET PAGER ELECTRICAL CIRCUIT', inputs: [], outputs: [], name: 'title', color: '#ffffff', font: '20px Orbitron' },
    ] as Shape[],
    connectors: [
      // VCC connections
      { id: 'cv1', startShapeId: 'vcc', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 2 }, // VCC to Timer Pin 8
      { id: 'cv2', startShapeId: 'vcc', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 0 }, // VCC to Timer Pin 4 (Reset)
      { id: 'cv3', startShapeId: 'vcc', endShapeId: 'r1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cv4', startShapeId: 'vcc', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 }, // Collector to VCC
      
      // Timer connections
      { id: 'ct1', startShapeId: 'r1', endShapeId: 'r2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ct2', startShapeId: 'r2', endShapeId: 'r3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ct3', startShapeId: 'r3', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 1 }, // Pot to Trigger
      { id: 'ct4', startShapeId: 'r3', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 4 }, // Pot to Threshold
      { id: 'ct5', startShapeId: 'r1', endShapeId: 'timer', startOutputIndex: 0, endInputIndex: 3 }, // DIS between R1 and R2
      
      { id: 'ct6', startShapeId: 'timer', endShapeId: 'l3', startOutputIndex: 0, endInputIndex: 0 }, // OUT to L3
      
      // GND connections
      { id: 'cg1', startShapeId: 'timer', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 }, // Timer GND to GND
      { id: 'cg2', startShapeId: 'r5', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cg3', startShapeId: 'r6', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      
      // Transistor Section
      { id: 'cq1', startShapeId: 'r4', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 }, // R4 to Base
      { id: 'cq2', startShapeId: 'q1', endShapeId: 'r6', startOutputIndex: 1, endInputIndex: 0 }, // Emitter to R6
      { id: 'cq3', startShapeId: 'q1', endShapeId: 'xtal', startOutputIndex: 1, endInputIndex: 0 }, // Emitter to XTAL
      
      // Output Section
      { id: 'co1', startShapeId: 't1', endShapeId: 'l2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'co2', startShapeId: 'l2', endShapeId: 'ant', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },

  '555 & 7490 Counter (0-9)': {
    fileName: '555_7490_Counter',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 120, height: 160, label: 'Clock Source', frequency: 1, inputs: [
        { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 'counter', type: 'IC7490', x: 250, y: 100, width: 120, height: 180, label: '7490 Counter', inputs: [
        { x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' },
        { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' },
        { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' },
        { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' },
        { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' },
        { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' },
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
      ], name: 'counter', color: 'gray' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: '0-9 Display', inputs: [
        { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [], name: 'disp', color: 'gray' },
      { id: 'txt', type: 'Text', x: 50, y: 350, width: 500, height: 40, label: '555 & 7490 Decade Counter: The 555 provides a 1Hz clock to the 7490 decade counter.', name: 'txt', color: '#3b82f6', font: '14px Orbitron' }
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'counter', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'counter', endShapeId: 'counter', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '555 & Dual 7490 (0-99)': {
    fileName: '555_7490_0_99',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 120, height: 160, label: 'Clock', frequency: 2, inputs: [
        { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 'u_units', type: 'IC7490', x: 250, y: 50, width: 120, height: 180, label: 'Units', inputs: [
        { x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' },
        { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' },
        { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' },
        { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' },
        { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' },
        { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' },
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
      ], name: 'u_units', color: 'gray' },
      { id: 'u_tens', type: 'IC7490', x: 250, y: 250, width: 120, height: 180, label: 'Tens', inputs: [
        { x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' },
        { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' },
        { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' },
        { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' },
        { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' },
        { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' },
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
      ], name: 'u_tens', color: 'gray' },
      { id: 'd_units', type: 'DisplayBCD', x: 450, y: 50, width: 120, height: 180, label: 'Units Disp', inputs: [
        { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [], name: 'd_units', color: 'gray' },
      { id: 'd_tens', type: 'DisplayBCD', x: 450, y: 250, width: 120, height: 180, label: 'Tens Disp', inputs: [
        { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [], name: 'd_tens', color: 'gray' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'u_units', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'u_units', endShapeId: 'u_units', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'u_units', endShapeId: 'u_tens', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'u_tens', endShapeId: 'u_tens', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'u_units', endShapeId: 'd_units', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'u_units', endShapeId: 'd_units', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c7', startShapeId: 'u_units', endShapeId: 'd_units', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c8', startShapeId: 'u_units', endShapeId: 'd_units', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c9', startShapeId: 'u_tens', endShapeId: 'd_tens', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'u_tens', endShapeId: 'd_tens', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'u_tens', endShapeId: 'd_tens', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c12', startShapeId: 'u_tens', endShapeId: 'd_tens', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '555 & 74193 Hex Counter': {
    fileName: '555_74193_Hex',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 120, height: 160, label: 'Clock', frequency: 1, inputs: [
        { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 'counter', type: 'IC74193', x: 250, y: 100, width: 120, height: 180, label: '74193 Hex', inputs: [
        { x: 0, y: 15, label: 'UP', value: 0, name: 'up' },
        { x: 0, y: 35, label: 'DN', value: 1, name: 'dn' },
        { x: 0, y: 55, label: 'PL', value: 1, name: 'pl' },
        { x: 0, y: 75, label: 'MR', value: 0, name: 'mr' },
        { x: 0, y: 105, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 125, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 145, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 165, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
      ], name: 'counter', color: 'gray' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: 'Hex Display', inputs: [
        { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [], name: 'disp', color: 'gray' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'counter', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c5', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '555 Digital Clock (MM:SS)': {
    fileName: '555_Clock_MMSS',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 120, height: 160, label: '1Hz Clock', frequency: 1, inputs: [
        { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 's_u', type: 'IC7490', x: 250, y: 50, width: 100, height: 150, label: 'Sec Units', inputs: Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 's_u' },
      { id: 's_t', type: 'IC7490', x: 400, y: 50, width: 100, height: 150, label: 'Sec Tens', inputs: Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 's_t' },
      { id: 'm_u', type: 'IC7490', x: 250, y: 250, width: 100, height: 150, label: 'Min Units', inputs: Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'm_u' },
      { id: 'm_t', type: 'IC7490', x: 400, y: 250, width: 100, height: 150, label: 'Min Tens', inputs: Array.from({ length: 6 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'm_t' },
      { id: 'd1', type: 'DisplayBCD', x: 550, y: 50, width: 80, height: 120, label: 'S1', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'd1' },
      { id: 'd2', type: 'DisplayBCD', x: 650, y: 50, width: 80, height: 120, label: 'S10', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'd2' },
      { id: 'd3', type: 'DisplayBCD', x: 550, y: 250, width: 80, height: 120, label: 'M1', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'd3' },
      { id: 'd4', type: 'DisplayBCD', x: 650, y: 250, width: 80, height: 120, label: 'M10', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'd4' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 's_u', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 's_u', endShapeId: 's_u', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 's_u', endShapeId: 's_t', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c4', startShapeId: 's_t', endShapeId: 's_t', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 's_t', endShapeId: 's_t', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c6', startShapeId: 's_t', endShapeId: 's_t', startOutputIndex: 2, endInputIndex: 3 },
      { id: 'c7', startShapeId: 's_t', endShapeId: 'm_u', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'c8', startShapeId: 'm_u', endShapeId: 'm_u', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c9', startShapeId: 'm_u', endShapeId: 'm_t', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'c10', startShapeId: 'm_t', endShapeId: 'm_t', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c11', startShapeId: 'm_t', endShapeId: 'm_t', startOutputIndex: 1, endInputIndex: 2 },
      { id: 'c12', startShapeId: 'm_t', endShapeId: 'm_t', startOutputIndex: 2, endInputIndex: 3 },
      { id: 'cd1', startShapeId: 's_u', endShapeId: 'd1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd2', startShapeId: 's_u', endShapeId: 'd1', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cd3', startShapeId: 's_u', endShapeId: 'd1', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cd4', startShapeId: 's_u', endShapeId: 'd1', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'cd5', startShapeId: 's_t', endShapeId: 'd2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd6', startShapeId: 's_t', endShapeId: 'd2', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cd7', startShapeId: 's_t', endShapeId: 'd2', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cd8', startShapeId: 's_t', endShapeId: 'd2', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'cd9', startShapeId: 'm_u', endShapeId: 'd3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd10', startShapeId: 'm_u', endShapeId: 'd3', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cd11', startShapeId: 'm_u', endShapeId: 'd3', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cd12', startShapeId: 'm_u', endShapeId: 'd3', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'cd13', startShapeId: 'm_t', endShapeId: 'd4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd14', startShapeId: 'm_t', endShapeId: 'd4', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'cd15', startShapeId: 'm_t', endShapeId: 'd4', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'cd16', startShapeId: 'm_t', endShapeId: 'd4', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '555 & 74192 Countdown': {
    fileName: '555_74192_Countdown',
    shapes: [
      { id: 'timer', type: 'IC555', x: 50, y: 100, width: 120, height: 160, label: 'Clock', frequency: 1, inputs: [
        { x: 0, y: 30, label: 'RES', value: 1, name: 'reset' },
        { x: 0, y: 60, label: 'TRI', value: 0, name: 'trigger' },
        { x: 120, y: 30, label: 'VCC', value: 1, name: 'vcc' },
        { x: 120, y: 60, label: 'DIS', value: 0, name: 'discharge' },
        { x: 120, y: 90, label: 'THR', value: 0, name: 'threshold' },
        { x: 120, y: 120, label: 'CON', value: 0, name: 'control' },
        { x: 60, y: 160, label: 'GND', value: 0, name: 'gnd' }
      ], outputs: [{ x: 0, y: 120, label: 'OUT', value: 0, name: 'out' }], name: 'timer', color: 'gray' },
      { id: 'counter', type: 'IC74192', x: 250, y: 100, width: 120, height: 180, label: '74192 Down', inputs: [
        { x: 0, y: 15, label: 'UP', value: 1, name: 'up' },
        { x: 0, y: 35, label: 'DN', value: 0, name: 'dn' },
        { x: 0, y: 55, label: 'PL', value: 1, name: 'pl' },
        { x: 0, y: 75, label: 'MR', value: 0, name: 'mr' },
        { x: 0, y: 105, label: 'D0', value: 1, name: 'd0' },
        { x: 0, y: 125, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 145, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 165, label: 'D3', value: 1, name: 'd3' },
      ], outputs: [
        { x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' },
      ], name: 'counter', color: 'gray' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: 'Countdown', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 'sw_load', type: 'ToggleSwitch', x: 50, y: 280, width: 100, height: 50, label: 'Load (9)', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_load', color: 'gray' },
      { id: 'txt', type: 'Text', x: 50, y: 350, width: 500, height: 40, label: 'Countdown Timer: Uses 74192 Down clock. Toggle "Load" to preset to 9.', name: 'txt', color: '#ef4444', font: '14px Orbitron' }
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'timer', endShapeId: 'counter', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'sw_load', endShapeId: 'counter', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'counter', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '74160 Decade Counter Demo': {
    fileName: '74160 Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'cnt', type: 'IC74160', x: 200, y: 50, width: 120, height: 220, label: '74160 Decade', inputs: [
        { x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' },
        { x: 0, y: 35, label: 'CLR', value: 1, name: 'clr' },
        { x: 0, y: 55, label: 'LD', value: 1, name: 'ld' },
        { x: 0, y: 75, label: 'ENP', value: 1, name: 'enp' },
        { x: 0, y: 95, label: 'ENT', value: 1, name: 'ent' },
        { x: 0, y: 115, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 135, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 155, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 175, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [
        { x: 120, y: 25, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 65, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 105, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 145, label: 'Q3', value: 0, name: 'q3' },
        { x: 120, y: 185, label: 'RCO', value: 0, name: 'rco' },
      ], name: 'cnt', color: 'gray' },
      { id: 'dec', type: 'IC7448', x: 400, y: 50, width: 120, height: 200, label: '7448 Decoder', inputs: [
        { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
        { x: 0, y: 45, label: 'B', value: 0, name: 'b' },
        { x: 0, y: 70, label: 'C', value: 0, name: 'c' },
        { x: 0, y: 95, label: 'D', value: 0, name: 'd' },
        { x: 0, y: 120, label: 'LT', value: 1, name: 'lt' },
        { x: 0, y: 145, label: 'RBI', value: 1, name: 'rbi' },
        { x: 0, y: 170, label: 'BI', value: 1, name: 'bi' },
      ], outputs: [
        { x: 120, y: 20, label: 'a', value: 0, name: 'out_a' },
        { x: 120, y: 45, label: 'b', value: 0, name: 'out_b' },
        { x: 120, y: 70, label: 'c', value: 0, name: 'out_c' },
        { x: 120, y: 95, label: 'd', value: 0, name: 'out_d' },
        { x: 120, y: 120, label: 'e', value: 0, name: 'out_e' },
        { x: 120, y: 145, label: 'f', value: 0, name: 'out_f' },
        { x: 120, y: 170, label: 'g', value: 0, name: 'out_g' },
      ], name: 'dec', color: 'gray' },
      { id: 'disp', type: 'Display', x: 600, y: 50, width: 100, height: 300, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 80, label: '74160 Decade Counter + 7448 Decoder: \n1. Clock drives the 74160 decade counter.\n2. 74160 outputs (Q0-Q3) drive the 7448 BCD-to-7-Segment decoder.\n3. 7448 outputs drive the 7-segment display.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q0', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q1', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_q2', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_q3', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_seg_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '74160 & 7448: Decade Counter with Mux Monitoring': {
    fileName: '74160 Mux Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'cnt', type: 'IC74160', x: 200, y: 50, width: 120, height: 220, label: '74160 Decade', inputs: [
        { x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' },
        { x: 0, y: 35, label: 'CLR', value: 1, name: 'clr' },
        { x: 0, y: 55, label: 'LD', value: 1, name: 'ld' },
        { x: 0, y: 75, label: 'ENP', value: 1, name: 'enp' },
        { x: 0, y: 95, label: 'ENT', value: 1, name: 'ent' },
        { x: 0, y: 115, label: 'D0', value: 0, name: 'd0' },
        { x: 0, y: 135, label: 'D1', value: 0, name: 'd1' },
        { x: 0, y: 155, label: 'D2', value: 0, name: 'd2' },
        { x: 0, y: 175, label: 'D3', value: 0, name: 'd3' },
      ], outputs: [
        { x: 120, y: 25, label: 'Q0', value: 0, name: 'q0' },
        { x: 120, y: 65, label: 'Q1', value: 0, name: 'q1' },
        { x: 120, y: 105, label: 'Q2', value: 0, name: 'q2' },
        { x: 120, y: 145, label: 'Q3', value: 0, name: 'q3' },
        { x: 120, y: 185, label: 'RCO', value: 0, name: 'rco' },
      ], name: 'cnt', color: 'gray' },
      { id: 'dec', type: 'IC7448', x: 400, y: 50, width: 120, height: 200, label: '7448 Decoder', inputs: [
        { x: 0, y: 20, label: 'A', value: 0, name: 'a' },
        { x: 0, y: 45, label: 'B', value: 0, name: 'b' },
        { x: 0, y: 70, label: 'C', value: 0, name: 'c' },
        { x: 0, y: 95, label: 'D', value: 0, name: 'd' },
        { x: 0, y: 120, label: 'LT', value: 1, name: 'lt' },
        { x: 0, y: 145, label: 'RBI', value: 1, name: 'rbi' },
        { x: 0, y: 170, label: 'BI', value: 1, name: 'bi' },
      ], outputs: [
        { x: 120, y: 20, label: 'a', value: 0, name: 'out_a' },
        { x: 120, y: 45, label: 'b', value: 0, name: 'out_b' },
        { x: 120, y: 70, label: 'c', value: 0, name: 'out_c' },
        { x: 120, y: 95, label: 'd', value: 0, name: 'out_d' },
        { x: 120, y: 120, label: 'e', value: 0, name: 'out_e' },
        { x: 120, y: 145, label: 'f', value: 0, name: 'out_f' },
        { x: 120, y: 170, label: 'g', value: 0, name: 'out_g' },
      ], name: 'dec', color: 'gray' },
      { id: 'disp', type: 'Display', x: 600, y: 50, width: 100, height: 300, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 'mux', type: 'IC74151', x: 200, y: 300, width: 120, height: 260, label: '74151 Mux', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `I${i}`, value: 0, name: `in_${i}` })), outputs: [{ x: 120, y: 25, label: 'Y', value: 0, name: 'y' }, { x: 120, y: 45, label: 'W', value: 1, name: 'w' }], name: 'mux', color: 'gray' },
      { id: 'sw_a', type: 'InputL', x: 50, y: 300, width: 80, height: 40, label: 'Sel A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputL', x: 50, y: 350, width: 80, height: 40, label: 'Sel B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_b', color: 'gray' },
      { id: 'sw_c', type: 'InputL', x: 50, y: 400, width: 80, height: 40, label: 'Sel C', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_c', color: 'gray' },
      { id: 'led', type: 'OutPutL', x: 400, y: 350, width: 60, height: 40, label: 'Mux Y', inputs: [{ x: 30, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'green' },
      { id: 'disp_bcd', type: 'DisplayBCD', x: 600, y: 350, width: 100, height: 180, label: '4-Bit Hex', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'disp_bcd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 650, height: 100, label: 'Decade Counter with Mux Monitoring:\n1. 74160 counts 0-9.\n2. 7448 decodes BCD to 7-segment display.\n3. 74151 selects one of the 4 counter bits (Q0-Q3) to show on the LED.\n4. DisplayBCD shows the current count value.\nUse Sel A, B, C to choose which bit to monitor.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q0', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q1', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_q2', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_q3', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_seg_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      { id: 'c_m0', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_m1', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_m2', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_m3', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 3, endInputIndex: 3 },
      { id: 'c_sela', startShapeId: 'sw_a', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c_selb', startShapeId: 'sw_b', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c_selc', startShapeId: 'sw_c', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c_led', startShapeId: 'mux', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_bcd0', startShapeId: 'cnt', endShapeId: 'disp_bcd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_bcd1', startShapeId: 'cnt', endShapeId: 'disp_bcd', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_bcd2', startShapeId: 'cnt', endShapeId: 'disp_bcd', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_bcd3', startShapeId: 'cnt', endShapeId: 'disp_bcd', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  '7493 & 7447: Binary Counter with Dual Mux Selection': {
    fileName: '7493 Mux Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'cnt', type: 'IC7493', x: 200, y: 50, width: 120, height: 120, label: '7493 Binary', inputs: [
        { x: 0, y: 15, label: 'CKA', value: 0, name: 'cka' },
        { x: 0, y: 35, label: 'CKB', value: 0, name: 'ckb' },
        { x: 0, y: 55, label: 'R0(1)', value: 0, name: 'r01' },
        { x: 0, y: 75, label: 'R0(2)', value: 0, name: 'r02' },
      ], outputs: [
        { x: 120, y: 25, label: 'QA', value: 0, name: 'qa' },
        { x: 120, y: 45, label: 'QB', value: 0, name: 'qb' },
        { x: 120, y: 65, label: 'QC', value: 0, name: 'qc' },
        { x: 120, y: 85, label: 'QD', value: 0, name: 'qd' },
      ], name: 'cnt', color: 'gray' },
      { id: 'dec', type: 'IC7447', x: 400, y: 50, width: 120, height: 200, label: '7447 Decoder', inputs: [
        { x: 0, y: 15, label: 'A', value: 0, name: 'a' },
        { x: 0, y: 40, label: 'B', value: 0, name: 'b' },
        { x: 0, y: 65, label: 'C', value: 0, name: 'c' },
        { x: 0, y: 90, label: 'D', value: 0, name: 'd' },
      ], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'dec', color: 'gray' },
      { id: 'disp', type: 'Display', x: 600, y: 50, width: 100, height: 300, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 'mux', type: 'IC74153', x: 200, y: 300, width: 120, height: 260, label: '74153 Dual Mux', inputs: [...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `1D${i}` })), { x: 0, y: 95, label: '1G' }, ...Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 115 + i * 20, label: `2D${i}` })), { x: 0, y: 195, label: '2G' }, { x: 0, y: 215, label: 'A' }, { x: 0, y: 235, label: 'B' }], outputs: [{ x: 120, y: 25, label: '1Y' }, { x: 120, y: 125, label: '2Y' }], name: 'mux', color: 'gray' },
      { id: 'disp_bcd', type: 'DisplayBCD', x: 450, y: 300, width: 100, height: 180, label: '4-Bit Hex', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'disp_bcd', color: 'gray' },
      { id: 'sw_a', type: 'InputL', x: 50, y: 300, width: 80, height: 40, label: 'Sel A', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputL', x: 50, y: 350, width: 80, height: 40, label: 'Sel B', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_b', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 650, height: 100, label: 'Binary Counter with Dual Mux Selection:\n1. 7493 counts 0-15 (QA connected to CKB).\n2. 7447 decodes the full 4-bit count for the 7-segment display.\n3. 74153 selects between QA,QB and QC,QD to show on the 4-bit Hex display.\nUse Sel A, B to switch between low and high bits.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_qa_ckb', startShapeId: 'cnt', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_q0', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q1', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_q2', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c_q3', startShapeId: 'cnt', endShapeId: 'dec', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c_seg_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      { id: 'c_m1d0', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_m1d1', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c_m2d0', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 2, endInputIndex: 5 },
      { id: 'c_m2d1', startShapeId: 'cnt', endShapeId: 'mux', startOutputIndex: 3, endInputIndex: 6 },
      { id: 'c_sela', startShapeId: 'sw_a', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c_selb', startShapeId: 'sw_b', endShapeId: 'mux', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'c_mux1y', startShapeId: 'mux', endShapeId: 'disp_bcd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_mux2y', startShapeId: 'mux', endShapeId: 'disp_bcd', startOutputIndex: 1, endInputIndex: 1 },
    ]
  },
  'Flip-Flop Lab: Edge Triggering': {
    fileName: 'FF Edge Lab',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'sw_data', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Data', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_data', color: 'gray' },
      { id: 'ff_d', type: 'D_Flip_Flop', x: 200, y: 50, width: 100, height: 100, label: 'D-FF', inputs: [{ x: 0, y: 20, label: 'D', value: 0, name: 'd' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }], name: 'ff_d', color: 'gray' },
      { id: 'ff_t', type: 'T_Flip_Flop', x: 200, y: 180, width: 100, height: 100, label: 'T-FF', inputs: [{ x: 0, y: 20, label: 'T', value: 0, name: 't' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }], name: 'ff_t', color: 'gray' },
      { id: 'ff_jk', type: 'JK_Flip_Flop', x: 200, y: 310, width: 100, height: 120, label: 'JK-FF', inputs: [{ x: 0, y: 20, label: 'J', value: 0, name: 'j' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 100, label: 'K', value: 0, name: 'k' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }], name: 'ff_jk', color: 'gray' },
      { id: 'l1', type: 'Text', x: 350, y: 50, width: 400, height: 100, label: 'D Flip-Flop: Captures the value of D at the RISING EDGE of CLK.', inputs: [], outputs: [], name: 'l1', color: '#3b82f6', font: '14px Inter' },
      { id: 'l2', type: 'Text', x: 350, y: 180, width: 400, height: 100, label: 'T Flip-Flop: Toggles its output if T is HIGH at the RISING EDGE of CLK.', inputs: [], outputs: [], name: 'l2', color: '#10b981', font: '14px Inter' },
      { id: 'l3', type: 'Text', x: 350, y: 310, width: 400, height: 100, label: 'JK Flip-Flop: J=Set, K=Reset, J=K=1=Toggle. All happen at RISING EDGE.', inputs: [], outputs: [], name: 'l3', color: '#f59e0b', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_data', endShapeId: 'ff_d', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_data', endShapeId: 'ff_t', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'sw_data', endShapeId: 'ff_jk', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_data', endShapeId: 'ff_jk', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c5', startShapeId: 'clk', endShapeId: 'ff_d', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c6', startShapeId: 'clk', endShapeId: 'ff_t', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c7', startShapeId: 'clk', endShapeId: 'ff_jk', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  'Flip-Flop: 4-Bit Binary Counter': {
    fileName: '4-Bit FF Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'high', type: 'HighConstant', x: 50, y: 200, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `ff_${i}`, type: 'JK_Flip_Flop', x: 200 + i * 150, y: 100, width: 100, height: 120, label: `Bit ${i}`,
        inputs: [{ x: 0, y: 20, label: 'J', value: 1, name: 'j' }, { x: 0, y: 60, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 100, label: 'K', value: 1, name: 'k' }],
        outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }, { x: 100, y: 100, label: "!Q", value: 1, name: 'nq' }],
        name: `ff_${i}`, color: 'gray'
      })),
      { id: 'disp', type: 'DisplayBCD', x: 800, y: 100, width: 100, height: 180, label: 'Hex Count', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: [], name: 'disp', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 800, height: 100, label: '4-Bit Ripple Counter using JK Flip-Flops:\n- Each FF is in Toggle Mode (J=K=1).\n- The output (Q) of each bit triggers the clock of the next bit.\n- This creates a binary sequence from 0000 to 1111.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk0', startShapeId: 'clk', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 1 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_j_${i}`, startShapeId: 'high', endShapeId: `ff_${i}`, startOutputIndex: 0, endInputIndex: 0 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_k_${i}`, startShapeId: 'high', endShapeId: `ff_${i}`, startOutputIndex: 0, endInputIndex: 2 })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `c_clk_${i+1}`, startShapeId: `ff_${i}`, endShapeId: `ff_${i+1}`, startOutputIndex: 0, endInputIndex: 1 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_disp_${i}`, startShapeId: `ff_${i}`, endShapeId: 'disp', startOutputIndex: 0, endInputIndex: i })),
    ]
  },
  'Latch Lab: Level Sensitivity': {
    fileName: 'Latch Level Lab',
    shapes: [
      { id: 'sw_en', type: 'ToggleSwitch', x: 50, y: 150, width: 80, height: 40, label: 'Enable', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_en', color: 'gray' },
      { id: 'sw_data', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'Data/Set', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_data', color: 'gray' },
      { id: 'sw_reset', type: 'ToggleSwitch', x: 50, y: 250, width: 80, height: 40, label: 'Reset', inputs: [], outputs: [{ x: 70, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_reset', color: 'gray' },
      { id: 'l_d', type: 'D_Latch', x: 200, y: 50, width: 100, height: 100, label: 'D-Latch', inputs: [{ x: 0, y: 20, label: 'D', value: 0, name: 'd' }, { x: 0, y: 60, label: 'EN', value: 0, name: 'en' }], outputs: [{ x: 100, y: 20, label: 'Q', value: 0, name: 'q' }], name: 'l_d', color: 'gray' },
      { id: 'l_sr', type: 'SR_Latch', x: 200, y: 200, width: 100, height: 100, label: 'SR-Latch', inputs: [{ x: 0, y: 25, label: 'S', value: 0, name: 's' }, { x: 0, y: 55, label: 'R', value: 0, name: 'r' }], outputs: [{ x: 100, y: 25, label: 'Q', value: 0, name: 'q' }], name: 'l_sr', color: 'gray' },
      { id: 't1', type: 'Text', x: 350, y: 50, width: 400, height: 100, label: 'D Latch: Output Q follows D as long as EN is HIGH (Transparent).\nWhen EN goes LOW, the value is latched.', inputs: [], outputs: [], name: 't1', color: '#3b82f6', font: '14px Inter' },
      { id: 't2', type: 'Text', x: 350, y: 200, width: 400, height: 100, label: 'SR Latch: Set (S) makes Q=1, Reset (R) makes Q=0.\nIt is level-sensitive and does not require a clock.', inputs: [], outputs: [], name: 't2', color: '#ef4444', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_data', endShapeId: 'l_d', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_en', endShapeId: 'l_d', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'sw_data', endShapeId: 'l_sr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'sw_reset', endShapeId: 'l_sr', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  'Latch: Active-Low SR Memory': {
    fileName: 'Active-Low SR Latch',
    shapes: [
      { id: 'sw_s', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: '!Set (Idle=1)', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_s', color: 'gray' },
      { id: 'sw_r', type: 'ToggleSwitch', x: 50, y: 150, width: 100, height: 50, label: '!Reset (Idle=1)', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_r', color: 'gray' },
      { id: 'l_inv', type: 'SR_Latch_Inv', x: 250, y: 75, width: 100, height: 100, label: 'NAND Latch', inputs: [{ x: 0, y: 25, label: '!S', value: 1, name: 's' }, { x: 0, y: 55, label: '!R', value: 1, name: 'r' }], outputs: [{ x: 100, y: 25, label: 'Q', value: 0, name: 'q' }, { x: 100, y: 55, label: "!Q", value: 1, name: 'nq' }], name: 'l_inv', color: 'gray' },
      { id: 'led_q', type: 'OutPutL', x: 450, y: 75, width: 60, height: 40, label: 'Q', inputs: [{ x: 30, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_q', color: 'green' },
      { id: 'led_nq', type: 'OutPutL', x: 450, y: 135, width: 60, height: 40, label: '!Q', inputs: [{ x: 30, y: 20, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led_nq', color: 'red' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 600, height: 100, label: 'Active-Low SR Latch (NAND-based):\n- Idle state is !S=1, !R=1.\n- Pulse !S to 0 to SET (Q=1).\n- Pulse !R to 0 to RESET (Q=0).\n- !S=0, !R=0 is an invalid state.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_s', endShapeId: 'l_inv', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_r', endShapeId: 'l_inv', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'l_inv', endShapeId: 'led_q', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'l_inv', endShapeId: 'led_nq', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'Advanced Display Lab': {
    fileName: 'Display Lab',
    shapes: [
      { id: 'sw_h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'sw_h', color: 'gray' },
      { id: 'd7', type: 'Display7Segment', x: 200, y: 50, width: 100, height: 150, label: '7-Seg', inputs: Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 10 + i * 20, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'd7', color: 'gray' },
      { id: 'd8', type: 'Display8Segment', x: 350, y: 50, width: 100, height: 150, label: '8-Seg', inputs: Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 10 + i * 18, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}` })), outputs: [], name: 'd8', color: 'gray' },
      { id: 'd9', type: 'Display9Segment', x: 500, y: 50, width: 100, height: 150, label: '9-Seg', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 10 + i * 16, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'd9', color: 'gray' },
      { id: 'd14', type: 'Display14Segment', x: 650, y: 50, width: 100, height: 200, label: '14-Seg', inputs: Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 10 + i * 14, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'd14', color: 'gray' },
      { id: 'dm', type: 'DotMatrixDisplay', x: 800, y: 50, width: 120, height: 200, label: 'Dot-Matrix', inputs: [
        ...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 15, label: `C${i + 1}`, value: 0, name: `col_${i}` })),
        ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 100 + i * 15, label: `R${i + 1}`, value: 0, name: `row_${i}` }))
      ], outputs: [], name: 'dm', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 800, height: 100, label: 'Advanced Display Lab:\n- 7-Segment: Standard digit display.\n- 8-Segment: 7-Seg + Decimal Point.\n- 9-Segment: Adds vertical/diagonal segments for more characters.\n- 14-Segment: Alphanumeric "Union Jack" display.\n- Dot-Matrix: 5x7 grid of LEDs (Active Row & Column).', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 7 }, (_, i) => ({ id: `c7_${i}`, startShapeId: 'sw_h', endShapeId: 'd7', startOutputIndex: 0, endInputIndex: i })),
      ...Array.from({ length: 8 }, (_, i) => ({ id: `c8_${i}`, startShapeId: 'sw_h', endShapeId: 'd8', startOutputIndex: 0, endInputIndex: i })),
      ...Array.from({ length: 9 }, (_, i) => ({ id: `c9_${i}`, startShapeId: 'sw_h', endShapeId: 'd9', startOutputIndex: 0, endInputIndex: i })),
      ...Array.from({ length: 14 }, (_, i) => ({ id: `c14_${i}`, startShapeId: 'sw_h', endShapeId: 'd14', startOutputIndex: 0, endInputIndex: i })),
      ...Array.from({ length: 12 }, (_, i) => ({ id: `cm_${i}`, startShapeId: 'sw_h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: i })),
    ]
  },
  'Multi-Segment Display Demo': {
    fileName: 'Multi-Segment Demo',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'disp8', type: 'Display8Segment', x: 200, y: 50, width: 100, height: 400, label: '8-Seg', inputs: Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}` })), outputs: [], name: 'disp8', color: 'gray' },
      { id: 'disp9', type: 'Display9Segment', x: 350, y: 50, width: 100, height: 440, label: '9-Seg', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp9', color: 'gray' },
      { id: 'disp14', type: 'Display14Segment', x: 500, y: 50, width: 100, height: 500, label: '14-Seg', inputs: Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp14', color: 'gray' },
      { id: 'disp16', type: 'Display16Segment', x: 650, y: 50, width: 100, height: 550, label: '16-Seg', inputs: Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp16', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 700, height: 50, label: 'Multi-Segment Display Demo: Comparing 8, 9, 14, and 16 segment displays.\nAll connected to a single clock for visualization.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'disp8', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'disp9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'clk', endShapeId: 'disp14', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'clk', endShapeId: 'disp16', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Dot Matrix & 16-Seg Pattern': {
    fileName: 'Matrix & 16-Seg',
    shapes: [
      { id: 'high', type: 'HighConstant', x: 50, y: 50, width: 80, height: 40, label: 'Logic 1', inputs: [], outputs: [{ x: 70, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'matrix', type: 'DotMatrixDisplay', x: 200, y: 50, width: 120, height: 350, label: 'Dot Matrix', inputs: [
        ...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `C${i + 1}`, value: 0, name: `col_${i}` })),
        ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 150 + i * 25, label: `R${i + 1}`, value: 0, name: `row_${i}` }))
      ], outputs: [], name: 'matrix', color: 'gray' },
      { id: 'disp16', type: 'Display16Segment', x: 400, y: 50, width: 100, height: 550, label: '16-Seg', inputs: Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp16', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 620, width: 600, height: 50, label: 'Dot Matrix & 16-Segment Pattern: Demonstrating complex output components.\nConnect the High Constant to various pins to see the patterns.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'high', endShapeId: 'matrix', startOutputIndex: 0, endInputIndex: 0 }, // Column 1
      { id: 'c2', startShapeId: 'high', endShapeId: 'matrix', startOutputIndex: 0, endInputIndex: 5 }, // Row 1
      { id: 'c3', startShapeId: 'high', endShapeId: 'disp16', startOutputIndex: 0, endInputIndex: 0 }, // Segment 1
      { id: 'c4', startShapeId: 'high', endShapeId: 'disp16', startOutputIndex: 0, endInputIndex: 15 }, // Segment 16
    ]
  },
  '8-Seg Counter (7490+7447)': {
    fileName: '8-Seg Counter',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'c7490', type: 'IC7490', x: 200, y: 50, width: 120, height: 180, label: '74LS90', inputs: [{ x: 0, y: 15, label: 'CP0', value: 0, name: 'cp0' }, { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 65, label: 'MR1', value: 0, name: 'mr1' }, { x: 0, y: 90, label: 'MR2', value: 0, name: 'mr2' }, { x: 0, y: 115, label: 'MS1', value: 0, name: 'ms1' }, { x: 0, y: 140, label: 'MS2', value: 0, name: 'ms2' }], outputs: [{ x: 120, y: 15, label: 'Q0', value: 0, name: 'q0' }, { x: 120, y: 40, label: 'Q1', value: 0, name: 'q1' }, { x: 120, y: 65, label: 'Q2', value: 0, name: 'q2' }, { x: 120, y: 90, label: 'Q3', value: 0, name: 'q3' }], name: 'c7490', color: 'gray' },
      { id: 'c7447', type: 'IC7447', x: 400, y: 50, width: 120, height: 220, label: '74LS47', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }, { x: 0, y: 65, label: 'C', value: 0, name: 'c' }, { x: 0, y: 90, label: 'D', value: 0, name: 'd' }], outputs: Array.from({ length: 7 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: String.fromCharCode(97 + i), value: 0, name: `out_${i}` })), name: 'c7447', color: 'gray' },
      { id: 'disp8', type: 'Display8Segment', x: 600, y: 50, width: 100, height: 400, label: '8-Seg', inputs: Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}` })), outputs: [], name: 'disp8', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 500, width: 600, height: 50, label: '8-Seg Counter: 7490 Decade Counter driving a 7447 BCD-to-7-Seg Decoder.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c7490', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'c7490', endShapeId: 'c7490', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'c7490', endShapeId: 'c7447', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'c7490', endShapeId: 'c7447', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'c7490', endShapeId: 'c7447', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c6', startShapeId: 'c7490', endShapeId: 'c7447', startOutputIndex: 3, endInputIndex: 3 },
      ...Array.from({ length: 7 }, (_, i) => ({ id: `seg_${i}`, startShapeId: 'c7447', endShapeId: 'disp8', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '8-Seg Shift Register': {
    fileName: '8-Seg Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'high', type: 'HighConstant', x: 50, y: 200, width: 60, height: 40, label: 'Data', inputs: [], outputs: [{ x: 50, y: 20, label: '1', value: 1, name: 'out' }], name: 'high', color: 'gray' },
      { id: 'c595', type: 'IC74HC595', x: 200, y: 50, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595', color: 'gray' },
      { id: 'disp8', type: 'Display8Segment', x: 400, y: 50, width: 100, height: 400, label: '8-Seg', inputs: Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}` })), outputs: [], name: 'disp8', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 500, width: 600, height: 50, label: '8-Seg Shift Register: Using 74HC595 to drive segments serially.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'high', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `q_${i}`, startShapeId: 'c595', endShapeId: 'disp8', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '8-Seg MCU Driver': {
    fileName: '8-Seg MCU',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 150, height: 300, label: 'ATmega328P', inputs: [], outputs: Array.from({ length: 14 }, (_, i) => ({ x: 150, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), name: 'mcu', color: 'gray' },
      { id: 'disp8', type: 'Display8Segment', x: 300, y: 50, width: 100, height: 400, label: '8-Seg', inputs: Array.from({ length: 8 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: i < 7 ? String.fromCharCode(65 + i) : 'DP', value: 0, name: `seg_${i}` })), outputs: [], name: 'disp8', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 500, width: 600, height: 50, label: '8-Seg MCU Driver: Direct control of segments using an ATmega328P.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 8 }, (_, i) => ({ id: `d_${i}`, startShapeId: 'mcu', endShapeId: 'disp8', startOutputIndex: i + 2, endInputIndex: i })),
    ]
  },
  '9-Seg MCU Alphanumeric': {
    fileName: '9-Seg MCU',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 150, height: 300, label: 'ATmega328P', inputs: [], outputs: Array.from({ length: 14 }, (_, i) => ({ x: 150, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), name: 'mcu', color: 'gray' },
      { id: 'disp9', type: 'Display9Segment', x: 300, y: 50, width: 100, height: 440, label: '9-Seg', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp9', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 550, width: 600, height: 50, label: '9-Seg MCU Alphanumeric: Driving a 9-segment display for custom characters.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 9 }, (_, i) => ({ id: `d_${i}`, startShapeId: 'mcu', endShapeId: 'disp9', startOutputIndex: i + 2, endInputIndex: i })),
    ]
  },
  '9-Seg Shift Register': {
    fileName: '9-Seg Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'c595', type: 'IC74HC595', x: 200, y: 50, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595', color: 'gray' },
      { id: 'disp9', type: 'Display9Segment', x: 400, y: 50, width: 100, height: 440, label: '9-Seg', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp9', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 550, width: 600, height: 50, label: '9-Seg Shift Register: Using a shift register to drive 9-segment display pins.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `q_${i}`, startShapeId: 'c595', endShapeId: 'disp9', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '9-Seg Logic Pattern': {
    fileName: '9-Seg Logic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: 'Pattern 1', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 150, width: 100, height: 50, label: 'Pattern 2', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'gate', type: 'IC7408', x: 200, y: 50, width: 160, height: 80, label: '74LS08', inputs: [{ x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' }, { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'gate', color: 'gray' },
      { id: 'disp9', type: 'Display9Segment', x: 450, y: 50, width: 100, height: 440, label: '9-Seg', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: String.fromCharCode(65 + i), value: 0, name: `seg_${i}` })), outputs: [], name: 'disp9', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 550, width: 600, height: 50, label: '9-Seg Logic Pattern: Using AND gates to control segment combinations.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'gate', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'gate', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'gate', endShapeId: 'disp9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'gate', endShapeId: 'disp9', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  '14-Seg MCU Message': {
    fileName: '14-Seg MCU',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 150, height: 300, label: 'ATmega328P', inputs: [], outputs: Array.from({ length: 14 }, (_, i) => ({ x: 150, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), name: 'mcu', color: 'gray' },
      { id: 'disp14', type: 'Display14Segment', x: 300, y: 50, width: 100, height: 500, label: '14-Seg', inputs: Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp14', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 600, height: 50, label: '14-Seg MCU Message: Alphanumeric display driven by an MCU.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 14 }, (_, i) => ({ id: `d_${i}`, startShapeId: 'mcu', endShapeId: 'disp14', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '14-Seg Dual Shift Register': {
    fileName: '14-Seg Dual Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'c595_1', type: 'IC74HC595', x: 200, y: 50, width: 120, height: 200, label: '74HC595 #1', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595_1', color: 'gray' },
      { id: 'c595_2', type: 'IC74HC595', x: 200, y: 300, width: 120, height: 200, label: '74HC595 #2', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595_2', color: 'gray' },
      { id: 'disp14', type: 'Display14Segment', x: 450, y: 50, width: 100, height: 500, label: '14-Seg', inputs: Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp14', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 600, height: 50, label: '14-Seg Dual Shift Register: Cascading two 74HC595s to drive 14 segments.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c595_1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'c595_1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'clk', endShapeId: 'c595_2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'clk', endShapeId: 'c595_2', startOutputIndex: 0, endInputIndex: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `q1_${i}`, startShapeId: 'c595_1', endShapeId: 'disp14', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 6 }, (_, i) => ({ id: `q2_${i}`, startShapeId: 'c595_2', endShapeId: 'disp14', startOutputIndex: i, endInputIndex: i + 8 })),
    ]
  },
  '14-Seg Logic Decoder': {
    fileName: '14-Seg Logic',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 100, width: 100, height: 50, label: 'Enable', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw', color: 'gray' },
      { id: 'dec', type: 'IC74138', x: 200, y: 50, width: 120, height: 240, label: '74LS138', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'a' }, { x: 0, y: 40, label: 'B', value: 0, name: 'b' }, { x: 0, y: 65, label: 'C', value: 0, name: 'c' }, { x: 0, y: 90, label: 'G1', value: 1, name: 'g1' }, { x: 0, y: 115, label: 'G2A', value: 0, name: 'g2a' }, { x: 0, y: 140, label: 'G2B', value: 0, name: 'g2b' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 25, label: `Y${i}`, value: 1, name: `out_${i}` })), name: 'dec', color: 'gray' },
      { id: 'disp14', type: 'Display14Segment', x: 400, y: 50, width: 100, height: 500, label: '14-Seg', inputs: Array.from({ length: 14 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp14', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 600, width: 600, height: 50, label: '14-Seg Logic Decoder: Using a 3-to-8 decoder to select segment groups.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'dec', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `y_${i}`, startShapeId: 'dec', endShapeId: 'disp14', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'Dot Matrix 4017 Scanner': {
    fileName: 'Matrix 4017',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 5 },
      { id: 'c4017', type: 'IC4017', x: 200, y: 50, width: 120, height: 240, label: '4017 Scanner', inputs: [{ x: 0, y: 15, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 40, label: 'CE', value: 0, name: 'ce' }, { x: 0, y: 65, label: 'RST', value: 0, name: 'rst' }], outputs: Array.from({ length: 10 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `out_${i}` })), name: 'c4017', color: 'gray' },
      { id: 'matrix', type: 'DotMatrixDisplay', x: 400, y: 50, width: 120, height: 350, label: 'Dot Matrix', inputs: [...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `C${i + 1}`, value: 0, name: `col_${i}` })), ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 150 + i * 25, label: `R${i + 1}`, value: 0, name: `row_${i}` }))], outputs: [], name: 'matrix', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 50, label: 'Dot Matrix 4017 Scanner: Sequential scanning of columns using a decade counter.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c4017', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 5 }, (_, i) => ({ id: `col_${i}`, startShapeId: 'c4017', endShapeId: 'matrix', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 7 }, (_, i) => ({ id: `row_${i}`, startShapeId: 'c4017', endShapeId: 'matrix', startOutputIndex: 0, endInputIndex: i + 5 })),
    ]
  },
  'Dot Matrix MCU Pattern': {
    fileName: 'Matrix MCU',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 150, height: 300, label: 'ATmega328P', inputs: [], outputs: Array.from({ length: 14 }, (_, i) => ({ x: 150, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), name: 'mcu', color: 'gray' },
      { id: 'matrix', type: 'DotMatrixDisplay', x: 300, y: 50, width: 120, height: 350, label: 'Dot Matrix', inputs: [...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `C${i + 1}`, value: 0, name: `col_${i}` })), ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 150 + i * 25, label: `R${i + 1}`, value: 0, name: `row_${i}` }))], outputs: [], name: 'matrix', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 50, label: 'Dot Matrix MCU Pattern: Direct control of rows and columns for custom graphics.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 12 }, (_, i) => ({ id: `d_${i}`, startShapeId: 'mcu', endShapeId: 'matrix', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  'Dot Matrix Shift Drive': {
    fileName: 'Matrix Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 5 },
      { id: 'c595', type: 'IC74HC595', x: 200, y: 50, width: 120, height: 200, label: '74HC595', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595', color: 'gray' },
      { id: 'matrix', type: 'DotMatrixDisplay', x: 400, y: 50, width: 120, height: 350, label: 'Dot Matrix', inputs: [...Array.from({ length: 5 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `C${i + 1}`, value: 0, name: `col_${i}` })), ...Array.from({ length: 7 }, (_, i) => ({ x: 0, y: 150 + i * 25, label: `R${i + 1}`, value: 0, name: `row_${i}` }))], outputs: [], name: 'matrix', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 50, label: 'Dot Matrix Shift Drive: Using a shift register to control matrix columns.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'c595', startOutputIndex: 0, endInputIndex: 2 },
      ...Array.from({ length: 5 }, (_, i) => ({ id: `q_${i}`, startShapeId: 'c595', endShapeId: 'matrix', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '16-Seg MCU Alphanumeric': {
    fileName: '16-Seg MCU',
    shapes: [
      { id: 'mcu', type: 'ATmega328P', x: 50, y: 50, width: 150, height: 300, label: 'ATmega328P', inputs: [], outputs: Array.from({ length: 14 }, (_, i) => ({ x: 150, y: 15 + i * 20, label: `D${i}`, value: 0, name: `d${i}` })), name: 'mcu', color: 'gray' },
      { id: 'disp16', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 550, label: '16-Seg', inputs: Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp16', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 650, width: 600, height: 50, label: '16-Seg MCU Alphanumeric: Full character set control using an MCU.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 14 }, (_, i) => ({ id: `d_${i}`, startShapeId: 'mcu', endShapeId: 'disp16', startOutputIndex: i, endInputIndex: i })),
    ]
  },
  '16-Seg Dual Shift Register': {
    fileName: '16-Seg Dual Shift',
    shapes: [
      { id: 'clk', type: 'Clock', x: 50, y: 100, width: 80, height: 40, label: 'Clock', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 2 },
      { id: 'c595_1', type: 'IC74HC595', x: 200, y: 50, width: 120, height: 200, label: '74HC595 #1', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595_1', color: 'gray' },
      { id: 'c595_2', type: 'IC74HC595', x: 200, y: 300, width: 120, height: 200, label: '74HC595 #2', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'c595_2', color: 'gray' },
      { id: 'disp16', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 550, label: '16-Seg', inputs: Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp16', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 650, width: 600, height: 50, label: '16-Seg Dual Shift Register: Cascading two 74HC595s for 16-segment control.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'clk', endShapeId: 'c595_1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2', startShapeId: 'clk', endShapeId: 'c595_1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c3', startShapeId: 'clk', endShapeId: 'c595_2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'clk', endShapeId: 'c595_2', startOutputIndex: 0, endInputIndex: 2 },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `q1_${i}`, startShapeId: 'c595_1', endShapeId: 'disp16', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 8 }, (_, i) => ({ id: `q2_${i}`, startShapeId: 'c595_2', endShapeId: 'disp16', startOutputIndex: i, endInputIndex: i + 8 })),
    ]
  },
  '16-Seg Logic Pattern': {
    fileName: '16-Seg Logic',
    shapes: [
      { id: 'sw1', type: 'ToggleSwitch', x: 50, y: 50, width: 100, height: 50, label: 'Symbol 1', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw1', color: 'gray' },
      { id: 'sw2', type: 'ToggleSwitch', x: 50, y: 150, width: 100, height: 50, label: 'Symbol 2', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw2', color: 'gray' },
      { id: 'gate', type: 'IC7432', x: 200, y: 50, width: 160, height: 80, label: '74LS32', inputs: [{ x: 40, y: 80, label: '1A', value: 0, name: '1a' }, { x: 60, y: 80, label: '1B', value: 0, name: '1b' }, { x: 100, y: 80, label: '2A', value: 0, name: '2a' }, { x: 120, y: 80, label: '2B', value: 0, name: '2b' }, { x: 100, y: 0, label: '3A', value: 0, name: '3a' }, { x: 120, y: 0, label: '3B', value: 0, name: '3b' }, { x: 40, y: 0, label: '4A', value: 0, name: '4a' }, { x: 60, y: 0, label: '4B', value: 0, name: '4b' }, { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }], outputs: [{ x: 20, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 80, y: 80, label: '2Y', value: 0, name: '2y' }, { x: 140, y: 0, label: '3Y', value: 0, name: '3y' }, { x: 80, y: 0, label: '4Y', value: 0, name: '4y' }], name: 'gate', color: 'gray' },
      { id: 'disp16', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 550, label: '16-Seg', inputs: Array.from({ length: 16 }, (_, i) => ({ x: 0, y: 10 + i * 25, label: `S${i + 1}`, value: 0, name: `seg_${i}` })), outputs: [], name: 'disp16', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 650, width: 600, height: 50, label: '16-Seg Logic Pattern: Using OR gates to combine signals for complex symbols.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw1', endShapeId: 'gate', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw2', endShapeId: 'gate', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'gate', endShapeId: 'disp16', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'gate', endShapeId: 'disp16', startOutputIndex: 0, endInputIndex: 8 },
    ]
  },
  'PWM LED Dimmer': {
    fileName: 'PWM LED Dimmer',
    shapes: [
      { id: 'pwm', type: 'PWM_Block', x: 200, y: 100, width: 100, height: 80, label: 'PWM', inputs: [{ x: 0, y: 20, label: 'Duty', value: 0, name: 'duty' }, { x: 0, y: 50, label: 'Freq', value: 0, name: 'freq' }], outputs: [{ x: 100, y: 35, label: 'Out', value: 0, name: 'out' }], name: 'pwm', color: 'gray' },
      { id: 'pot', type: 'Potentiometer', x: 50, y: 100, width: 60, height: 80, label: 'Duty', inputs: [{ x: 0, y: 15, label: 'A', value: 1, name: 'a' }, { x: 0, y: 65, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 60, y: 40, label: 'W', value: 0.5, name: 'w' }], name: 'pot', color: 'gray' },
      { id: 'led', type: 'LED', x: 400, y: 120, width: 40, height: 40, label: 'LED', inputs: [{ x: 0, y: 20, label: 'A', value: 0, name: 'a' }, { x: 40, y: 20, label: 'K', value: 0, name: 'k' }], outputs: [], name: 'led', color: 'red' },
      { id: 'gnd', type: 'GND', x: 450, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'PWM LED Dimmer: Use the potentiometer to adjust LED brightness via PWM.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'pot', endShapeId: 'pwm', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'pwm', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'gnd', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  'Summing Amplifier': {
    fileName: 'Summing Amp',
    shapes: [
      { id: 'op', type: 'OpAmp', x: 300, y: 100, width: 100, height: 80, label: 'Op-Amp', inputs: [{ x: 0, y: 20, label: '+', value: 0, name: 'in_p' }, { x: 0, y: 60, label: '-', value: 0, name: 'in_n' }], outputs: [{ x: 100, y: 40, label: 'Y', value: 0, name: 'out_y' }], name: 'op', color: 'gray' },
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 50, width: 60, height: 40, label: 'V1', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 2, name: 'pos' }], name: 'v1', color: 'gray' },
      { id: 'v2', type: 'DC_Voltage_Source', x: 50, y: 150, width: 60, height: 40, label: 'V2', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 3, name: 'pos' }], name: 'v2', color: 'gray' },
      { id: 'r1', type: 'Resistor', x: 150, y: 50, width: 60, height: 20, label: '10k', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 10, label: '2', value: 0, name: 'p2' }], name: 'r1', color: 'gray' },
      { id: 'r2', type: 'Resistor', x: 150, y: 150, width: 60, height: 20, label: '10k', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 10, label: '2', value: 0, name: 'p2' }], name: 'r2', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 250, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 100, width: 120, height: 80, label: 'Scope', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Summing Amplifier: Analog addition of two voltage sources using an Op-Amp.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'r1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v2', endShapeId: 'r2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'r1', endShapeId: 'op', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c4', startShapeId: 'r2', endShapeId: 'op', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'gnd', endShapeId: 'op', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'op', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Bridge Rectifier Demo': {
    fileName: 'Bridge Rectifier',
    shapes: [
      { id: 'ac', type: 'AC_Voltage_Source', x: 50, y: 100, width: 60, height: 40, label: 'AC 12V', inputs: [], outputs: [{ x: 60, y: 10, label: 'L', value: 0, name: 'line' }, { x: 60, y: 30, label: 'N', value: 0, name: 'neutral' }], name: 'ac', color: 'gray' },
      { id: 'br', type: 'Bridge_Rectifier', x: 200, y: 80, width: 80, height: 80, label: 'Bridge', inputs: [{ x: 0, y: 20, label: '~', value: 0, name: 'ac1' }, { x: 0, y: 60, label: '~', value: 0, name: 'ac2' }], outputs: [{ x: 80, y: 20, label: '+', value: 0, name: 'pos' }, { x: 80, y: 60, label: '-', value: 0, name: 'neg' }], name: 'br', color: 'gray' },
      { id: 'cap', type: 'Polarized_Capacitor', x: 320, y: 80, width: 40, height: 80, label: '1000uF', inputs: [{ x: 0, y: 20, label: '+', value: 0, name: 'pos' }, { x: 0, y: 60, label: '-', value: 0, name: 'neg' }], outputs: [], name: 'cap', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 80, width: 120, height: 80, label: 'Output', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Bridge Rectifier: Converting AC to DC with smoothing capacitor.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'ac', endShapeId: 'br', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'ac', endShapeId: 'br', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'br', endShapeId: 'cap', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'br', endShapeId: 'cap', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c5', startShapeId: 'br', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Darlington Motor Driver': {
    fileName: 'Darlington Driver',
    shapes: [
      { id: 'sw', type: 'ToggleSwitch', x: 50, y: 100, width: 100, height: 50, label: 'Switch', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw', color: 'gray' },
      { id: 'dr', type: 'Darlington_NPN', x: 200, y: 100, width: 60, height: 60, label: 'Darlington', inputs: [{ x: 0, y: 30, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 30, y: 0, label: 'C', value: 0, name: 'c' }, { x: 30, y: 60, label: 'E', value: 0, name: 'e' }], name: 'dr', color: 'gray' },
      { id: 'motor', type: 'Motor', x: 350, y: 50, width: 80, height: 80, label: 'DC Motor', inputs: [{ x: 0, y: 20, label: '+', value: 0, name: 'p1' }, { x: 0, y: 60, label: '-', value: 0, name: 'p2' }], outputs: [], name: 'motor', color: 'gray' },
      { id: 'bat', type: 'Battery', x: 500, y: 100, width: 60, height: 80, label: '12V', inputs: [], outputs: [{ x: 30, y: 0, label: '+', value: 12, name: 'pos' }, { x: 30, y: 80, label: '-', value: 0, name: 'neg' }], name: 'bat', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 210, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Darlington Motor Driver: High-gain transistor configuration for driving heavy loads.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'bat', endShapeId: 'motor', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'motor', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'dr', endShapeId: 'gnd', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'bat', endShapeId: 'gnd', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'LDR Light Switch': {
    fileName: 'LDR Switch',
    shapes: [
      { id: 'ldr', type: 'LDR', x: 50, y: 100, width: 40, height: 40, label: 'LDR', inputs: [{ x: 0, y: 20, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 40, y: 20, label: '2', value: 0, name: 'p2' }], name: 'ldr', color: 'gray' },
      { id: 'vcc', type: 'VCC', x: 50, y: 20, width: 40, height: 40, label: 'VCC', inputs: [], outputs: [{ x: 20, y: 40, label: '5V', value: 5, name: 'vcc' }], name: 'vcc', color: 'gray' },
      { id: 'r1', type: 'Resistor', x: 150, y: 100, width: 60, height: 20, label: '10k', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 10, label: '2', value: 0, name: 'p2' }], name: 'r1', color: 'gray' },
      { id: 'q1', type: 'Transistor_NPN', x: 250, y: 100, width: 60, height: 60, label: 'NPN', inputs: [{ x: 0, y: 30, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 30, y: 0, label: 'C', value: 0, name: 'c' }, { x: 30, y: 60, label: 'E', value: 0, name: 'e' }], name: 'q1', color: 'gray' },
      { id: 'relay', type: 'Relay', x: 350, y: 50, width: 80, height: 80, label: 'Relay', inputs: [{ x: 0, y: 20, label: 'C1', value: 0, name: 'c1' }, { x: 0, y: 60, label: 'C2', value: 0, name: 'c2' }], outputs: [{ x: 80, y: 40, label: 'SW', value: 0, name: 'sw' }], name: 'relay', color: 'gray' },
      { id: 'lamp', type: 'Lamp', x: 500, y: 70, width: 60, height: 60, label: 'Lamp', inputs: [{ x: 0, y: 30, label: '1', value: 0, name: 'p1' }, { x: 60, y: 30, label: '2', value: 0, name: 'p2' }], outputs: [], name: 'lamp', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 260, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 280, width: 500, height: 50, label: 'LDR Light Switch: Activates a lamp when light levels drop.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'vcc', endShapeId: 'ldr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'ldr', endShapeId: 'r1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'r1', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'vcc', endShapeId: 'relay', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'relay', endShapeId: 'q1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'q1', endShapeId: 'gnd', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c7', startShapeId: 'relay', endShapeId: 'lamp', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },

  'Summing Control Block': {
    fileName: 'Sum Control',
    shapes: [
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 50, width: 60, height: 40, label: 'V1', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 5, name: 'pos' }], name: 'v1', color: 'gray' },
      { id: 'v2', type: 'DC_Voltage_Source', x: 50, y: 150, width: 60, height: 40, label: 'V2', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 2, name: 'pos' }], name: 'v2', color: 'gray' },
      { id: 'sum', type: 'SUM1', x: 200, y: 100, width: 60, height: 60, label: 'SUM', inputs: [{ x: 0, y: 15, label: '+', value: 0, name: 'in1' }, { x: 0, y: 45, label: '-', value: 0, name: 'in2' }], outputs: [{ x: 60, y: 30, label: 'Y', value: 0, name: 'out' }], name: 'sum', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 350, y: 90, width: 120, height: 80, label: 'Result', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Summing Control Block: Mathematical addition/subtraction of signals.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'sum', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v2', endShapeId: 'sum', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'sum', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Multiplication Block': {
    fileName: 'Mul Block',
    shapes: [
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 50, width: 60, height: 40, label: 'V1', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 4, name: 'pos' }], name: 'v1', color: 'gray' },
      { id: 'v2', type: 'Potentiometer', x: 50, y: 120, width: 60, height: 80, label: 'Gain', inputs: [{ x: 0, y: 15, label: 'A', value: 1, name: 'a' }, { x: 0, y: 65, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 60, y: 40, label: 'W', value: 0.5, name: 'w' }], name: 'v2', color: 'gray' },
      { id: 'mul', type: 'MUL1', x: 200, y: 100, width: 60, height: 60, label: 'MUL', inputs: [{ x: 0, y: 15, label: 'A', value: 0, name: 'in1' }, { x: 0, y: 45, label: 'B', value: 0, name: 'in2' }], outputs: [{ x: 60, y: 30, label: 'Y', value: 0, name: 'out' }], name: 'mul', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 350, y: 90, width: 120, height: 80, label: 'Result', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Multiplication Block: Multiplying two signals (e.g., gain control).', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'mul', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'v2', endShapeId: 'mul', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'mul', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'Zener Voltage Regulator': {
    fileName: 'Zener Regulator',
    shapes: [
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 100, width: 60, height: 40, label: '12V DC', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 12, name: 'pos' }], name: 'v1', color: 'gray' },
      { id: 'r1', type: 'Resistor', x: 150, y: 100, width: 60, height: 20, label: '470R', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 60, y: 10, label: '2', value: 0, name: 'p2' }], name: 'r1', color: 'gray' },
      { id: 'zener', type: 'Zener_Diode', x: 250, y: 100, width: 40, height: 40, label: '5.1V', inputs: [{ x: 0, y: 20, label: 'K', value: 0, name: 'k' }, { x: 40, y: 20, label: 'A', value: 0, name: 'a' }], outputs: [], name: 'zener', color: 'gray' },
      { id: 'meter', type: 'Voltmeter', x: 400, y: 100, width: 80, height: 40, label: 'V-Meter', inputs: [{ x: 0, y: 10, label: '+', value: 0, name: 'pos' }, { x: 0, y: 30, label: '-', value: 0, name: 'neg' }], outputs: [], name: 'meter', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 260, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'Zener Voltage Regulator: Simple voltage regulation using a Zener diode.', inputs: [], outputs: [], name: 'desc', color: '#f59e0b', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'r1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'r1', endShapeId: 'zener', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'zener', endShapeId: 'gnd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'r1', endShapeId: 'meter', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'gnd', endShapeId: 'meter', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },
  'VCO: Voltage Controlled Oscillator': {
    fileName: 'VCO Demo',
    shapes: [
      { id: 'v1', type: 'DC_Voltage_Source', x: 50, y: 100, width: 60, height: 40, label: 'Control V', inputs: [], outputs: [{ x: 60, y: 20, label: '+', value: 5, name: 'pos' }], name: 'v1', color: 'gray' },
      { id: 'vcvs', type: 'VCVS', x: 200, y: 100, width: 80, height: 80, label: 'VCVS', inputs: [{ x: 0, y: 20, label: 'IN+', value: 0, name: 'in_p' }, { x: 0, y: 60, label: 'IN-', value: 0, name: 'in_n' }], outputs: [{ x: 80, y: 40, label: 'OUT', value: 0, name: 'out' }], name: 'vcvs', color: 'gray' },
      { id: 'cap', type: 'Capacitor', x: 350, y: 100, width: 40, height: 60, label: '100nF', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: 'p1' }], outputs: [{ x: 40, y: 10, label: '2', value: 0, name: 'p2' }], name: 'cap', color: 'gray' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 90, width: 120, height: 80, label: 'Output', inputs: [{ x: 0, y: 20, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope', color: 'gray' },
      { id: 'gnd', type: 'GND', x: 210, y: 200, width: 40, height: 40, label: 'GND', inputs: [], outputs: [{ x: 20, y: 0, label: '0V', value: 0, name: 'gnd' }], name: 'gnd', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 250, width: 500, height: 50, label: 'VCO: Voltage Controlled Oscillator using a VCVS and capacitor.', inputs: [], outputs: [], name: 'desc', color: '#3b82f6', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'v1', endShapeId: 'vcvs', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'vcvs', endShapeId: 'cap', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'cap', endShapeId: 'scope', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'gnd', endShapeId: 'vcvs', startOutputIndex: 0, endInputIndex: 1 },
    ]
  },

  'LGT8F328P: Fast PWM Demo': {
    fileName: 'LGT8F328P PWM',
    shapes: [
      { id: 'mcu', type: 'LGT8F328P', x: 200, y: 50, width: 140, height: 280, label: 'LGT8F328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: '#1e3a8a' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 100, width: 150, height: 100, label: 'PWM Output', inputs: [{ x: 0, y: 40, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'LGT8F328P: Fast PWM Demo. Demonstrates the high-speed PWM capabilities of the LGT8F328P core.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'scope', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'LGT8F328P: Internal DAC Output': {
    fileName: 'LGT8F328P DAC',
    shapes: [
      { id: 'mcu', type: 'LGT8F328P', x: 200, y: 50, width: 140, height: 280, label: 'LGT8F328P', inputs: Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `D${i}`, value: 0, name: `d${i}` })), outputs: Array.from({ length: 8 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: '#1e3a8a' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 100, width: 150, height: 100, label: 'DAC Waveform', inputs: [{ x: 0, y: 40, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope' },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 50, label: 'LGT8F328P: Internal DAC Output. Shows the built-in 8-bit DAC generating a sawtooth waveform.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'scope', startOutputIndex: 4, endInputIndex: 0 },
    ]
  },
  'ATmega16: 8-Bit Port Counter': {
    fileName: 'ATmega16 Counter',
    shapes: [
      { id: 'mcu', type: 'ATmega16', x: 200, y: 50, width: 140, height: 320, label: 'ATmega16', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `PA${i}`, value: 0, name: `pa${i}` })), outputs: Array.from({ length: 12 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PC${i}`, value: 0, name: `pc${i}` })), name: 'mcu', color: '#374151' },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: 'Port C Low', inputs: [{ x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' }, { x: 0, y: 55, label: 'D2', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D3', value: 0, name: 'd3' }], outputs: [], name: 'disp' },
      { id: 't1', type: 'Text', x: 50, y: 400, width: 600, height: 50, label: 'ATmega16: 8-Bit Port Counter. Increments a value on Port C, visualized on a Hex display.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'disp', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'mcu', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'c4', startShapeId: 'mcu', endShapeId: 'disp', startOutputIndex: 3, endInputIndex: 3 },
    ]
  },
  'ATmega16: External Interrupt Lab': {
    fileName: 'ATmega16 Interrupt',
    shapes: [
      { id: 'mcu', type: 'ATmega16', x: 200, y: 50, width: 140, height: 320, label: 'ATmega16', inputs: Array.from({ length: 12 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `PA${i}`, value: 0, name: `pa${i}` })), outputs: Array.from({ length: 12 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `PC${i}`, value: 0, name: `pc${i}` })), name: 'mcu', color: '#374151' },
      { id: 'btn', type: 'PushButton', x: 50, y: 150, width: 100, height: 50, label: 'INT0 Trigger', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'btn' },
      { id: 'led', type: 'OutPutL', x: 450, y: 150, width: 60, height: 30, label: 'Status', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led' },
      { id: 't1', type: 'Text', x: 50, y: 400, width: 600, height: 50, label: 'ATmega16: External Interrupt Lab. Toggles an LED on Port C when an external interrupt is triggered on Port D.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'btn', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'ATtiny85: Compact Blink': {
    fileName: 'ATtiny85 Blink',
    shapes: [
      { id: 'mcu', type: 'ATtiny85', x: 250, y: 100, width: 100, height: 160, label: 'ATtiny85', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 35, label: `PB${i + 3}`, value: 0, name: `pb${i + 3}` })), outputs: Array.from({ length: 3 }, (_, i) => ({ x: 100, y: 15 + i * 35, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: '#1f2937' },
      { id: 'led', type: 'OutPutL', x: 450, y: 120, width: 60, height: 30, label: 'Blink LED', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'red' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: 'ATtiny85: Compact Blink. A minimal blink circuit using the 8-pin ATtiny85 microcontroller.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'ATtiny85: PWM Dimmer': {
    fileName: 'ATtiny85 Dimmer',
    shapes: [
      { id: 'mcu', type: 'ATtiny85', x: 250, y: 100, width: 100, height: 160, label: 'ATtiny85', inputs: Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 15 + i * 35, label: `PB${i + 3}`, value: 0, name: `pb${i + 3}` })), outputs: Array.from({ length: 3 }, (_, i) => ({ x: 100, y: 15 + i * 35, label: `PB${i}`, value: 0, name: `pb${i}` })), name: 'mcu', color: '#1f2937' },
      { id: 'pot', type: 'Potentiometer', x: 50, y: 120, width: 100, height: 100, label: 'Brightness', inputs: [], outputs: [{ x: 80, y: 50, label: 'W', value: 0, name: 'w' }], name: 'pot' },
      { id: 'led', type: 'OutPutL', x: 450, y: 120, width: 60, height: 30, label: 'PWM LED', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led', color: 'yellow' },
      { id: 't1', type: 'Text', x: 50, y: 300, width: 500, height: 50, label: 'ATtiny85: PWM Dimmer. Reads an analog value and controls LED brightness via PWM.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'pot', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'led', startOutputIndex: 1, endInputIndex: 0 },
    ]
  },
  'PIC18F2520: ADC Reading': {
    fileName: 'PIC18F2520 ADC',
    shapes: [
      { id: 'mcu', type: 'PIC18F2520', x: 200, y: 50, width: 140, height: 300, label: 'PIC18F2520', inputs: Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `RA${i}`, value: 0, name: `ra${i}` })), outputs: Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `RB${i}`, value: 0, name: `rb${i}` })), name: 'mcu', color: '#065f46' },
      { id: 'pot', type: 'Potentiometer', x: 50, y: 100, width: 100, height: 100, label: 'Sensor Input', inputs: [], outputs: [{ x: 80, y: 50, label: 'W', value: 0, name: 'w' }], name: 'pot' },
      { id: 'oled', type: 'OLED_Display', x: 450, y: 150, width: 150, height: 80, label: 'ADC Value', inputs: [{ x: 0, y: 40, label: 'Signal', value: 0, name: 'sig' }], outputs: [], name: 'oled' },
      { id: 't1', type: 'Text', x: 50, y: 380, width: 600, height: 50, label: 'PIC18F2520: ADC Reading. Demonstrates reading an analog voltage and displaying the digital result.', inputs: [], outputs: [], name: 'desc', color: '#34d399', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'pot', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'oled', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  'PIC18F2520: SPI Communication': {
    fileName: 'PIC18F2520 SPI',
    shapes: [
      { id: 'mcu', type: 'PIC18F2520', x: 200, y: 50, width: 140, height: 300, label: 'PIC18F2520', inputs: Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `RA${i}`, value: 0, name: `ra${i}` })), outputs: Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `RB${i}`, value: 0, name: `rb${i}` })), name: 'mcu', color: '#065f46' },
      { id: 'sr', type: 'IC74HC595', x: 450, y: 100, width: 120, height: 180, label: 'SPI Peripheral', inputs: [{ x: 0, y: 15, label: 'DS', value: 0, name: 'ds' }, { x: 0, y: 35, label: 'SHCP', value: 0, name: 'shcp' }, { x: 0, y: 55, label: 'STCP', value: 0, name: 'stcp' }, { x: 0, y: 75, label: 'OE', value: 0, name: 'oe' }, { x: 0, y: 95, label: 'MR', value: 1, name: 'mr' }], outputs: Array.from({ length: 8 }, (_, i) => ({ x: 120, y: 15 + i * 20, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'sr' },
      { id: 't1', type: 'Text', x: 50, y: 380, width: 600, height: 50, label: 'PIC18F2520: SPI Communication. The PIC sends data to a shift register using the SPI protocol.', inputs: [], outputs: [], name: 'desc', color: '#34d399', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'sr', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'sr', startOutputIndex: 2, endInputIndex: 1 },
      { id: 'c3', startShapeId: 'mcu', endShapeId: 'sr', startOutputIndex: 3, endInputIndex: 2 },
    ]
  },
  'ESP32: Dual Core Tasking': {
    fileName: 'ESP32 Dual Core',
    shapes: [
      { id: 'mcu', type: 'ESP32', x: 200, y: 50, width: 160, height: 340, label: 'ESP32', inputs: Array.from({ length: 15 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `G${i}`, value: 0, name: `g${i}` })), outputs: Array.from({ length: 15 }, (_, i) => ({ x: 160, y: 15 + i * 20, label: `G${i + 15}`, value: 0, name: `g${i + 15}` })), name: 'mcu', color: '#111827' },
      { id: 'led1', type: 'OutPutL', x: 450, y: 100, width: 60, height: 30, label: 'Core 0 Task', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led1', color: 'blue' },
      { id: 'led2', type: 'OutPutL', x: 450, y: 200, width: 60, height: 30, label: 'Core 1 Task', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led2', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 420, width: 600, height: 50, label: 'ESP32: Dual Core Tasking. Demonstrates independent tasks running on both cores of the ESP32.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'led1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'led2', startOutputIndex: 5, endInputIndex: 0 },
    ]
  },
  'ESP32: Wi-Fi Status Monitor': {
    fileName: 'ESP32 Wi-Fi',
    shapes: [
      { id: 'mcu', type: 'ESP32', x: 200, y: 50, width: 160, height: 340, label: 'ESP32', inputs: Array.from({ length: 15 }, (_, i) => ({ x: 0, y: 15 + i * 20, label: `G${i}`, value: 0, name: `g${i}` })), outputs: Array.from({ length: 15 }, (_, i) => ({ x: 160, y: 15 + i * 20, label: `G${i + 15}`, value: 0, name: `g${i + 15}` })), name: 'mcu', color: '#111827' },
      { id: 'oled', type: 'OLED_Display', x: 450, y: 150, width: 150, height: 80, label: 'Network Status', inputs: [{ x: 0, y: 40, label: 'Signal', value: 0, name: 'sig' }], outputs: [], name: 'oled' },
      { id: 't1', type: 'Text', x: 50, y: 420, width: 600, height: 50, label: 'ESP32: Wi-Fi Status Monitor. Simulates network connectivity status on an OLED display.', inputs: [], outputs: [], name: 'desc', color: '#9ca3af', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'oled', startOutputIndex: 2, endInputIndex: 0 },
    ]
  },
  'RP2040: Dual Core Blink': {
    fileName: 'RP2040 Blink',
    shapes: [
      { id: 'mcu', type: 'RP2040', x: 200, y: 50, width: 140, height: 300, label: 'RP2040', inputs: Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `GP${i}`, value: 0, name: `gp${i}` })), outputs: Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `GP${i + 10}`, value: 0, name: `gp${i + 10}` })), name: 'mcu', color: '#1e40af' },
      { id: 'led1', type: 'OutPutL', x: 450, y: 100, width: 60, height: 30, label: 'LED 0', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led1', color: 'red' },
      { id: 'led2', type: 'OutPutL', x: 450, y: 200, width: 60, height: 30, label: 'LED 1', inputs: [{ x: 30, y: 15, label: 'In', value: 0, name: 'in' }], outputs: [], name: 'led2', color: 'green' },
      { id: 't1', type: 'Text', x: 50, y: 380, width: 600, height: 50, label: 'RP2040: Dual Core Blink. Two independent blink patterns running on the RP2040 dual-core processor.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'led1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'mcu', endShapeId: 'led2', startOutputIndex: 5, endInputIndex: 0 },
    ]
  },
  'RP2040: PIO State Machine Demo': {
    fileName: 'RP2040 PIO',
    shapes: [
      { id: 'mcu', type: 'RP2040', x: 200, y: 50, width: 140, height: 300, label: 'RP2040', inputs: Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 15 + i * 25, label: `GP${i}`, value: 0, name: `gp${i}` })), outputs: Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 25, label: `GP${i + 10}`, value: 0, name: `gp${i + 10}` })), name: 'mcu', color: '#1e40af' },
      { id: 'scope', type: 'Oscilloscope', x: 450, y: 100, width: 150, height: 100, label: 'PIO Output', inputs: [{ x: 0, y: 40, label: 'CH1', value: 0, name: 'ch1' }], outputs: [], name: 'scope' },
      { id: 't1', type: 'Text', x: 50, y: 380, width: 600, height: 50, label: 'RP2040: PIO State Machine Demo. Demonstrates the Programmable I/O (PIO) generating complex timing signals.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'mcu', endShapeId: 'scope', startOutputIndex: 2, endInputIndex: 0 },
    ]
  },
  'TD-7000 Radio Receiver': {
    fileName: 'TD-7000 Receiver',
    shapes: [
      { id: 'ic1', type: 'IC_TD7000', x: 400, y: 300, width: 160, height: 200, label: 'TD-7000', inputs: [
        { x: 0, y: 20, label: '1', value: 0, name: 'p1' },
        { x: 0, y: 40, label: '2', value: 0, name: 'p2' },
        { x: 0, y: 60, label: '3', value: 0, name: 'p3' },
        { x: 0, y: 80, label: '4', value: 0, name: 'p4' },
        { x: 0, y: 100, label: '5', value: 0, name: 'p5' },
        { x: 0, y: 120, label: '6', value: 0, name: 'p6' },
        { x: 0, y: 140, label: '7', value: 0, name: 'p7' },
        { x: 0, y: 160, label: '8', value: 0, name: 'p8' },
        { x: 0, y: 180, label: '9', value: 0, name: 'p9' },
      ], outputs: [
        { x: 160, y: 20, label: '10', value: 0, name: 'p10' },
        { x: 160, y: 40, label: '11', value: 0, name: 'p11' },
        { x: 160, y: 60, label: '12', value: 0, name: 'p12' },
        { x: 160, y: 80, label: '13', value: 0, name: 'p13' },
        { x: 160, y: 100, label: '14', value: 0, name: 'p14' },
        { x: 160, y: 120, label: '15', value: 0, name: 'p15' },
        { x: 160, y: 140, label: '16', value: 0, name: 'p16' },
        { x: 160, y: 160, label: '17', value: 0, name: 'p17' },
        { x: 160, y: 180, label: '18', value: 0, name: 'p18' },
      ], name: 'ic1', color: 'gray' },
      { id: 'ant1', type: 'Antenna', x: 100, y: 150, width: 40, height: 40, label: 'Antenna', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'ant1', color: 'gray' },
      { id: 'c1', type: 'Variable_Capacitor', x: 250, y: 150, width: 50, height: 25, label: 'Tuning', inputs: [{ x: 0, y: 12, label: 'A', value: 0, name: 'a' }], outputs: [{ x: 50, y: 12, label: 'B', value: 0, name: 'b' }], name: 'c1', color: 'gray', rotation: 90 },
      { id: 'l1', type: 'Coil', x: 250, y: 250, width: 50, height: 25, label: 'L1', inputs: [{ x: 0, y: 12, label: 'A', value: 0, name: 'a' }], outputs: [{ x: 50, y: 12, label: 'B', value: 0, name: 'b' }], name: 'l1', color: 'gray', rotation: 90 },
      { id: 'r1', type: 'Resistor', x: 300, y: 400, width: 50, height: 25, label: '10k', inputs: [{ x: 0, y: 12, label: 'A', value: 0, name: 'a' }], outputs: [{ x: 50, y: 12, label: 'B', value: 0, name: 'b' }], name: 'r1', color: 'gray' },
      { id: 'spk1', type: 'Speaker', x: 700, y: 300, width: 40, height: 40, label: 'Speaker', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'spk1', color: 'gray' },
      { id: 'vcc1', type: 'VCC', x: 480, y: 100, width: 40, height: 40, label: '9V', inputs: [], outputs: [{ x: 20, y: 40, label: 'VCC', value: 1, name: 'vcc' }], name: 'vcc1', color: 'gray' },
      { id: 'gnd1', type: 'GND', x: 480, y: 600, width: 40, height: 40, label: 'GND', inputs: [{ x: 20, y: 0, label: 'GND', value: 0, name: 'gnd' }], outputs: [], name: 'gnd1', color: 'gray' },
      { id: 'c2', type: 'Polarized_Capacitor', x: 600, y: 300, width: 50, height: 25, label: '10uF', inputs: [{ x: 0, y: 12, label: '+', value: 0, name: 'pos' }], outputs: [{ x: 50, y: 12, label: '-', value: 0, name: 'neg' }], name: 'c2', color: 'gray' },
      { id: 't1', type: 'Text', x: 50, y: 50, width: 700, height: 50, label: 'TD-7000 Radio Receiver Circuit: Demonstrating complex IC integration and component rotation.', inputs: [], outputs: [], name: 'desc', color: '#fbbf24', font: '18px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'con1', startShapeId: 'ant1', endShapeId: 'c1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'con2', startShapeId: 'c1', endShapeId: 'ic1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'con3', startShapeId: 'l1', endShapeId: 'ic1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'con4', startShapeId: 'ic1', endShapeId: 'c2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'con5', startShapeId: 'c2', endShapeId: 'spk1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'con6', startShapeId: 'vcc1', endShapeId: 'ic1', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'con7', startShapeId: 'ic1', endShapeId: 'gnd1', startOutputIndex: 0, endInputIndex: 0 },
    ]
  },
  '16-Seg Numbers': {
    fileName: '16-Seg Numbers',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      ...[
        [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0], // 0
        [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0], // 1
        [1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0], // 2
        [1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0], // 3
        [0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0], // 4
        [1,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0], // 5
        [1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0], // 6
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0], // 7
        [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0], // 8
        [1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0], // 9
      ].map((segments, i) => ({
        id: `d${i}`,
        type: 'Display16Segment',
        x: 150 + (i % 5) * 120,
        y: 50 + Math.floor(i / 5) * 250,
        width: 100,
        height: 200,
        label: `"${i}"`,
        inputs: segments.map((v, j) => ({
          x: 0, y: 10 + j * 12, label: `S${j + 1}`, value: v, name: `seg_${j}`
        })),
        outputs: [],
        name: `d${i}`,
        color: 'gray',
        prevInputs: segments
      })),
      { id: 't1', type: 'Text', x: 50, y: 550, width: 600, height: 50, label: '16-Segment Numbers: Demonstrating digits 0-9 on 16-segment displays.', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Orbitron' },
    ] as Shape[],
    connectors: []
  },
  '16-Seg A-D': {
    fileName: '16-Seg A-D',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'da', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"A"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'da', color: 'gray', prevInputs: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
      { id: 'db', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"B"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'db', color: 'gray', prevInputs: [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1] },
      { id: 'dc', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"C"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dc', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'dd', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"D"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'dd', color: 'gray', prevInputs: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo:\n- This display uses 16 segments to represent all alphanumeric characters and symbols.\n- "A": a1, a2, b, c, e, f, g1, g2\n- "B": a1, a2, b, c, d1, d2, g2, l, m\n- "C": a1, a2, d1, d2, e, f\n- "D": a1, a2, b, c, d1, d2, l, m', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'ca_0', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca_1', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ca_2', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'ca_3', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'ca_6', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'ca_7', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'ca_8', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'ca_9', startShapeId: 'h', endShapeId: 'da', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'cb_0', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cb_1', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cb_2', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cb_3', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cb_4', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cb_5', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cb_9', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'cb_14', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'cb_15', startShapeId: 'h', endShapeId: 'db', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'cc_0', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cc_1', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cc_4', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cc_5', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cc_6', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cc_7', startShapeId: 'h', endShapeId: 'dc', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cd_0', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cd_1', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cd_2', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cd_3', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cd_4', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cd_5', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cd_14', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'cd_15', startShapeId: 'h', endShapeId: 'dd', startOutputIndex: 0, endInputIndex: 15 },
    ]
  },
  '16-Seg E-H': {
    fileName: '16-Seg E-H',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'de', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"E"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'de', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'df', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"F"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'df', color: 'gray', prevInputs: [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'dg', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"G"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dg', color: 'gray', prevInputs: [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0] },
      { id: 'dh', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"H"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dh', color: 'gray', prevInputs: [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (E-H):\n- "E": a1, a2, d1, d2, e, f, g1\n- "F": a1, a2, e, f, g1\n- "G": a1, a2, c, d1, d2, e, f, g2\n- "H": b, c, e, f, g1, g2', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'ce_0', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ce_1', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ce_4', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'ce_5', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'ce_6', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'ce_7', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'ce_8', startShapeId: 'h', endShapeId: 'de', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cf_0', startShapeId: 'h', endShapeId: 'df', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cf_1', startShapeId: 'h', endShapeId: 'df', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cf_6', startShapeId: 'h', endShapeId: 'df', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cf_7', startShapeId: 'h', endShapeId: 'df', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cf_8', startShapeId: 'h', endShapeId: 'df', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cg_0', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cg_1', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cg_3', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cg_4', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cg_5', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cg_6', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cg_7', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cg_9', startShapeId: 'h', endShapeId: 'dg', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'chh_2', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'chh_3', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'chh_6', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'chh_7', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'chh_8', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'chh_9', startShapeId: 'h', endShapeId: 'dh', startOutputIndex: 0, endInputIndex: 9 },
    ]
  },
  '16-Seg I-L': {
    fileName: '16-Seg I-L',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'di', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"I"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'di', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
      { id: 'dj', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"J"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dj', color: 'gray', prevInputs: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'dk', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"K"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dk', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0] },
      { id: 'dl', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"L"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dl', color: 'gray', prevInputs: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (I-L):\n- "I": a1, a2, d1, d2, l, m\n- "J": b, c, d1, d2, e\n- "K": g1, g2, h, i\n- "L": d1, d2, e, f', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'ci_0', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ci_1', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ci_4', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'ci_5', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'ci_14', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'ci_15', startShapeId: 'h', endShapeId: 'di', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'cj_2', startShapeId: 'h', endShapeId: 'dj', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cj_3', startShapeId: 'h', endShapeId: 'dj', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cj_4', startShapeId: 'h', endShapeId: 'dj', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cj_5', startShapeId: 'h', endShapeId: 'dj', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cj_6', startShapeId: 'h', endShapeId: 'dj', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'ck_6', startShapeId: 'h', endShapeId: 'dk', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'ck_7', startShapeId: 'h', endShapeId: 'dk', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'ck_8', startShapeId: 'h', endShapeId: 'dk', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'ck_11', startShapeId: 'h', endShapeId: 'dk', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'ck_12', startShapeId: 'h', endShapeId: 'dk', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cl_4', startShapeId: 'h', endShapeId: 'dl', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cl_5', startShapeId: 'h', endShapeId: 'dl', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cl_6', startShapeId: 'h', endShapeId: 'dl', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cl_7', startShapeId: 'h', endShapeId: 'dl', startOutputIndex: 0, endInputIndex: 7 },
    ]
  },
  '16-Seg M-P': {
    fileName: '16-Seg M-P',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'dm', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"M"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dm', color: 'gray', prevInputs: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0] },
      { id: 'dn', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"N"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dn', color: 'gray', prevInputs: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0] },
      { id: 'do', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"O"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'do', color: 'gray', prevInputs: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'dp', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"P"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dp', color: 'gray', prevInputs: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (M-P):\n- "M": b, c, e, f, h, i\n- "N": b, c, e, f, h, j\n- "O": a1, a2, b, c, d1, d2, e, f\n- "P": a1, a2, b, e, f, g1, g2', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'cm_2', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cm_3', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cm_6', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cm_7', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cm_10', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'cm_11', startShapeId: 'h', endShapeId: 'dm', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cn_2', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cn_3', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cn_6', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cn_7', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cn_10', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'cn_12', startShapeId: 'h', endShapeId: 'dn', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'co_0', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'co_1', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'co_2', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'co_3', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'co_4', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'co_5', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'co_6', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'co_7', startShapeId: 'h', endShapeId: 'do', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cp_0', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cp_1', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cp_2', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cp_6', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cp_7', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cp_8', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cp_9', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 9 },
    ]
  },
  '16-Seg Q-T': {
    fileName: '16-Seg Q-T',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'dq', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"Q"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dq', color: 'gray', prevInputs: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0] },
      { id: 'dr', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"R"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dr', color: 'gray', prevInputs: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0] },
      { id: 'ds', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"S"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'ds', color: 'gray', prevInputs: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
      { id: 'dt', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"T"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'dt', color: 'gray', prevInputs: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (Q-T):\n- "Q": a1, a2, b, c, d1, d2, e, f, l\n- "R": a1, a2, b, e, f, g1, g2, l\n- "S": a1, a2, d1, d2, f, g1, g2, h, i\n- "T": a1, a2, m, n', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'cq_0', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cq_1', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cq_2', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cq_3', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cq_4', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cq_5', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cq_6', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cq_7', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cq_12', startShapeId: 'h', endShapeId: 'dq', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cr_0', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cr_1', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cr_2', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cr_6', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cr_7', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cr_8', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cr_9', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'cr_12', startShapeId: 'h', endShapeId: 'dr', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cs_0', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cs_1', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cs_3', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cs_4', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cs_5', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cs_7', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cs_8', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cs_9', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'ct_0', startShapeId: 'h', endShapeId: 'dt', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ct_1', startShapeId: 'h', endShapeId: 'dt', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ct_14', startShapeId: 'h', endShapeId: 'dt', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'ct_15', startShapeId: 'h', endShapeId: 'dt', startOutputIndex: 0, endInputIndex: 15 },
    ]
  },
  '16-Seg U-X': {
    fileName: '16-Seg U-X',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'du', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"U"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'du', color: 'gray', prevInputs: [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 'dv', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"V"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dv', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0] },
      { id: 'dw', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"W"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 1, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dw', color: 'gray', prevInputs: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0] },
      { id: 'dx', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"X"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dx', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (U-X):\n- "U": b, c, d1, d2, e, f\n- "V": e, f, k, m\n- "W": b, c, e, f, l, m\n- "X": h, i, j, k', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'cu_2', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cu_3', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cu_4', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cu_5', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cu_6', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cu_7', startShapeId: 'h', endShapeId: 'du', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cv_6', startShapeId: 'h', endShapeId: 'dv', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cv_7', startShapeId: 'h', endShapeId: 'dv', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cv_11', startShapeId: 'h', endShapeId: 'dv', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cv_13', startShapeId: 'h', endShapeId: 'dv', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'cw_2', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cw_3', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cw_6', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'cw_7', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cw_12', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cw_13', startShapeId: 'h', endShapeId: 'dw', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'cx_10', startShapeId: 'h', endShapeId: 'dx', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'cx_11', startShapeId: 'h', endShapeId: 'dx', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cx_12', startShapeId: 'h', endShapeId: 'dx', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cx_13', startShapeId: 'h', endShapeId: 'dx', startOutputIndex: 0, endInputIndex: 13 },
    ]
  },
  '16-Seg Y-Z': {
    fileName: '16-Seg Y-Z',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 'dy', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: '"Y"', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'dy', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1] },
      { id: 'dz', type: 'Display16Segment', x: 300, y: 50, width: 100, height: 200, label: '"Z"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dz', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0] },
      { id: 'dp', type: 'Display16Segment', x: 450, y: 50, width: 100, height: 200, label: '"%"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 'dp', color: 'gray', prevInputs: [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0] },
      { id: 'ds', type: 'Display16Segment', x: 600, y: 50, width: 100, height: 200, label: '"$"', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 1, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 'ds', color: 'gray', prevInputs: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1] },
      { id: 't1', type: 'Text', x: 50, y: 350, width: 800, height: 100, label: '16-Segment Alphanumeric Demo (Y-Z & Symbols):\n- "Y": h, i, n\n- "Z": a1, a2, d1, d2, k, m\n- "%": a1, d2, e, h, i, j, k, l, m, g2\n- "$": a1, a2, d1, d2, f, g1, g2, h, m, n', inputs: [], outputs: [], name: 'desc', color: '#10b981', font: '14px Inter', prevInputs: [] },
    ] as Shape[],
    connectors: [
      { id: 'cy_10', startShapeId: 'h', endShapeId: 'dy', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'cy_11', startShapeId: 'h', endShapeId: 'dy', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cy_15', startShapeId: 'h', endShapeId: 'dy', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'cz_0', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cz_1', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cz_4', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cz_5', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cz_11', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cz_13', startShapeId: 'h', endShapeId: 'dz', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'cp_0', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cp_3', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cp_4', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cp_7', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cp_8', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cp_9', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'cp_10', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'cp_11', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'cp_12', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'cp_13', startShapeId: 'h', endShapeId: 'dp', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'cs_0', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cs_1', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cs_3', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cs_4', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cs_5', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'cs_7', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'cs_8', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'cs_9', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'cs_14', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'cs_15', startShapeId: 'h', endShapeId: 'ds', startOutputIndex: 0, endInputIndex: 15 },
    ]
  },
  '16-Seg Symbols': {
    fileName: '16-Seg Symbols',
    shapes: [
      { id: 'h', type: 'HighConstant', x: 50, y: 50, width: 60, height: 40, label: '1', inputs: [], outputs: [{ x: 50, y: 20, label: 'Out', value: 1, name: 'out' }], name: 'h', color: 'gray', prevInputs: [] },
      { id: 's0', type: 'Display16Segment', x: 150, y: 50, width: 100, height: 200, label: 'Sym 1', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's0', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
      { id: 's1', type: 'Display16Segment', x: 270, y: 50, width: 100, height: 200, label: 'Sym 2', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 1, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 's1', color: 'gray', prevInputs: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 's2', type: 'Display16Segment', x: 390, y: 50, width: 100, height: 200, label: 'Sym 3', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's2', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1] },
      { id: 's3', type: 'Display16Segment', x: 510, y: 50, width: 100, height: 200, label: 'Sym 4', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's3', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1] },
      { id: 's4', type: 'Display16Segment', x: 630, y: 50, width: 100, height: 200, label: 'Sym 5', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's4', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1] },
      { id: 's5', type: 'Display16Segment', x: 150, y: 300, width: 100, height: 200, label: 'Sym 6', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 's5', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0] },
      { id: 's6', type: 'Display16Segment', x: 270, y: 300, width: 100, height: 200, label: 'Sym 7', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 1, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 's6', color: 'gray', prevInputs: [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] },
      { id: 's7', type: 'Display16Segment', x: 390, y: 300, width: 100, height: 200, label: 'Sym 8', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 1, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 1, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's7', color: 'gray', prevInputs: [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1] },
      { id: 's8', type: 'Display16Segment', x: 510, y: 300, width: 100, height: 200, label: 'Sym 9', inputs: [{ x: 0, y: 10, label: 'S1', value: 0, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 0, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 0, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 0, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 1, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 1, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 1, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 1, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 0, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 0, name: 'seg_15' }], outputs: [], name: 's8', color: 'gray', prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
      { id: 's9', type: 'Display16Segment', x: 630, y: 300, width: 100, height: 200, label: 'Sym 10', inputs: [{ x: 0, y: 10, label: 'S1', value: 1, name: 'seg_0' }, { x: 0, y: 22, label: 'S2', value: 1, name: 'seg_1' }, { x: 0, y: 34, label: 'S3', value: 0, name: 'seg_2' }, { x: 0, y: 46, label: 'S4', value: 0, name: 'seg_3' }, { x: 0, y: 58, label: 'S5', value: 1, name: 'seg_4' }, { x: 0, y: 70, label: 'S6', value: 1, name: 'seg_5' }, { x: 0, y: 82, label: 'S7', value: 0, name: 'seg_6' }, { x: 0, y: 94, label: 'S8', value: 0, name: 'seg_7' }, { x: 0, y: 106, label: 'S9', value: 0, name: 'seg_8' }, { x: 0, y: 118, label: 'S10', value: 0, name: 'seg_9' }, { x: 0, y: 130, label: 'S11', value: 0, name: 'seg_10' }, { x: 0, y: 142, label: 'S12', value: 0, name: 'seg_11' }, { x: 0, y: 154, label: 'S13', value: 0, name: 'seg_12' }, { x: 0, y: 166, label: 'S14', value: 0, name: 'seg_13' }, { x: 0, y: 178, label: 'S15', value: 1, name: 'seg_14' }, { x: 0, y: 190, label: 'S16', value: 1, name: 'seg_15' }], outputs: [], name: 's9', color: 'gray', prevInputs: [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
    ] as Shape[],
    connectors: [
      { id: 'c0_14', startShapeId: 'h', endShapeId: 's0', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'c0_15', startShapeId: 'h', endShapeId: 's0', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'c1_2', startShapeId: 'h', endShapeId: 's1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c1_7', startShapeId: 'h', endShapeId: 's1', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'c2_0', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2_1', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c2_4', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c2_5', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c2_8', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c2_9', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c2_14', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'c2_15', startShapeId: 'h', endShapeId: 's2', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'c3_8', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c3_9', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c3_10', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c3_11', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'c3_12', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'c3_13', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'c3_14', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'c3_15', startShapeId: 'h', endShapeId: 's3', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'c4_8', startShapeId: 'h', endShapeId: 's4', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c4_9', startShapeId: 'h', endShapeId: 's4', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c4_14', startShapeId: 'h', endShapeId: 's4', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'c4_15', startShapeId: 'h', endShapeId: 's4', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'c5_11', startShapeId: 'h', endShapeId: 's5', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'c5_13', startShapeId: 'h', endShapeId: 's5', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'c6_4', startShapeId: 'h', endShapeId: 's6', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c6_5', startShapeId: 'h', endShapeId: 's6', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c6_8', startShapeId: 'h', endShapeId: 's6', startOutputIndex: 0, endInputIndex: 8 },
      { id: 'c6_9', startShapeId: 'h', endShapeId: 's6', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c7_0', startShapeId: 'h', endShapeId: 's7', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c7_1', startShapeId: 'h', endShapeId: 's7', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c7_2', startShapeId: 'h', endShapeId: 's7', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c7_9', startShapeId: 'h', endShapeId: 's7', startOutputIndex: 0, endInputIndex: 9 },
      { id: 'c7_15', startShapeId: 'h', endShapeId: 's7', startOutputIndex: 0, endInputIndex: 15 },
      { id: 'c8_10', startShapeId: 'h', endShapeId: 's8', startOutputIndex: 0, endInputIndex: 10 },
      { id: 'c8_11', startShapeId: 'h', endShapeId: 's8', startOutputIndex: 0, endInputIndex: 11 },
      { id: 'c8_12', startShapeId: 'h', endShapeId: 's8', startOutputIndex: 0, endInputIndex: 12 },
      { id: 'c8_13', startShapeId: 'h', endShapeId: 's8', startOutputIndex: 0, endInputIndex: 13 },
      { id: 'c9_0', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c9_1', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c9_4', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c9_5', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c9_14', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 14 },
      { id: 'c9_15', startShapeId: 'h', endShapeId: 's9', startOutputIndex: 0, endInputIndex: 15 },
    ]
  },
  'Traffic Light Controller (Modular)': {
    fileName: 'Modular Traffic Light',
    shapes: [
      { id: 't1', type: 'Text', x: 50, y: 350, width: 600, height: 60, label: 'Controlador de Tráfico Modular: Utiliza un bloque "Secuenciador" (4017) que alimenta un bloque "Decodificador de Luces" (Comuertas OR). Esta arquitectura permite separar la lógica de tiempo de la lógica de salida.', inputs: [], outputs: [], name: 'desc', color: '#fbbf24', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Reloj 1Hz', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'seq', type: 'CustomBlock', x: 180, y: 100, width: 140, height: 200, label: 'Secuenciador 10', inputs: [{ x: 0, y: 30, label: 'CLK', value: 0, name: 'in_clk' }], outputs: Array.from({ length: 10 }, (_, i) => ({ x: 140, y: 15 + i * 18, label: `S${i}`, value: 0, name: `out_${i}` })), name: 'seq', color: 'gray', subcircuit: {
        shapes: [
          { id: 'ic', type: 'IC4017', x: 100, y: 50, width: 100, height: 250, label: '4017', inputs: [{ x: 0, y: 20, label: 'CP0', value: 0, name: 'cp0' }, { x: 0, y: 40, label: 'CP1', value: 0, name: 'cp1' }, { x: 0, y: 60, label: 'MR', value: 0, name: 'mr' }], outputs: Array.from({ length: 10 }, (_, i) => ({ x: 100, y: 15 + i * 22, label: `Q${i}`, value: 0, name: `q${i}` })), name: 'ic', color: 'gray' },
          { id: 'i1', type: 'InputL', x: 0, y: 70, width: 40, height: 40, label: 'IN CLK', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'i1', color: 'gray' },
          ...Array.from({ length: 10 }, (_, i) => ({ id: `o${i}`, type: 'OutPutL' as ShapeType, x: 250, y: 10 + i * 30, width: 40, height: 40, label: `S${i}`, inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: `o${i}`, color: 'gray' }))
        ],
        connectors: [
          { id: 'c_clk', startShapeId: 'i1', endShapeId: 'ic', startOutputIndex: 0, endInputIndex: 0 },
          ...Array.from({ length: 10 }, (_, i) => ({ id: `co_${i}`, startShapeId: 'ic', endShapeId: `o${i}`, startOutputIndex: i, endInputIndex: 0 }))
        ]
      } },
      { id: 'driver', type: 'CustomBlock', x: 400, y: 50, width: 160, height: 250, label: 'Driver Luces', inputs: Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 20 + i * 22, label: `S${i}`, value: 0, name: `s${i}` })), outputs: [{ x: 160, y: 50, label: 'ROJO', value: 0, name: 'r' }, { x: 160, y: 120, label: 'AMAR', value: 0, name: 'a' }, { x: 160, y: 190, label: 'VERDE', value: 0, name: 'v' }], name: 'driver', color: 'gray', subcircuit: {
        shapes: [
          ...Array.from({ length: 10 }, (_, i) => ({ id: `i${i}`, type: 'InputL' as ShapeType, x: 0, y: 10 + i * 40, width: 40, height: 40, label: `S${i}`, inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: `i${i}`, color: 'gray' })),
          { id: 'ov', type: 'OR', x: 150, y: 50, width: 80, height: 60, label: 'Verde Logic', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }, { x: 0, y: 45, label: '3', value: 0, name: '3' }], outputs: [{ x: 80, y: 30, label: 'OUT', value: 0, name: 'out' }], name: 'ov', color: 'green' },
          { id: 'oy', type: 'OR', x: 150, y: 150, width: 80, height: 40, label: 'Amar Logic', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: '1' }, { x: 0, y: 25, label: '2', value: 0, name: '2' }], outputs: [{ x: 80, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'oy', color: 'yellow' },
          { id: 'or', type: 'OR', x: 150, y: 250, width: 80, height: 80, label: 'Rojo Logic', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }, { x: 0, y: 45, label: '3', value: 0, name: '3' }, { x: 0, y: 60, label: '4', value: 0, name: '4' }, { x: 0, y: 75, label: '5', value: 0, name: '5' }], outputs: [{ x: 80, y: 40, label: 'OUT', value: 0, name: 'out' }], name: 'or', color: 'red' },
          { id: 'out_g', type: 'OutPutL', x: 300, y: 65, width: 40, height: 40, label: 'VERDE', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_g', color: 'green' },
          { id: 'out_y', type: 'OutPutL', x: 300, y: 165, width: 40, height: 40, label: 'AMAR', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_y', color: 'yellow' },
          { id: 'out_r', type: 'OutPutL', x: 300, y: 275, width: 40, height: 40, label: 'ROJO', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_r', color: 'red' }
        ],
        connectors: [
          { id: 'cv1', startShapeId: 'i0', endShapeId: 'ov', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'cv2', startShapeId: 'i1', endShapeId: 'ov', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'cv3', startShapeId: 'i2', endShapeId: 'ov', startOutputIndex: 0, endInputIndex: 2 },
          { id: 'cy1', startShapeId: 'i4', endShapeId: 'oy', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'cy2', startShapeId: 'i5', endShapeId: 'oy', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'cr1', startShapeId: 'i6', endShapeId: 'or', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'cr2', startShapeId: 'i7', endShapeId: 'or', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'cr3', startShapeId: 'i8', endShapeId: 'or', startOutputIndex: 0, endInputIndex: 2 },
          { id: 'cr4', startShapeId: 'i9', endShapeId: 'or', startOutputIndex: 0, endInputIndex: 3 },
          { id: 'cov', startShapeId: 'ov', endShapeId: 'out_g', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'coy', startShapeId: 'oy', endShapeId: 'out_y', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'cor', startShapeId: 'or', endShapeId: 'out_r', startOutputIndex: 0, endInputIndex: 0 }
        ]
      } },
      { id: 'lg_r', type: 'OutPutL', x: 650, y: 100, width: 60, height: 30, label: 'ROJO', inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'lg_r', color: 'red' },
      { id: 'lg_y', type: 'OutPutL', x: 650, y: 170, width: 60, height: 30, label: 'AMAR', inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'lg_y', color: 'yellow' },
      { id: 'lg_v', type: 'OutPutL', x: 650, y: 240, width: 60, height: 30, label: 'VERDE', inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'lg_v', color: 'green' }
    ],
    connectors: [
      { id: 'cc', startShapeId: 'clk', endShapeId: 'seq', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 10 }, (_, i) => ({ id: `cs_${i}`, startShapeId: 'seq', endShapeId: 'driver', startOutputIndex: i, endInputIndex: i })),
      { id: 'cdr', startShapeId: 'driver', endShapeId: 'lg_r', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cdy', startShapeId: 'driver', endShapeId: 'lg_y', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cdv', startShapeId: 'driver', endShapeId: 'lg_v', startOutputIndex: 2, endInputIndex: 0 }
    ]
  },
  'Sumador 4-Bits Anidado': {
    fileName: 'Nested 4-Bit Adder',
    shapes: [
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 60, label: 'Sumador de 4 Bits Anidado: Construye un Sumador Completo usando dos bloques "Half Adder". Luego, utiliza el bloque "Full Adder" cuatro veces para realizar una suma de 4 bits con acarreo.', inputs: [], outputs: [], name: 'desc', color: '#60a5fa', font: '14px Inter' },
      { id: 'sw_a', type: 'InputControl', x: 50, y: 50, width: 120, height: 160, label: 'Valor A', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 20 + i * 35, label: `A${i}`, value: 0, name: `a${i}` })), name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 230, width: 120, height: 160, label: 'Valor B', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 100, y: 20 + i * 35, label: `B${i}`, value: 0, name: `b${i}` })), name: 'sw_b', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `fa_${i}`,
        type: 'CustomBlock' as ShapeType,
        x: 250 + i * 140,
        y: 150,
        width: 120,
        height: 120,
        label: `Full Adder ${i}`,
        name: `fa_${i}`,
        color: 'gray',
        inputs: [{ x: 0, y: 20, label: 'Cin', value: 0, name: 'cin' }, { x: 0, y: 50, label: 'A', value: 0, name: 'a' }, { x: 0, y: 80, label: 'B', value: 0, name: 'b' }],
        outputs: [{ x: 100, y: 40, label: 'Sum', value: 0, name: 'sum' }, { x: 100, y: 80, label: 'Cout', value: 0, name: 'cout' }],
        subcircuit: {
          shapes: [
            { id: 'ha1', type: 'CustomBlock' as ShapeType, x: 100, y: 50, width: 100, height: 80, label: 'Half Adder 1', name: 'ha1', color: 'gray', inputs: [{ x: 0, y: 20, label: 'A', value: 0, name: 'a' }, { x: 0, y: 50, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 80, y: 20, label: 'S', value: 0, name: 's' }, { x: 80, y: 50, label: 'C', value: 0, name: 'c' }], subcircuit: {
              shapes: [
                { id: 'i1', type: 'InputL' as ShapeType, x: 0, y: 30, width: 40, height: 40, label: 'A', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'i1', color: 'gray' },
                { id: 'i2', type: 'InputL' as ShapeType, x: 0, y: 70, width: 40, height: 40, label: 'B', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'i2', color: 'gray' },
                { id: 'x1', type: 'XOR', x: 120, y: 30, width: 60, height: 40, label: 'XOR', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'x1', color: 'gray' },
                { id: 'a1', type: 'AND', x: 120, y: 70, width: 60, height: 40, label: 'AND', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'a1', color: 'gray' },
                { id: 'o1', type: 'OutPutL' as ShapeType, x: 220, y: 35, width: 40, height: 40, label: 'Sum', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'o1', color: 'gray' },
                { id: 'o2', type: 'OutPutL' as ShapeType, x: 220, y: 75, width: 40, height: 40, label: 'Carry', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'o2', color: 'gray' }
              ],
              connectors: [
                { id: 'c1', startShapeId: 'i1', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c2', startShapeId: 'i2', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 1 },
                { id: 'c3', startShapeId: 'i1', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c4', startShapeId: 'i2', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 1 },
                { id: 'c5', startShapeId: 'x1', endShapeId: 'o1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c6', startShapeId: 'a1', endShapeId: 'o2', startOutputIndex: 0, endInputIndex: 0 }
              ]
            } },
            { id: 'ha2', type: 'CustomBlock' as ShapeType, x: 220, y: 100, width: 100, height: 80, label: 'Half Adder 2', name: 'ha2', color: 'gray', inputs: [{ x: 0, y: 20, label: 'A', value: 0, name: 'a' }, { x: 0, y: 50, label: 'B', value: 0, name: 'b' }], outputs: [{ x: 80, y: 20, label: 'S', value: 0, name: 's' }, { x: 80, y: 50, label: 'C', value: 0, name: 'c' }], subcircuit: {
              shapes: [
                { id: 'i1', type: 'InputL' as ShapeType, x: 0, y: 30, width: 40, height: 40, label: 'A', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'i1', color: 'gray' },
                { id: 'i2', type: 'InputL' as ShapeType, x: 0, y: 70, width: 40, height: 40, label: 'B', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'i2', color: 'gray' },
                { id: 'x1', type: 'XOR', x: 120, y: 30, width: 60, height: 40, label: 'XOR', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'x1', color: 'gray' },
                { id: 'a1', type: 'AND', x: 120, y: 70, width: 60, height: 40, label: 'AND', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'a1', color: 'gray' },
                { id: 'o1', type: 'OutPutL' as ShapeType, x: 220, y: 35, width: 40, height: 40, label: 'Sum', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'o1', color: 'gray' },
                { id: 'o2', type: 'OutPutL' as ShapeType, x: 220, y: 75, width: 40, height: 40, label: 'Carry', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'o2', color: 'gray' }
              ],
              connectors: [
                { id: 'c1', startShapeId: 'i1', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c2', startShapeId: 'i2', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 1 },
                { id: 'c3', startShapeId: 'i1', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c4', startShapeId: 'i2', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 1 },
                { id: 'c5', startShapeId: 'x1', endShapeId: 'o1', startOutputIndex: 0, endInputIndex: 0 },
                { id: 'c6', startShapeId: 'a1', endShapeId: 'o2', startOutputIndex: 0, endInputIndex: 0 }
              ]
            } },
            { id: 'or1', type: 'OR', x: 350, y: 150, width: 60, height: 60, label: 'OR', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: '1' }, { x: 0, y: 45, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 30, label: 'OUT', value: 0, name: 'out' }], name: 'or1', color: 'gray' },
            { id: 'in_cin', type: 'InputL' as ShapeType, x: 0, y: 120, width: 40, height: 40, label: 'Cin', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_cin', color: 'gray' },
            { id: 'in_a', type: 'InputL' as ShapeType, x: 0, y: 40, width: 40, height: 40, label: 'A', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_a', color: 'gray' },
            { id: 'in_b', type: 'InputL' as ShapeType, x: 0, y: 80, width: 40, height: 40, label: 'B', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_b', color: 'gray' },
            { id: 'out_s', type: 'OutPutL' as ShapeType, x: 450, y: 100, width: 40, height: 40, label: 'Sum', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_s', color: 'gray' },
            { id: 'out_co', type: 'OutPutL' as ShapeType, x: 450, y: 160, width: 40, height: 40, label: 'Cout', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_co', color: 'gray' }
          ],
          connectors: [
            { id: 'c1', startShapeId: 'in_a', endShapeId: 'ha1', startOutputIndex: 0, endInputIndex: 0 },
            { id: 'c2', startShapeId: 'in_b', endShapeId: 'ha1', startOutputIndex: 0, endInputIndex: 1 },
            { id: 'c3', startShapeId: 'ha1', endShapeId: 'ha2', startOutputIndex: 0, endInputIndex: 0 },
            { id: 'c4', startShapeId: 'in_cin', endShapeId: 'ha2', startOutputIndex: 0, endInputIndex: 1 },
            { id: 'c5', startShapeId: 'ha2', endShapeId: 'out_s', startOutputIndex: 0, endInputIndex: 0 },
            { id: 'c6', startShapeId: 'ha1', endShapeId: 'or1', startOutputIndex: 1, endInputIndex: 0 },
            { id: 'c7', startShapeId: 'ha2', endShapeId: 'or1', startOutputIndex: 1, endInputIndex: 1 },
            { id: 'c8', startShapeId: 'or1', endShapeId: 'out_co', startOutputIndex: 0, endInputIndex: 0 }
          ]
        }
      })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL' as ShapeType, x: 270 + i * 140, y: 350, width: 60, height: 30, label: `SUM ${i}`, inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'green' })),
      { id: 'led_carry', type: 'OutPutL' as ShapeType, x: 850, y: 220, width: 80, height: 30, label: 'CARRY OUT', inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'led_carry', color: 'red' },
      { id: 'low_cin', type: 'LowConstant', x: 180, y: 160, width: 40, height: 40, label: 'Cin 0', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'low_cin', color: 'gray' }
    ],
    connectors: [
      { id: 'cin0', startShapeId: 'low_cin', endShapeId: 'fa_0', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ca_${i}`, startShapeId: 'sw_a', endShapeId: `fa_${i}`, startOutputIndex: i, endInputIndex: 1 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cb_${i}`, startShapeId: 'sw_b', endShapeId: `fa_${i}`, startOutputIndex: i, endInputIndex: 2 })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `cout_${i}`, startShapeId: `fa_${i}`, endShapeId: `fa_${i+1}`, startOutputIndex: 1, endInputIndex: 0 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cout_led_${i}`, startShapeId: `fa_${i}`, endShapeId: `led_${i}`, startOutputIndex: 0, endInputIndex: 0 })),
      { id: 'cout_final', startShapeId: 'fa_3', endShapeId: 'led_carry', startOutputIndex: 1, endInputIndex: 0 }
    ]
  },
  'Contador Modulo-16 (Bloques JK)': {
    fileName: 'Modular Mod-16 Counter',
    shapes: [
      { id: 't1', type: 'Text', x: 50, y: 400, width: 600, height: 50, label: 'Contador Modulo-16: Utiliza 4 bloques "Celda JK" anidados. Cada celda es un FF JK configurado para alternar (J=K=H).', inputs: [], outputs: [], name: 'desc', color: '#34d399', font: '14px Inter' },
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'CLK', inputs: [], outputs: [{ x: 60, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'high', type: 'HighConstant', x: 150, y: 50, width: 40, height: 40, label: 'Logic HIGH', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'high', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `jk_${i}`,
        type: 'CustomBlock' as ShapeType,
        x: 250 + i * 150,
        y: 100,
        width: 100,
        height: 100,
        label: `JK Cell ${i}`,
        name: `jk_${i}`,
        color: 'gray',
        inputs: [{ x: 0, y: 20, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 50, label: 'J', value: 0, name: 'j' }, { x: 0, y: 80, label: 'K', value: 0, name: 'k' }],
        outputs: [{ x: 100, y: 40, label: 'Q', value: 0, name: 'q' }],
        subcircuit: {
          shapes: [
            { id: 'ff', type: 'JK_FF' as ShapeType, x: 120, y: 50, width: 80, height: 100, label: 'FF', inputs: [{ x: 0, y: 20, label: 'J', value: 0, name: 'j' }, { x: 0, y: 50, label: 'CLK', value: 0, name: 'clk' }, { x: 0, y: 80, label: 'K', value: 0, name: 'k' }], outputs: [{ x: 80, y: 20, label: 'Q', value: 0, name: 'q' }, { x: 80, y: 80, label: 'NQ', value: 0, name: 'nq' }], name: 'ff', color: 'gray' },
            { id: 'in_clk', type: 'InputL' as ShapeType, x: 20, y: 30, width: 40, height: 40, label: 'CLK', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_clk', color: 'gray' },
            { id: 'in_j', type: 'InputL' as ShapeType, x: 20, y: 70, width: 40, height: 40, label: 'J', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_j', color: 'gray' },
            { id: 'in_k', type: 'InputL' as ShapeType, x: 20, y: 110, width: 40, height: 40, label: 'K', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'in_k', color: 'gray' },
            { id: 'out_q', type: 'OutPutL' as ShapeType, x: 250, y: 70, width: 40, height: 40, label: 'Q', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_q', color: 'gray' }
          ],
          connectors: [
            { id: 'c1', startShapeId: 'in_clk', endShapeId: 'ff', startOutputIndex: 0, endInputIndex: 1 },
            { id: 'c2', startShapeId: 'in_j', endShapeId: 'ff', startOutputIndex: 0, endInputIndex: 0 },
            { id: 'c3', startShapeId: 'in_k', endShapeId: 'ff', startOutputIndex: 0, endInputIndex: 2 },
            { id: 'c4', startShapeId: 'ff', endShapeId: 'out_q', startOutputIndex: 0, endInputIndex: 0 }
          ]
        }
      })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `led_${i}`, type: 'OutPutL' as ShapeType, x: 270 + i * 150, y: 250, width: 40, height: 40, label: `BIT ${i}`, inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: `led_${i}`, color: 'green' }))
    ],
    connectors: [
      { id: 'c_clk_0', startShapeId: 'clk', endShapeId: 'jk_0', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_j_${i}`, startShapeId: 'high', endShapeId: `jk_${i}`, startOutputIndex: 0, endInputIndex: 1 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_k_${i}`, startShapeId: 'high', endShapeId: `jk_${i}`, startOutputIndex: 0, endInputIndex: 2 })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `c_ripple_${i}`, startShapeId: `jk_${i}`, endShapeId: `jk_${i+1}`, startOutputIndex: 0, endInputIndex: 0 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `c_led_${i}`, startShapeId: `jk_${i}`, endShapeId: `led_${i}`, startOutputIndex: 0, endInputIndex: 0 }))
    ]
  },
  'Registrador PISO 4-Bits': {
    fileName: 'Parallel-In Serial-Out',
    shapes: [
      { id: 't1', type: 'Text', x: 50, y: 400, width: 600, height: 50, label: 'PISO Shift Register: Carga datos en paralelo y los desplaza en serie. Utiliza compuertas para seleccionar entre CARGAR y DESPLAZAR.', inputs: [], outputs: [], name: 'desc', color: '#f87171', font: '14px Inter' },
      { id: 'sw_load', type: 'ToggleSwitch', x: 50, y: 50, width: 80, height: 40, label: 'LOAD / !SHIFT', inputs: [], outputs: [{ x: 80, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'sw_load', color: 'gray' },
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'CLK', inputs: [], outputs: [{ x: 80, y: 20, label: 'CLK', value: 0, name: 'clk' }], name: 'clk', color: 'gray', frequency: 1 },
      { id: 'sw_data', type: 'InputControl', x: 50, y: 230, width: 100, height: 160, label: 'Data', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `D${i}`, value: 0, name: `d${i}` })), name: 'sw_data', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ff_${i}`, type: 'D_FF' as ShapeType, x: 250 + i * 160, y: 150, width: 80, height: 100, label: `FF ${i}`, inputs: [{ x: 0, y: 20, label: 'D', value: 0, name: 'd' }, { x: 0, y: 50, label: 'CLK', value: 0, name: 'clk' }], outputs: [{ x: 80, y: 20, label: 'Q', value: 0, name: 'q' }], name: `ff_${i}`, color: 'gray' })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `mux_${i}`, type: 'CustomBlock' as ShapeType, x: 180 + i * 160, y: 100, width: 60, height: 100, label: `Mux ${i}`, name: `mux_${i}`, color: 'gray', inputs: [{ x: 0, y: 20, label: 'A', value: 0, name: 'a' }, { x: 0, y: 50, label: 'B', value: 0, name: 'b' }, { x: 0, y: 80, label: 'Sel', value: 0, name: 'sel' }], outputs: [{ x: 60, y: 50, label: 'Y', value: 0, name: 'y' }], subcircuit: {
        shapes: [
          { id: 'iA', type: 'InputL' as ShapeType, x: 0, y: 20, width: 40, height: 40, label: 'A', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iA', color: 'gray' },
          { id: 'iB', type: 'InputL' as ShapeType, x: 0, y: 60, width: 40, height: 40, label: 'B', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iB', color: 'gray' },
          { id: 'iS', type: 'InputL' as ShapeType, x: 0, y: 100, width: 40, height: 40, label: 'Sel', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iS', color: 'gray' },
          { id: 'n1', type: 'NOT', x: 100, y: 100, width: 40, height: 40, label: 'INV', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'n1', color: 'gray' },
          { id: 'a1', type: 'AND', x: 160, y: 20, width: 50, height: 40, label: 'A1', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 50, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'a1', color: 'gray' },
          { id: 'a2', type: 'AND', x: 160, y: 70, width: 50, height: 40, label: 'A2', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 50, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'a2', color: 'gray' },
          { id: 'o1', type: 'OR', x: 230, y: 45, width: 60, height: 50, label: 'OR', inputs: [{ x: 0, y: 15, label: '1', value: 0, name: '1' }, { x: 0, y: 35, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 25, label: 'OUT', value: 0, name: 'out' }], name: 'o1', color: 'gray' },
          { id: 'out_y', type: 'OutPutL' as ShapeType, x: 300, y: 50, width: 40, height: 40, label: 'Y', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_y', color: 'gray' }
        ],
        connectors: [
          { id: 'c1', startShapeId: 'iS', endShapeId: 'n1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c2', startShapeId: 'iA', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c3', startShapeId: 'n1', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c4', startShapeId: 'iB', endShapeId: 'a2', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c5', startShapeId: 'iS', endShapeId: 'a2', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c6', startShapeId: 'a1', endShapeId: 'o1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c7', startShapeId: 'a2', endShapeId: 'o1', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c8', startShapeId: 'o1', endShapeId: 'out_y', startOutputIndex: 0, endInputIndex: 0 }
        ]
      } })),
      { id: 'serial_out', type: 'OutPutL', x: 900, y: 165, width: 60, height: 40, label: 'SERIAL OUT', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'serial_out', color: 'green' }
    ],
    connectors: [
      ...Array.from({ length: 4 }, (_, i) => ({ id: `clk_${i}`, startShapeId: 'clk', endShapeId: `ff_${i}`, startOutputIndex: 0, endInputIndex: 1 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `sel_${i}`, startShapeId: 'sw_load', endShapeId: `mux_${i}`, startOutputIndex: 0, endInputIndex: 2 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `data_${i}`, startShapeId: 'sw_data', endShapeId: `mux_${i}`, startOutputIndex: i, endInputIndex: 1 })),
      { id: 's_start', startShapeId: 'mux_0', endShapeId: 'ff_0', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({ length: 3 }, (_, i) => ({ id: `sh_${i}`, startShapeId: `ff_${i}`, endShapeId: `mux_${i+1}`, startOutputIndex: 0, endInputIndex: 0 })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `ff_in_${i+1}`, startShapeId: `mux_${i+1}`, endShapeId: `ff_${i+1}`, startOutputIndex: 0, endInputIndex: 0 })),
      { id: 'out_final', startShapeId: 'ff_3', endShapeId: 'serial_out', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  'Comparador de 4-Bits Modular': {
    fileName: 'Modular 4-Bit Comparator',
    shapes: [
      { id: 't1', type: 'Text', x: 50, y: 450, width: 600, height: 60, label: 'Comparador de 4 Bits Modular: Determina si A > B, A < B o A = B. Utiliza 4 bloques "Comparador 1-Bit" en cascada.', inputs: [], outputs: [], name: 'desc', color: '#a78bfa', font: '14px Inter' },
      { id: 'sw_a', type: 'InputControl', x: 50, y: 50, width: 100, height: 160, label: 'Input A', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `A${i}`, value: 0, name: `a${i}` })), name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 230, width: 100, height: 160, label: 'Input B', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `B${i}`, value: 0, name: `b${i}` })), name: 'sw_b', color: 'gray' },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `comp_${i}`, type: 'CustomBlock' as ShapeType, x: 250 + i * 140, y: 150, width: 100, height: 120, label: `1-Bit Comp ${i}`, name: `comp_${i}`, color: 'gray', inputs: [{ x: 0, y: 20, label: 'Ai', value: 0, name: 'ai' }, { x: 0, y: 50, label: 'Bi', value: 0, name: 'bi' }, { x: 0, y: 80, label: 'EqIn', value: 0, name: 'eqin' }], outputs: [{ x: 100, y: 50, label: 'EqOut', value: 0, name: 'eqout' }], subcircuit: {
        shapes: [
          { id: 'iA', type: 'InputL' as ShapeType, x: 0, y: 20, width: 40, height: 40, label: 'A', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iA', color: 'gray' },
          { id: 'iB', type: 'InputL' as ShapeType, x: 0, y: 60, width: 40, height: 40, label: 'B', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iB', color: 'gray' },
          { id: 'iE', type: 'InputL' as ShapeType, x: 0, y: 100, width: 40, height: 40, label: 'EqIn', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'iE', color: 'gray' },
          { id: 'x1', type: 'XNOR' as ShapeType, x: 120, y: 40, width: 60, height: 40, label: 'XNOR', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'x1', color: 'gray' },
          { id: 'a1', type: 'AND' as ShapeType, x: 220, y: 60, width: 60, height: 40, label: 'AND', inputs: [{ x: 0, y: 10, label: '1', value: 0, name: '1' }, { x: 0, y: 30, label: '2', value: 0, name: '2' }], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'a1', color: 'gray' },
          { id: 'out_e', type: 'OutPutL' as ShapeType, x: 320, y: 65, width: 40, height: 40, label: 'EqOut', inputs: [{ x: 0, y: 20, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'out_e', color: 'gray' }
        ],
        connectors: [
          { id: 'c1', startShapeId: 'iA', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c2', startShapeId: 'iB', endShapeId: 'x1', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c3', startShapeId: 'x1', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c4', startShapeId: 'iE', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c5', startShapeId: 'a1', endShapeId: 'out_e', startOutputIndex: 0, endInputIndex: 0 }
        ]
      } })),
      { id: 'high_init', type: 'HighConstant', x: 180, y: 230, width: 40, height: 40, label: 'Initial Eq=1', inputs: [], outputs: [{ x: 40, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'high_init', color: 'gray' },
      { id: 'led_eq', type: 'OutPutL', x: 850, y: 200, width: 80, height: 30, label: 'A == B', inputs: [{ x: 0, y: 15, label: 'IN', value: 0, name: 'in' }], outputs: [], name: 'led_eq', color: 'blue' }
    ],
    connectors: [
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ca_${i}`, startShapeId: 'sw_a', endShapeId: `comp_${i}`, startOutputIndex: i, endInputIndex: 0 })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cb_${i}`, startShapeId: 'sw_b', endShapeId: `comp_${i}`, startOutputIndex: i, endInputIndex: 1 })),
      { id: 'init', startShapeId: 'high_init', endShapeId: 'comp_0', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'final', startShapeId: 'comp_3', endShapeId: 'led_eq', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  '74181: 4-Bit Adder/Subtractor': {
    fileName: '74181 Adder Subtractor',
    shapes: [
      { id: 'alu', type: 'IC74181', x: 300, y: 100, width: 140, height: 340, label: '74181 ALU', inputs: [], outputs: [], name: 'alu', color: 'gray' },
      { id: 'sw_a', type: 'InputControl', x: 50, y: 100, width: 100, height: 160, label: 'Input A', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `A${i}`, value: 0, name: `a${i}` })), name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 280, width: 100, height: 160, label: 'Input B', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `B${i}`, value: 0, name: `b${i}` })), name: 'sw_b', color: 'gray' },
      { id: 'sw_mode', type: 'ToggleSwitch', x: 500, y: 50, width: 100, height: 50, label: 'Mode (M)', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 0, name: 'out' }], name: 'sw_mode' },
      { id: 'sw_s', type: 'InputControl', x: 500, y: 120, width: 100, height: 160, label: 'Select (S)', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `S${i}`, value: 0, name: `s${i}` })), name: 'sw_s', color: 'gray' },
      { id: 'disp', type: 'DisplayBCD', x: 500, y: 300, width: 120, height: 200, label: 'Result', inputs: [], outputs: [], name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 500, width: 600, height: 80, label: '74181 Adder/Subtractor: M=0 for Arithmetic. \nS=9 (1001) for A+B. S=6 (0110) for A-B-1. \nResult is shown in BCD/Hex display.', inputs: [], outputs: [], name: 'txt', color: '#34d399' }
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ca_${i}`, startShapeId: 'sw_a', endShapeId: 'alu', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cb_${i}`, startShapeId: 'sw_b', endShapeId: 'alu', startOutputIndex: i, endInputIndex: 4 + i })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cs_${i}`, startShapeId: 'sw_s', endShapeId: 'alu', startOutputIndex: i, endInputIndex: 8 + i })),
      { id: 'cm', startShapeId: 'sw_mode', endShapeId: 'alu', startOutputIndex: 0, endInputIndex: 12 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cf_${i}`, startShapeId: 'alu', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i }))
    ]
  },
  '74181: Logical unit (AND/OR/XOR)': {
    fileName: '74181 Logical Unit',
    shapes: [
      { id: 'alu', type: 'IC74181', x: 300, y: 100, width: 140, height: 340, label: '74181 ALU', inputs: [], outputs: [], name: 'alu' },
      { id: 'sw_a', type: 'ToggleSwitch', x: 50, y: 100, width: 100, height: 50, label: 'Bit A', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_a' },
      { id: 'sw_b', type: 'ToggleSwitch', x: 50, y: 160, width: 100, height: 50, label: 'Bit B', inputs: [], outputs: [{ x: 80, y: 25, label: 'Out', value: 1, name: 'out' }], name: 'sw_b' },
      { id: 'high_m', type: 'HighConstant', x: 50, y: 240, width: 50, height: 30, label: 'M=1', inputs: [], outputs: [{ x: 40, y: 15, label: 'VCC', value: 1, name: 'out' }], name: 'high_m' },
      { id: 'sw_s', type: 'InputControl', x: 50, y: 300, width: 100, height: 160, label: 'S Select', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `S${i}`, value: 0, name: `s${i}` })), name: 'sw_s' },
      { id: 'led', type: 'OutPutL', x: 500, y: 200, width: 60, height: 60, label: 'RESULT', inputs: [], outputs: [], name: 'led' },
      { id: 'txt', type: 'Text', x: 50, y: 500, width: 600, height: 80, label: '74181 Logical Unit (M=1): \nS=11 (1011) for AND, S=14 (1110) for OR, S=6 (0110) for XOR. \nConfigure S to see logical result on output F0.', inputs: [], outputs: [], name: 'txt', color: '#34d399' }
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'sw_a', endShapeId: 'alu', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'sw_b', endShapeId: 'alu', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c3', startShapeId: 'high_m', endShapeId: 'alu', startOutputIndex: 0, endInputIndex: 12 },
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cs_${i}`, startShapeId: 'sw_s', endShapeId: 'alu', startOutputIndex: i, endInputIndex: 8 + i })),
      { id: 'c_out', startShapeId: 'alu', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  '74181: Magnitude Comparator (A=B)': {
    fileName: '74181 Comparator',
    shapes: [
      { id: 'alu', type: 'IC74181', x: 300, y: 100, width: 140, height: 340, label: '74181 ALU', inputs: [], outputs: [], name: 'alu' },
      { id: 'sw_a', type: 'InputControl', x: 50, y: 100, width: 100, height: 160, label: 'A', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `A${i}`, value: 0, name: `a${i}` })), name: 'sw_a' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 280, width: 100, height: 160, label: 'B', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `B${i}`, value: 0, name: `b${i}` })), name: 'sw_b' },
      { id: 'led_eq', type: 'OutPutL', x: 500, y: 200, width: 60, height: 60, label: 'A=B', inputs: [], outputs: [], name: 'led_eq' },
      { id: 'txt', type: 'Text', x: 50, y: 460, width: 600, height: 80, label: '74181 Magnitude Comparator: Uses the dedicated A=B output. \nWhen all 4 bits of A match all 4 bits of B, A=B goes HIGH.', inputs: [], outputs: [], name: 'txt', color: '#34d399' }
    ] as Shape[],
    connectors: [
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ca_${i}`, startShapeId: 'sw_a', endShapeId: 'alu', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cb_${i}`, startShapeId: 'sw_b', endShapeId: 'alu', startOutputIndex: i, endInputIndex: 4 + i })),
      { id: 'c_eq', startShapeId: 'alu', endShapeId: 'led_eq', startOutputIndex: 4, endInputIndex: 0 }
    ]
  },
  'Elevador 4 Niveles (Bloque)': {
    fileName: 'Elevator 4 Levels',
    shapes: [
      { id: 'b_up', type: 'PushButton', x: 50, y: 50, width: 60, height: 30, label: 'UP', inputs: [], outputs: [{x:50,y:15,label:'OUT',value:0,name:'out'}], name: 'b_up' },
      { id: 'b_down', type: 'PushButton', x: 50, y: 100, width: 60, height: 30, label: 'DOWN', inputs: [], outputs: [{x:50,y:15,label:'OUT',value:0,name:'out'}], name: 'b_down' },
      { id: 'elevator', type: 'CustomBlock', x: 200, y: 50, width: 120, height: 160, label: 'Elevator Ctrl', name: 'elevator', inputs: [{x:0,y:30,label:'UP',value:0,name:'up'},{x:0,y:80,label:'DOWN',value:0,name:'down'}], outputs: [{x:120,y:30,label:'M1',value:0,name:'m1'},{x:120,y:80,label:'M2',value:0,name:'m2'}], subcircuit: {
        shapes: [
          { id: 'in_u', type: 'InputL', x: 20, y: 20, width: 40, height: 40, label: 'UP', inputs: [], outputs: [{x:40,y:20,label:'OUT',value:0,name:'out'}], name: 'in_u' },
          { id: 'in_d', type: 'InputL', x: 20, y: 80, width: 40, height: 40, label: 'DOWN', inputs: [], outputs: [{x:40,y:20,label:'OUT',value:0,name:'out'}], name: 'in_d' },
          { id: 'ff', type: 'JK_Flip_Flop', x: 100, y: 50, width: 80, height: 100, label: 'State', inputs: [{x:0,y:20,label:'J',value:0,name:'j'},{x:0,y:50,label:'CLK',value:0,name:'clk'},{x:0,y:80,label:'K',value:0,name:'k'}], outputs: [{x:80,y:20,label:'Q',value:0,name:'q'},{x:80,y:80,label:'!Q',value:1,name:'nq'}], name: 'ff' },
          { id: 'out_1', type: 'OutPutL', x: 220, y: 30, width: 40, height: 40, label: 'M1', inputs: [{x:0,y:20,label:'IN',value:0,name:'in'}], outputs: [], name: 'out_1' },
          { id: 'out_2', type: 'OutPutL', x: 220, y: 100, width: 40, height: 40, label: 'M2', inputs: [{x:0,y:20,label:'IN',value:0,name:'in'}], outputs: [], name: 'out_2' }
        ],
        connectors: [
          { id: 'c1', startShapeId: 'in_u', endShapeId: 'ff', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c2', startShapeId: 'in_d', endShapeId: 'ff', startOutputIndex: 0, endInputIndex: 2 },
          { id: 'c3', startShapeId: 'ff', endShapeId: 'out_1', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c4', startShapeId: 'ff', endShapeId: 'out_2', startOutputIndex: 1, endInputIndex: 0 }
        ]
      } },
      { id: 'm_up', type: 'Motor', x: 400, y: 50, width: 60, height: 60, label: 'UP', inputs: [{x:0,y:30,label:'IN',value:0,name:'in'}], outputs: [], name: 'm_up' },
      { id: 'm_down', type: 'Motor', x: 400, y: 120, width: 60, height: 60, label: 'DOWN', inputs: [{x:0,y:30,label:'IN',value:0,name:'in'}], outputs: [], name: 'm_down' },
      { id: 'txt', type: 'Text', x: 50, y: 250, width: 600, height: 60, label: 'Controlador de Elevador: El bloque interno simula la lógica de subida y bajada. Use los pulsadores para activar los motores.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      { id: 'cw1', startShapeId: 'b_up', endShapeId: 'elevator', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cw2', startShapeId: 'b_down', endShapeId: 'elevator', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cw3', startShapeId: 'elevator', endShapeId: 'm_up', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cw4', startShapeId: 'elevator', endShapeId: 'm_down', startOutputIndex: 1, endInputIndex: 0 }
    ]
  },
  'Tic-Tac-Toe Game (Bloque)': {
    fileName: 'Tic Tac Toe',
    shapes: [
      { id: 'ttt', type: 'CustomBlock', x: 200, y: 50, width: 240, height: 240, label: 'Tic-Tac-Toe Engine', inputs: Array.from({length:9}, (_,i)=>({x:0,y:20+i*22,label:`P${i}`,value:0,name:`p${i}`})), outputs: [{x:240,y:50,label:'WIN',value:0,name:'win'}], subcircuit: {
        shapes: [
          { id: 'gate', type: 'AND5', x: 100, y: 50, width: 100, height: 100, label: 'Win Logic', inputs: Array.from({length:5}, (_,i)=>({x:0,y:10+i*15,label:`${i}`,value:0,name:`in${i}`})), outputs: [{x:100,y:50,label:'Y',value:0,name:'y'}], name: 'gate' },
          { id: 'led', type: 'OutPutL', x: 250, y: 80, width: 40, height: 40, label: 'WIN', inputs: [{x:0,y:20,label:'IN',value:0,name:'in'}], outputs: [], name: 'led' }
        ],
        connectors: [
          { id: 'c1', startShapeId: 'gate', endShapeId: 'led', startOutputIndex: 0, endInputIndex: 0 }
        ]
      }, name: 'ttt' },
      ...Array.from({length:9}, (_,i)=>({
         id: `sw_${i}`, type: 'ToggleSwitch', x: 50, y: 50 + i * 30, width: 80, height: 25, label: `Pos ${i}`, inputs: [], outputs: [{x:60,y:12,label:'OUT',value:0,name:'out'}], name: `sw_${i}`
      })),
      { id: 'win_led', type: 'OutPutL', x: 500, y: 150, width: 60, height: 60, label: 'GAME OVER', inputs: [{x:0,y:30,label:'IN',value:0,name:'in'}], outputs: [], name: 'win_led' },
      { id: 'txt', type: 'Text', x: 50, y: 350, width: 600, height: 60, label: 'Tic-Tac-Toe: El bloque evalúa si hay un ganador. Active las posiciones para simular jugadas.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      ...Array.from({length:9}, (_,i)=>({ id: `c_${i}`, startShapeId: `sw_${i}`, endShapeId: 'ttt', startOutputIndex: 0, endInputIndex: i })),
      { id: 'cw', startShapeId: 'ttt', endShapeId: 'win_led', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  'Substractor de 2 Números (Bloque)': {
    fileName: '4-Bit Substractor',
    shapes: [
      { id: 'sw_a', type: 'InputControl', x: 50, y: 50, width: 100, height: 160, label: 'Num A', inputs: [], outputs: Array.from({length:4}, (_,i)=>({x:80,y:20+i*35,label:`A${i}`,value:0,name:`a${i}`})), name: 'sw_a' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 230, width: 100, height: 160, label: 'Num B', inputs: [], outputs: Array.from({length:4}, (_,i)=>({x:80,y:20+i*35,label:`B${i}`,value:0,name:`b${i}`})), name: 'sw_b' },
      { id: 'sub', type: 'CustomBlock', x: 250, y: 120, width: 140, height: 180, label: '4-Bit Sub', name: 'sub', inputs: Array.from({length:8}, (_,i)=>({x:0,y:20+i*18,label:i<4?`A${i}`:`B${i-4}`,value:0,name:i<4?`a${i}`:`b${i-4}`})), outputs: Array.from({length:4}, (_,i)=>({x:140,y:25+i*35,label:`F${i}`,value:0,name:`f${i}`})).concat([{x:140,y:160,label:'BR',value:0,name:'br'}]), subcircuit: {
        shapes: [
          { id: 'alu_core', type: 'IC74181', x: 50, y: 50, width: 140, height: 340, label: 'ALU Core', name: 'alu_core' },
          { id: 'low_m', type: 'LowConstant', x: 10, y: 350, width: 40, height: 30, label: 'M=0', name: 'low_m' },
          { id: 'high_cn', type: 'HighConstant', x: 10, y: 280, width: 40, height: 30, label: 'Cn=1', name: 'high_cn' },
          { id: 'sub_sel', type: 'HighConstant', x: 10, y: 390, width: 40, height: 30, label: 'S=6', name: 'sub_sel' }
        ],
        connectors: [
          { id: 'c_m', startShapeId: 'low_m', endShapeId: 'alu_core', startOutputIndex: 0, endInputIndex: 12 },
          { id: 'c_cn', startShapeId: 'high_cn', endShapeId: 'alu_core', startOutputIndex: 0, endInputIndex: 13 },
          { id: 'c_s1', startShapeId: 'sub_sel', endShapeId: 'alu_core', startOutputIndex: 0, endInputIndex: 9 },
          { id: 'c_s2', startShapeId: 'sub_sel', endShapeId: 'alu_core', startOutputIndex: 0, endInputIndex: 10 }
        ],
        inputMapping: [
          { internalShapeId: 'alu_core', type: 'input', index: 0 },
          { internalShapeId: 'alu_core', type: 'input', index: 1 },
          { internalShapeId: 'alu_core', type: 'input', index: 2 },
          { internalShapeId: 'alu_core', type: 'input', index: 3 },
          { internalShapeId: 'alu_core', type: 'input', index: 4 },
          { internalShapeId: 'alu_core', type: 'input', index: 5 },
          { internalShapeId: 'alu_core', type: 'input', index: 6 },
          { internalShapeId: 'alu_core', type: 'input', index: 7 }
        ],
        outputMapping: [
          { internalShapeId: 'alu_core', type: 'output', index: 0 },
          { internalShapeId: 'alu_core', type: 'output', index: 1 },
          { internalShapeId: 'alu_core', type: 'output', index: 2 },
          { internalShapeId: 'alu_core', type: 'output', index: 3 },
          { internalShapeId: 'alu_core', type: 'output', index: 5 }
        ]
      } },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 120, width: 120, height: 200, label: 'Result', name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 450, width: 600, height: 60, label: 'Restador de 4-Bits: Bloque personalizado que utiliza un núcleo ALU configurado para resta.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      ...Array.from({length:4}, (_,i)=>({ id: `ca_${i}`, startShapeId: 'sw_a', endShapeId: 'sub', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({length:4}, (_,i)=>({ id: `cb_${i}`, startShapeId: 'sw_b', endShapeId: 'sub', startOutputIndex: i, endInputIndex: 4 + i })),
      ...Array.from({length:4}, (_,i)=>({ id: `cf_${i}`, startShapeId: 'sub', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i }))
    ]
  },
  '7-Seg to 4-Bit Decoder (Bloque)': {
    fileName: '7-Seg to Binary',
    shapes: [
      { id: 'sw_seg', type: 'InputControl', x: 50, y: 50, width: 100, height: 260, label: '7-Segments', outputs: Array.from({length:7}, (_,i)=>({x:80,y:20+i*35,label:String.fromCharCode(97+i),value:0,name:String.fromCharCode(97+i)})), name: 'sw_seg' },
      { id: 'dec', type: 'CustomBlock', x: 220, y: 100, width: 140, height: 200, label: 'Converter', inputs: Array.from({length:7}, (_,i)=>({x:0,y:20+i*25,label:String.fromCharCode(97+i),value:0,name:String.fromCharCode(97+i)})), outputs: Array.from({length:4}, (_,i)=>({x:140,y:30+i*40,label:`D${i}`,value:0,name:`d${i}`})), subcircuit: {
        shapes: [
          { id: 'enc', type: 'IC7SegToBCD', x: 50, y: 50, width: 120, height: 200, label: 'Encoder', name: 'enc' }
        ],
        connectors: [],
        inputMapping: Array.from({length:7}, (_,i)=>({ internalShapeId: 'enc', type: 'input', index: i })),
        outputMapping: Array.from({length:4}, (_,i)=>({ internalShapeId: 'enc', type: 'output', index: i }))
      } },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 100, width: 120, height: 200, label: 'Binary Val', name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 350, width: 600, height: 60, label: 'Convertidor 7-Seg a 4-Bits: Transforma las señales de un display a su valor binario original.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      ...Array.from({length:7}, (_,i)=>({ id: `cs_${i}`, startShapeId: 'sw_seg', endShapeId: 'dec', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({length:4}, (_,i)=>({ id: `cf_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i }))
    ]
  },
  'Gate Level ALU 74181': {
    fileName: '74181 Gate Level',
    shapes: [
      { id: 'txt_desc', type: 'Text', x: 50, y: 750, width: 800, height: 60, label: '74181 ALU Gate Level: Detailed implementation using ~60 logic gates. \nFollows the standard internal propagation and carry lookahead architecture (TTL logic).', inputs: [], outputs: [], name: 'desc', color: '#34d399', font: '14px Inter' },
      // Inputs
      { id: 'sw_s', type: 'InputControl', x: 50, y: 20, width: 100, height: 160, label: 'Select (S)', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `S${i}`, value: 0, name: `s${i}` })), name: 'sw_s', color: 'gray' },
      { id: 'sw_a', type: 'InputControl', x: 50, y: 200, width: 100, height: 160, label: 'A', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `A${i}`, value: 0, name: `a${i}` })), name: 'sw_a', color: 'gray' },
      { id: 'sw_b', type: 'InputControl', x: 50, y: 380, width: 100, height: 160, label: 'B', inputs: [], outputs: Array.from({ length: 4 }, (_, i) => ({ x: 80, y: 20 + i * 35, label: `B${i}`, value: 0, name: `b${i}` })), name: 'sw_b', color: 'gray' },
      { id: 'sw_m', type: 'ToggleSwitch', x: 50, y: 560, width: 80, height: 40, label: 'Mode (M)', inputs: [], outputs: [{ x: 60, y: 20, label: 'OUT', value: 0, name: 'out' }], name: 'sw_m' },
      { id: 'sw_cn', type: 'ToggleSwitch', x: 50, y: 620, width: 80, height: 40, label: 'Cn', inputs: [], outputs: [{ x: 60, y: 20, label: 'OUT', value: 1, name: 'out' }], name: 'sw_cn' },

      // NOT stage (x=200)
      ...Array.from({ length: 4 }, (_, i) => ({ id: `not_b${i}`, type: 'NOT' as ShapeType, x: 200, y: 380 + i * 40, width: 40, height: 30, label: `!B${i}`, name: `not_b${i}` })),
      { id: 'not_m', type: 'NOT', x: 200, y: 560, width: 40, height: 30, label: '!M', name: 'not_m' },

      // Level 1: Propagation and Generation gates (x=300 ANDs, x=450 NORs)
      ...[0,1,2,3].flatMap(i => [
        { id: `and_p1_${i}`, type: 'AND', x: 300, y: 50 + i * 160, width: 60, height: 30, label: `P1_${i}`, name: `and_p1_${i}` },
        { id: `and_p2_${i}`, type: 'AND', x: 300, y: 85 + i * 160, width: 60, height: 30, label: `P2_${i}`, name: `and_p2_${i}` },
        { id: `nor_p_${i}`, type: 'NOR3', x: 420, y: 65 + i * 160, width: 50, height: 30, label: `P_${i}`, name: `nor_p_${i}` },
        { id: `and_g1_${i}`, type: 'AND3', x: 300, y: 125 + i * 160, width: 60, height: 30, label: `G1_${i}`, name: `and_g1_${i}` },
        { id: `and_g2_${i}`, type: 'AND3', x: 300, y: 160 + i * 160, width: 60, height: 30, label: `G2_${i}`, name: `and_g2_${i}` },
        { id: `nor_g_${i}`, type: 'NOR', x: 420, y: 140 + i * 160, width: 50, height: 30, label: `G_${i}`, name: `nor_g_${i}` }
      ]),

      // Level 2: Intermediate XORs (x=500)
      ...Array.from({ length: 4 }, (_, i) => ({ id: `xor_pg${i}`, type: 'XOR', x: 500, y: 100 + i * 160, width: 50, height: 30, label: `PG${i}`, name: `xor_pg${i}` })),

      // Level 3: Carry Logic ANDs (various vertical positions)
      { id: 'ca0', type: 'AND', x: 600, y: 50, width: 50, height: 30, label: 'CA0', name: 'ca0' },
      ...Array.from({ length: 2 }, (_, i) => ({ id: `ca1_${i}`, type: 'AND', x: 600, y: 100 + i * 35, width: 50, height: 30, label: `CA1_${i}`, name: `ca1_${i}` })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `ca2_${i}`, type: 'AND', x: 600, y: 200 + i * 35, width: 50, height: 30, label: `CA2_${i}`, name: `ca2_${i}` })),
      ...Array.from({ length: 4 }, (_, i) => ({ id: `ca3_${i}`, type: 'AND', x: 600, y: 350 + i * 35, width: 50, height: 30, label: `CA3_${i}`, name: `ca3_${i}` })),

      // Level 4: Carry Logic NORs (x=700)
      ...Array.from({ length: 4 }, (_, i) => ({ id: `cnor_${i}`, type: 'NOR', x: 700, y: 50 + i * 160, width: 50, height: 30, label: `Carry${i}`, name: `cnor_${i}` })),

      // Level 5: Final XORs (x=850)
      ...Array.from({ length: 4 }, (_, i) => ({ id: `xor_f${i}`, type: 'XOR', x: 850, y: 100 + i * 160, width: 50, height: 30, label: `F${i}`, name: `xor_f${i}` })),

      // Final Outputs
      ...Array.from({ length: 4 }, (_, i) => ({ id: `led_f${i}`, type: 'OutPutL', x: 1000, y: 100 + i * 160, width: 40, height: 40, label: `F${i}`, name: `led_f${i}` })),
      { id: 'ab_and', type: 'AND4', x: 1000, y: 500, width: 60, height: 60, label: 'A=B', name: 'ab_and' },
      { id: 'led_eq', type: 'OutPutL', x: 1100, y: 510, width: 40, height: 40, label: 'EQ', name: 'led_eq' }
    ] as Shape[],
    connectors: [
      // Base Connections: S lines to all ANDs
      ...[0,1,2,3].flatMap(i => [
        { id: `cs3_${i}`, startShapeId: 'sw_s', endShapeId: `and_p1_${i}`, startOutputIndex: 3, endInputIndex: 1 },
        { id: `cs2_${i}`, startShapeId: 'sw_s', endShapeId: `and_p2_${i}`, startOutputIndex: 2, endInputIndex: 1 },
        { id: `cs0_${i}`, startShapeId: 'sw_s', endShapeId: `and_g1_${i}`, startOutputIndex: 0, endInputIndex: 1 },
        { id: `cs1_${i}`, startShapeId: 'sw_s', endShapeId: `and_g2_${i}`, startOutputIndex: 1, endInputIndex: 1 }
      ]),
      // Base Connections: A and B lines
      ...[0,1,2,3].flatMap(i => [
        { id: `cbb_p1_${i}`, startShapeId: 'sw_b', endShapeId: `and_p1_${i}`, startOutputIndex: i, endInputIndex: 0 },
        { id: `cnotb_p2_${i}`, startShapeId: `not_b${i}`, endShapeId: `and_p2_${i}`, startOutputIndex: 0, endInputIndex: 0 },
        { id: `cab_g1_${i}`, startShapeId: 'sw_a', endShapeId: `and_g1_${i}`, startOutputIndex: i, endInputIndex: 0 },
        { id: `cbg1_${i}`, startShapeId: 'sw_b', endShapeId: `and_g1_${i}`, startOutputIndex: i, endInputIndex: 2 },
        { id: `cab_g2_${i}`, startShapeId: 'sw_a', endShapeId: `and_g2_${i}`, startOutputIndex: i, endInputIndex: 0 },
        { id: `cnbg2_${i}`, startShapeId: `not_b${i}`, endShapeId: `and_g2_${i}`, startOutputIndex: 0, endInputIndex: 2 },
        { id: `cbs_p1_${i}`, startShapeId: 'sw_b', endShapeId: `not_b${i}`, startOutputIndex: i, endInputIndex: 0 },
        { id: `ca_p_${i}`, startShapeId: 'sw_a', endShapeId: `nor_p_${i}`, startOutputIndex: i, endInputIndex: 2 }
      ]),
      // Logic Stage Connections
      ...[0,1,2,3].flatMap(i => [
        { id: `cp1x_${i}`, startShapeId: `and_p1_${i}`, endShapeId: `nor_p_${i}`, startOutputIndex: 0, endInputIndex: 0 },
        { id: `cp2x_${i}`, startShapeId: `and_p2_${i}`, endShapeId: `nor_p_${i}`, startOutputIndex: 0, endInputIndex: 1 },
        { id: `cg1x_${i}`, startShapeId: `and_g1_${i}`, endShapeId: `nor_g_${i}`, startOutputIndex: 0, endInputIndex: 0 },
        { id: `cg2x_${i}`, startShapeId: `and_g2_${i}`, endShapeId: `nor_g_${i}`, startOutputIndex: 0, endInputIndex: 1 },
        { id: `cpxpg_${i}`, startShapeId: `nor_p_${i}`, endShapeId: `xor_pg${i}`, startOutputIndex: 0, endInputIndex: 0 },
        { id: `cgxpg_${i}`, startShapeId: `nor_g_${i}`, endShapeId: `xor_pg${i}`, startOutputIndex: 0, endInputIndex: 1 }
      ]),
      // Carry Connections (Detailed)
      { id: 'cm_not', startShapeId: 'sw_m', endShapeId: 'not_m', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({length:10}, (_, i) => ({ id: `cm_to_ca${i}`, startShapeId: 'not_m', endShapeId: i === 0 ? 'ca0' : (i < 3 ? `ca1_${i-1}` : (i < 6 ? `ca2_${i-3}` : `ca3_${i-6}`)), startOutputIndex: 0, endInputIndex: 0 })),
      { id: 'ccn_ca0', startShapeId: 'sw_cn', endShapeId: 'ca0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cca0_cnor0', startShapeId: 'ca0', endShapeId: 'cnor_0', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ccn_f0', startShapeId: 'sw_cn', endShapeId: 'xor_f0', startOutputIndex: 0, endInputIndex: 1 },
      // Carry Lookahead Logic (Complete)
      { id: 'cpg0_cnor0', startShapeId: 'nor_g_0', endShapeId: 'cnor_0', startOutputIndex: 0, endInputIndex: 1 },
      
      { id: 'cpg0_ca1', startShapeId: 'nor_p_0', endShapeId: 'ca1_0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ccn_ca1', startShapeId: 'sw_cn', endShapeId: 'ca1_0', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cpg1_ca1', startShapeId: 'nor_g_1', endShapeId: 'ca1_1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cca1_cnor1', startShapeId: 'ca1_0', endShapeId: 'cnor_1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cca1b_cnor1', startShapeId: 'ca1_1', endShapeId: 'cnor_1', startOutputIndex: 0, endInputIndex: 1 },

      { id: 'cpg0_ca2', startShapeId: 'nor_p_0', endShapeId: 'ca2_0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cpg1_ca2', startShapeId: 'nor_p_1', endShapeId: 'ca2_0', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'ccn_ca2', startShapeId: 'sw_cn', endShapeId: 'ca2_0', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'cca2_cnor2', startShapeId: 'ca2_0', endShapeId: 'cnor_2', startOutputIndex: 0, endInputIndex: 0 },
      
      { id: 'cpg0_ca3', startShapeId: 'nor_p_0', endShapeId: 'ca3_0', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cpg1_ca3', startShapeId: 'nor_p_1', endShapeId: 'ca3_0', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cpg2_ca3', startShapeId: 'nor_p_2', endShapeId: 'ca3_0', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'ccn_ca3', startShapeId: 'sw_cn', endShapeId: 'ca3_0', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'cca3_cnor3', startShapeId: 'ca3_0', endShapeId: 'cnor_3', startOutputIndex: 0, endInputIndex: 0 },

      ...[0,1,2,3].flatMap(i => [
        { id: `cpgf_${i}`, startShapeId: `xor_pg${i}`, endShapeId: `xor_f${i}`, startOutputIndex: 0, endInputIndex: 0 },
        ...(i > 0 ? [{ id: `ccnf_${i}`, startShapeId: `cnor_${i-1}`, endShapeId: `xor_f${i}`, startOutputIndex: 0, endInputIndex: 1 }] : []),
        { id: `cfout_${i}`, startShapeId: `xor_f${i}`, endShapeId: `led_f${i}`, startOutputIndex: 0, endInputIndex: 0 },
        { id: `cf_ab_${i}`, startShapeId: `xor_f${i}`, endShapeId: 'ab_and', startOutputIndex: 0, endInputIndex: i }
      ]),
      { id: 'cab_led', startShapeId: 'ab_and', endShapeId: 'led_eq', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  'Dice Simulator (Bloque)': {
    fileName: 'Digital Dice',
    shapes: [
      { id: 'btn', type: 'PushButton', x: 50, y: 100, width: 80, height: 40, label: 'ROLL', outputs: [{x:70,y:20,label:'OUT',value:0,name:'out'}], name: 'btn' },
      { id: 'dice', type: 'CustomBlock', x: 200, y: 50, width: 140, height: 180, label: 'Dice Engine', inputs: [{x:0,y:90,label:'ROLL',value:0,name:'roll'}], outputs: Array.from({length:4}, (_,i)=>({x:140,y:25+i*35,label:`Q${i}`,value:0,name:`q${i}`})), subcircuit: {
        shapes: [
          { id: 'clk', type: 'GatedClock', x: 20, y: 20, width: 60, height: 30, label: 'OSC', frequency: 10, name: 'clk' },
          { id: 'cnt', type: 'IC74192', x: 120, y: 20, width: 100, height: 160, label: 'Counter', name: 'cnt' },
          { id: 'h1', type: 'HighConstant', x: 10, y: 150, width: 40, height: 30, label: 'H', name: 'h1' },
          { id: 'and_reset', type: 'NAND3', x: 250, y: 50, width: 60, height: 50, label: 'Reset=7', name: 'and_reset' }
        ],
        connectors: [
          { id: 'c1', startShapeId: 'clk', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c_dn', startShapeId: 'h1', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 1 },
          { id: 'c_d0', startShapeId: 'h1', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 4 }, // Load 1 on PL
          { id: 'c_q0_r', startShapeId: 'cnt', endShapeId: 'and_reset', startOutputIndex: 0, endInputIndex: 0 },
          { id: 'c_q1_r', startShapeId: 'cnt', endShapeId: 'and_reset', startOutputIndex: 1, endInputIndex: 1 },
          { id: 'c_q2_r', startShapeId: 'cnt', endShapeId: 'and_reset', startOutputIndex: 2, endInputIndex: 2 },
          { id: 'c_pl', startShapeId: 'and_reset', endShapeId: 'cnt', startOutputIndex: 0, endInputIndex: 2 }
        ],
        inputMapping: [{ internalShapeId: 'clk', type: 'input', index: 0 }],
        outputMapping: Array.from({length:4}, (_,i)=>({ internalShapeId: 'cnt', type: 'output', index: i }))
      } },
      { id: 'disp', type: 'DisplayBCD', x: 450, y: 50, width: 120, height: 200, label: 'Num', name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 300, width: 600, height: 60, label: 'Simulador de Dado: Presione ROLL para generar un número al azar del 1 al 6.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      { id: 'cw1', startShapeId: 'btn', endShapeId: 'dice', startOutputIndex: 0, endInputIndex: 0 },
      ...Array.from({length:4}, (_,i)=>({ id: `cw_f${i}`, startShapeId: 'dice', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i }))
    ]
  },
  'Convertidor de 4-Bits a 7-Seg (Bloque)': {
    fileName: '4-Bit to 7-Seg Decoder',
    shapes: [
      { id: 'sw', type: 'InputControl', x: 50, y: 100, width: 100, height: 160, label: 'BCD In', inputs: [], outputs: Array.from({length:4}, (_,i)=>({x:80,y:20+i*35,label:`A${i}`,value:0,name:`a${i}`})), name: 'sw' },
      { id: 'dec', type: 'CustomBlock', x: 250, y: 100, width: 140, height: 200, label: 'BCD-7S Decoder', inputs: Array.from({length:4}, (_,i)=>({x:0,y:25+i*40,label:`A${i}`,value:0,name:`a${i}`})), outputs: Array.from({length:7}, (_,i)=>({x:140,y:15+i*25,label:String.fromCharCode(97+i),value:0,name:`out_${i}`})), subcircuit: {
        shapes: [
          { id: 'ic', type: 'IC7447', x: 50, y: 50, width: 120, height: 200, label: '74LS47 IC', name: 'ic' }
        ],
        connectors: [],
        inputMapping: Array.from({length:4}, (_,i)=>({ internalShapeId: 'ic', type: 'input', index: i })),
        outputMapping: Array.from({length:7}, (_,i)=>({ internalShapeId: 'ic', type: 'output', index: i }))
      }, name: 'dec' },
      { id: 'disp', type: 'Display7Segment', x: 450, y: 50, width: 120, height: 360, label: '7-Seg Disp', name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 450, width: 600, height: 60, label: 'Convertidor de 4-Bits a 7-Segmentos: Usa un bloque con el IC 7447 para manejar un display de 7 segmentos común.', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      ...Array.from({length:4}, (_,i)=>({ id: `ci_${i}`, startShapeId: 'sw', endShapeId: 'dec', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({length:7}, (_,i)=>({ id: `co_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i }))
    ]
  },
  'Convertidor de 4-Bits a 8-Seg (Bloque)': {
    fileName: '4-Bit to 8-Seg Decoder',
    shapes: [
      { id: 'sw', type: 'InputControl', x: 50, y: 100, width: 100, height: 160, label: 'BCD In', name: 'sw' },
      { id: 'sw_dp', type: 'ToggleSwitch', x: 50, y: 300, width: 80, height: 30, label: 'DP Switch', outputs: [{x:60,y:15,label:'DP',value:0,name:'dp'}], name: 'sw_dp' },
      { id: 'dec', type: 'CustomBlock', x: 250, y: 100, width: 140, height: 200, label: 'BCD-7S Decoder', inputs: Array.from({length:4}, (_,i)=>({x:0,y:25+i*40,label:`A${i}`,value:0,name:`a${i}`})), outputs: Array.from({length:7}, (_,i)=>({x:140,y:15+i*25,label:String.fromCharCode(97+i),value:0,name:`out_${i}`})), subcircuit: {
        shapes: [
          { id: 'ic', type: 'IC7447', x: 50, y: 50, width: 120, height: 200, label: '74LS47 IC', name: 'ic' }
        ],
        connectors: [],
        inputMapping: Array.from({length:4}, (_,i)=>({ internalShapeId: 'ic', type: 'input', index: i })),
        outputMapping: Array.from({length:7}, (_,i)=>({ internalShapeId: 'ic', type: 'output', index: i }))
      }, name: 'dec' },
      { id: 'disp', type: 'Display8Segment', x: 450, y: 50, width: 120, height: 400, label: '8-Seg Disp', name: 'disp' },
      { id: 'txt', type: 'Text', x: 50, y: 500, width: 600, height: 60, label: 'Convertidor de 4-Bits a 8-Segmentos: Similar al de 7, incluye control para el Punto Decimal (DP).', inputs: [], outputs: [], name: 'txt' }
    ] as Shape[],
    connectors: [
      ...Array.from({length:4}, (_,i)=>({ id: `ci_${i}`, startShapeId: 'sw', endShapeId: 'dec', startOutputIndex: i, endInputIndex: i })),
      ...Array.from({length:7}, (_,i)=>({ id: `co_${i}`, startShapeId: 'dec', endShapeId: 'disp', startOutputIndex: i, endInputIndex: i })),
      { id: 'cdp', startShapeId: 'sw_dp', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 7 }
    ]
  },
  '4-bit TTL Counter': {
    fileName: '4-bit TTL Counter',
    shapes: [
      { id: 'vcc', type: 'HighConstant', x: 50, y: 50, width: 80, height: 40, label: 'VCC (+5V)', inputs: [], outputs: [{ x: 70, y: 20, label: 'VCC', value: 1, name: 'out' }], name: 'vcc', color: 'red' },
      { id: 'clk', type: 'Clock', x: 50, y: 150, width: 80, height: 40, label: 'Pulse', inputs: [], outputs: [{ x: 70, y: 20, label: 'CLK', value: 0, name: 'out' }], name: 'clk', color: 'blue', frequency: 1 },
      { id: 'u1', type: 'IC74107', x: 200, y: 50, width: 160, height: 80, label: '74LS107 (Bit 0,1)', 
        inputs: [
          { x: 20, y: 80, label: '1J', value: 1, name: '1j' }, { x: 80, y: 80, label: '1K', value: 1, name: '1k' }, { x: 60, y: 0, label: '1CLK', value: 0, name: '1clk' }, { x: 40, y: 0, label: '1CLR', value: 1, name: '1clr' },
          { x: 140, y: 0, label: '2J', value: 0, name: '2j' }, { x: 80, y: 0, label: '2K', value: 0, name: '2k' }, { x: 120, y: 0, label: '2CLK', value: 0, name: '2clk' }, { x: 100, y: 0, label: '2CLR', value: 1, name: '2clr' },
          { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }
        ], outputs: [
          { x: 60, y: 80, label: '1Q', value: 0, name: '1q' }, { x: 40, y: 80, label: '1!Q', value: 1, name: '1q_n' },
          { x: 100, y: 80, label: '2Q', value: 0, name: '2q' }, { x: 120, y: 80, label: '2!Q', value: 1, name: '2q_n' }
        ], name: 'u1' 
      },
      { id: 'u2', type: 'IC74107', x: 200, y: 200, width: 160, height: 80, label: '74LS107 (Bit 2,3)', 
        inputs: [
          { x: 20, y: 80, label: '3J', value: 0, name: '1j' }, { x: 80, y: 80, label: '3K', value: 0, name: '1k' }, { x: 60, y: 0, label: '3CLK', value: 0, name: '1clk' }, { x: 40, y: 0, label: '3CLR', value: 1, name: '1clr' },
          { x: 140, y: 0, label: '4J', value: 0, name: '2j' }, { x: 80, y: 0, label: '4K', value: 0, name: '2k' }, { x: 120, y: 0, label: '4CLK', value: 0, name: '2clk' }, { x: 100, y: 0, label: '2CLR', value: 1, name: '2clr' },
          { x: 20, y: 0, label: 'VCC', value: 1, name: 'vcc' }, { x: 140, y: 80, label: 'GND', value: 0, name: 'gnd' }
        ], outputs: [
          { x: 60, y: 80, label: '3Q', value: 0, name: '1q' }, { x: 40, y: 80, label: '3!Q', value: 1, name: '1q_n' },
          { x: 100, y: 80, label: '4Q', value: 0, name: '2q' }, { x: 120, y: 80, label: '4!Q', value: 1, name: '2q_n' }
        ], name: 'u2' 
      },
      { id: 'u3', type: 'IC7408', x: 450, y: 125, width: 160, height: 80, label: '74LS08', 
        inputs: [
          { x: 20, y: 80, label: '1A', value: 0, name: '1a' }, { x: 40, y: 80, label: '1B', value: 0, name: '1b' },
          { x: 80, y: 80, label: '2A', value: 0, name: '2a' }, { x: 100, y: 80, label: '2B', value: 0, name: '2b' }
        ], outputs: [
          { x: 60, y: 80, label: '1Y', value: 0, name: '1y' }, { x: 120, y: 80, label: '2Y', value: 0, name: '2y' }
        ], name: 'u3' 
      },
      { id: 'disp', type: 'DisplayBCD', x: 650, y: 100, width: 120, height: 200, label: 'Hex Counter', 
        inputs: [
          { x: 0, y: 15, label: 'D0', value: 0, name: 'd0' }, { x: 0, y: 35, label: 'D1', value: 0, name: 'd1' },
          { x: 0, y: 55, label: 'C', value: 0, name: 'd2' }, { x: 0, y: 75, label: 'D', value: 0, name: 'd3' }
        ], outputs: [], name: 'disp' 
      },
      { id: 't1', type: 'Text', x: 50, y: 320, width: 700, height: 80, label: '4-bit Synchronous TTL Counter using 74LS107 Dual JK Flip-Flops and 74LS08 AND gates. All Flip-Flops share the same clock signal. JK inputs for each stage are determined by the AND of previous stages.', inputs: [], outputs: [], name: 'desc', color: '#e5e7eb', font: '14px Orbitron' },
    ] as Shape[],
    connectors: [
      { id: 'c_clk1', startShapeId: 'clk', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_clk2', startShapeId: 'clk', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'c_clk3', startShapeId: 'clk', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_clk4', startShapeId: 'clk', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'c_vcc_j1', startShapeId: 'vcc', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_vcc_k1', startShapeId: 'vcc', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_vcc_clr1', startShapeId: 'vcc', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_vcc_clr2', startShapeId: 'vcc', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'c_vcc_clr3', startShapeId: 'vcc', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_vcc_clr4', startShapeId: 'vcc', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 7 },
      { id: 'c_q1_j2', startShapeId: 'u1', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'c_q1_k2', startShapeId: 'u1', endShapeId: 'u1', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'c_q1_a1', startShapeId: 'u1', endShapeId: 'u3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q2_b1', startShapeId: 'u1', endShapeId: 'u3', startOutputIndex: 2, endInputIndex: 1 },
      { id: 'c_y1_j3', startShapeId: 'u3', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_y1_k3', startShapeId: 'u3', endShapeId: 'u2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'c_y1_a2', startShapeId: 'u3', endShapeId: 'u3', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_q3_b2', startShapeId: 'u2', endShapeId: 'u3', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'c_y2_j4', startShapeId: 'u3', endShapeId: 'u2', startOutputIndex: 1, endInputIndex: 4 },
      { id: 'c_y2_k4', startShapeId: 'u3', endShapeId: 'u2', startOutputIndex: 1, endInputIndex: 5 },
      { id: 'c_q1_d', startShapeId: 'u1', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_q2_d', startShapeId: 'u1', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 1 },
      { id: 'c_q3_d', startShapeId: 'u2', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'c_q4_d', startShapeId: 'u2', endShapeId: 'disp', startOutputIndex: 2, endInputIndex: 3 },
    ]
  },
  '4-Bit Sum Block': {
    fileName: '4-Bit Sum Block',
    shapes: [
      {
        id: "ilr85oebt",
        type: "CustomBlock",
        x: 464,
        y: 63,
        width: 164,
        height: 240,
        label: "4-Bit Sum Verified",
        inputs: [
          { x: 0, y: 20, label: "InputL Out", value: 0, name: "in_0" },
          { x: 0, y: 45, label: "InputL Out", value: 0, name: "in_1" },
          { x: 0, y: 70, label: "InputL Out", value: 0, name: "in_2" },
          { x: 0, y: 95, label: "InputL Out", value: 0, name: "in_3" },
          { x: 0, y: 120, label: "InputL Out", value: 0, name: "in_4" },
          { x: 0, y: 145, label: "InputL Out", value: 0, name: "in_5" },
          { x: 0, y: 170, label: "InputL Out", value: 0, name: "in_6" },
          { x: 0, y: 195, label: "InputL Out", value: 0, name: "in_7" }
        ],
        outputs: [
          { x: 164, y: 20, label: "DisplayBCD D0", value: 0, name: "out_0" },
          { x: 164, y: 45, label: "DisplayBCD D1", value: 0, name: "out_1" },
          { x: 164, y: 70, label: "DisplayBCD D2", value: 0, name: "out_2" },
          { x: 164, y: 95, label: "DisplayBCD D3", value: 0, name: "out_3" }
        ],
        name: "Shape_wgnwp",
        color: "#8b5cf6",
        font: "14px Orbitron",
        subcircuit: {
          shapes: [
            { id: "0b5ckct2p", type: "InputL", x: 89, y: 97, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_c4mbi", color: "#ef4444" },
            { id: "z16715zw3", type: "InputL", x: 89, y: 127, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_nd7t0", color: "#ef4444" },
            { id: "n83w5nat8", type: "InputL", x: 89, y: 157, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_s9sfz", color: "#ef4444" },
            { id: "z2mbxflo7", type: "InputL", x: 89, y: 187, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_c8vc6", color: "#ef4444" },
            { id: "wc03xqrat", type: "InputL", x: 97, y: 303, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_259hu", color: "#ef4444" },
            { id: "y4uj40atp", type: "InputL", x: 97, y: 333, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_9cxn2", color: "#ef4444" },
            { id: "m9l45734m", type: "InputL", x: 97, y: 363, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_rehd1", color: "#ef4444" },
            { id: "o4kux4iio", type: "InputL", x: 105, y: 418, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_dp290", color: "#ef4444" },
            { id: "89qx02h7p", type: "DisplayBCD", x: 703, y: 239, width: 120, height: 200, label: "DisplayBCD", inputs: [{ x: 0, y: 15, label: "D0", value: 0, name: "d0" }, { x: 0, y: 35, label: "D1", value: 0, name: "d1" }, { x: 0, y: 55, label: "D2", value: 0, name: "d2" }, { x: 0, y: 75, label: "D3", value: 0, name: "d3" }], outputs: [], name: "Shape_1hs6n", color: "gray" },
            {
              id: "re0xzjf4e",
              type: "CustomBlock",
              x: 440,
              y: 146,
              width: 120,
              height: 115,
              label: "Full Adder",
              inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }],
              outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }],
              name: "Shape_hk453",
              color: "#8b5cf6",
              subcircuit: {
                shapes: [
                  { id: "hge88cddc", type: "XOR", x: 284, y: 90, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray" },
                  { id: "kls62jc20", type: "XOR", x: 387, y: 94, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray" },
                  { id: "bydvut9p5", type: "AND", x: 284, y: 189, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray" },
                  { id: "6y2fe8hmp", type: "AND", x: 387, y: 197, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray" },
                  { id: "8n2yoysqy", type: "OR", x: 485, y: 203, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray" },
                  { id: "hudfyn3hd", type: "InputL", x: 139, y: 38, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444" },
                  { id: "tt62vtsgj", type: "InputL", x: 139, y: 140, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444" },
                  { id: "fftgderw1", type: "InputL", x: 139, y: 230, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444" },
                  { id: "rut969tm5", type: "OutPutL", x: 596, y: 90, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6" },
                  { id: "69txkidh0", type: "OutPutL", x: 596, y: 212, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6" }
                ],
                connectors: [
                  { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
                ],
                inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
                outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
              }
            },
            {
              id: "jz5u7tze8",
              type: "CustomBlock",
              x: 545,
              y: 111,
              width: 120,
              height: 115,
              label: "Full Adder",
              inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }],
              outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }],
              name: "Shape_hk453",
              color: "#8b5cf6",
              subcircuit: {
                shapes: [
                  { id: "hge88cddc", type: "XOR", x: 284, y: 90, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray" },
                  { id: "kls62jc20", type: "XOR", x: 387, y: 94, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray" },
                  { id: "bydvut9p5", type: "AND", x: 284, y: 189, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray" },
                  { id: "6y2fe8hmp", type: "AND", x: 387, y: 197, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray" },
                  { id: "8n2yoysqy", type: "OR", x: 485, y: 203, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray" },
                  { id: "hudfyn3hd", type: "InputL", x: 139, y: 38, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444" },
                  { id: "tt62vtsgj", type: "InputL", x: 139, y: 140, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444" },
                  { id: "fftgderw1", type: "InputL", x: 139, y: 230, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444" },
                  { id: "rut969tm5", type: "OutPutL", x: 596, y: 90, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6" },
                  { id: "69txkidh0", type: "OutPutL", x: 596, y: 212, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6" }
                ],
                connectors: [
                  { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
                ],
                inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
                outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
              }
            },
            {
              id: "kje9m2pdg",
              type: "CustomBlock",
              x: 642,
              y: 83,
              width: 120,
              height: 115,
              label: "Full Adder",
              inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }],
              outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }],
              name: "Shape_hk453",
              color: "#8b5cf6",
              subcircuit: {
                shapes: [
                  { id: "hge88cddc", type: "XOR", x: 284, y: 90, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray" },
                  { id: "kls62jc20", type: "XOR", x: 387, y: 94, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray" },
                  { id: "bydvut9p5", type: "AND", x: 284, y: 189, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray" },
                  { id: "6y2fe8hmp", type: "AND", x: 387, y: 197, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray" },
                  { id: "8n2yoysqy", type: "OR", x: 485, y: 203, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray" },
                  { id: "hudfyn3hd", type: "InputL", x: 139, y: 38, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444" },
                  { id: "tt62vtsgj", type: "InputL", x: 139, y: 140, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444" },
                  { id: "fftgderw1", type: "InputL", x: 139, y: 230, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444" },
                  { id: "rut969tm5", type: "OutPutL", x: 596, y: 90, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6" },
                  { id: "69txkidh0", type: "OutPutL", x: 596, y: 212, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6" }
                ],
                connectors: [
                  { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
                ],
                inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
                outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
              }
            },
            {
              id: "bf9qpad0n",
              type: "CustomBlock",
              x: 757,
              y: 52,
              width: 120,
              height: 115,
              label: "Full Adder",
              inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }],
              outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }],
              name: "Shape_hk453",
              color: "#8b5cf6",
              subcircuit: {
                shapes: [
                  { id: "hge88cddc", type: "XOR", x: 284, y: 90, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray" },
                  { id: "kls62jc20", type: "XOR", x: 387, y: 94, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray" },
                  { id: "bydvut9p5", type: "AND", x: 284, y: 189, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray" },
                  { id: "6y2fe8hmp", type: "AND", x: 387, y: 197, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray" },
                  { id: "8n2yoysqy", type: "OR", x: 485, y: 203, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray" },
                  { id: "hudfyn3hd", type: "InputL", x: 139, y: 38, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444" },
                  { id: "tt62vtsgj", type: "InputL", x: 139, y: 140, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444" },
                  { id: "fftgderw1", type: "InputL", x: 139, y: 230, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444" },
                  { id: "rut969tm5", type: "OutPutL", x: 596, y: 90, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6" },
                  { id: "69txkidh0", type: "OutPutL", x: 596, y: 212, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6" }
                ],
                connectors: [
                  { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                  { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                  { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
                ],
                inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
                outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
              }
            },
            { id: "m8mfcfktr", type: "Text", x: 137, y: 47, width: 200, height: 40, label: "4-Bit Sum", name: "Shape_3v1lg", color: "gray" }
          ],
          connectors: [
            { id: "crm54jisn", startShapeId: "re0xzjf4e", endShapeId: "jz5u7tze8", startOutputIndex: 1, endInputIndex: 2 },
            { id: "7sbppaquk", startShapeId: "jz5u7tze8", endShapeId: "kje9m2pdg", startOutputIndex: 1, endInputIndex: 2 },
            { id: "i44m5640c", startShapeId: "kje9m2pdg", endShapeId: "bf9qpad0n", startOutputIndex: 1, endInputIndex: 2 },
            { id: "k63aakgju", startShapeId: "re0xzjf4e", endShapeId: "89qx02h7p", startOutputIndex: 0, endInputIndex: 0 },
            { id: "hiueeud02", startShapeId: "jz5u7tze8", endShapeId: "89qx02h7p", startOutputIndex: 0, endInputIndex: 1 },
            { id: "6t05hcq6b", startShapeId: "kje9m2pdg", endShapeId: "89qx02h7p", startOutputIndex: 0, endInputIndex: 2 },
            { id: "ph3yytkg4", startShapeId: "bf9qpad0n", endShapeId: "89qx02h7p", startOutputIndex: 0, endInputIndex: 3 },
            { id: "01xvqfanc", startShapeId: "0b5ckct2p", endShapeId: "re0xzjf4e", startOutputIndex: 0, endInputIndex: 0 },
            { id: "q7edb0ztd", startShapeId: "z16715zw3", endShapeId: "jz5u7tze8", startOutputIndex: 0, endInputIndex: 0 },
            { id: "ryehvwxjx", startShapeId: "n83w5nat8", endShapeId: "kje9m2pdg", startOutputIndex: 0, endInputIndex: 0 },
            { id: "e7pvnw1cg", startShapeId: "z2mbxflo7", endShapeId: "bf9qpad0n", startOutputIndex: 0, endInputIndex: 0 },
            { id: "3fd37wf4s", startShapeId: "wc03xqrat", endShapeId: "re0xzjf4e", startOutputIndex: 0, endInputIndex: 1 },
            { id: "25qec60xv", startShapeId: "y4uj40atp", endShapeId: "jz5u7tze8", startOutputIndex: 0, endInputIndex: 1 },
            { id: "0a7wbuwo9", startShapeId: "m9l45734m", endShapeId: "kje9m2pdg", startOutputIndex: 0, endInputIndex: 1 },
            { id: "o7rlc5prh", startShapeId: "o4kux4iio", endShapeId: "bf9qpad0n", startOutputIndex: 0, endInputIndex: 1 }
          ],
          inputMapping: [{ internalShapeId: "0b5ckct2p", type: "output", index: 0 }, { internalShapeId: "z16715zw3", type: "output", index: 0 }, { internalShapeId: "n83w5nat8", type: "output", index: 0 }, { internalShapeId: "z2mbxflo7", type: "output", index: 0 }, { internalShapeId: "wc03xqrat", type: "output", index: 0 }, { internalShapeId: "y4uj40atp", type: "output", index: 0 }, { internalShapeId: "m9l45734m", type: "output", index: 0 }, { internalShapeId: "o4kux4iio", type: "output", index: 0 }],
          outputMapping: [{ internalShapeId: "89qx02h7p", type: "input", index: 0 }, { internalShapeId: "89qx02h7p", type: "input", index: 1 }, { internalShapeId: "89qx02h7p", type: "input", index: 2 }, { internalShapeId: "89qx02h7p", type: "input", index: 3 }]
        }
      },
      { id: "h7kfx7xgj", type: "InputL", x: 132, y: 37, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_vbq7g", color: "red" },
      { id: "km58fc80c", type: "InputL", x: 132, y: 67, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_714ri", color: "red" },
      { id: "xuhnd2tru", type: "InputL", x: 132, y: 97, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_6pq78", color: "red" },
      { id: "ol868yez6", type: "InputL", x: 132, y: 127, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_4lx1g", color: "red" },
      { id: "oy4w2x1u5", type: "InputL", x: 136, y: 205, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_vbq7g", color: "red" },
      { id: "82hn6sdaa", type: "InputL", x: 136, y: 235, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_714ri", color: "red" },
      { id: "dadqhdzgb", type: "InputL", x: 136, y: 265, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_6pq78", color: "red" },
      { id: "fj2srf95b", type: "InputL", x: 136, y: 295, width: 100, height: 50, label: "InputL", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_4lx1g", color: "red" },
      { id: "eq3fsd53r", type: "DisplayBCD", x: 624, y: 80, width: 120, height: 200, label: "DisplayBCD", inputs: [{ x: 0, y: 15, label: "D0", value: 0, name: "d0" }, { x: 0, y: 35, label: "D1", value: 0, name: "d1" }, { x: 0, y: 55, label: "D2", value: 0, name: "d2" }, { x: 0, y: 75, label: "D3", value: 0, name: "d3" }], outputs: [], name: "Shape_v98b2", color: "gray" },
      { id: "lymj4o1ek", type: "DisplayBCD", x: 508, y: 269, width: 120, height: 200, label: "DisplayBCD", inputs: [{ x: 0, y: 15, label: "D0", value: 0, name: "d0" }, { x: 0, y: 35, label: "D1", value: 0, name: "d1" }, { x: 0, y: 55, label: "D2", value: 0, name: "d2" }, { x: 0, y: 75, label: "D3", value: 0, name: "d3" }], outputs: [], name: "Shape_h75vy", color: "gray" },
      { id: "i7mue712n", type: "DisplayBCD", x: 432, y: 462, width: 120, height: 200, label: "DisplayBCD", inputs: [{ x: 0, y: 15, label: "D0", value: 0, name: "d0" }, { x: 0, y: 35, label: "D1", value: 0, name: "d1" }, { x: 0, y: 55, label: "D2", value: 0, name: "d2" }, { x: 0, y: 75, label: "D3", value: 0, name: "d3" }], outputs: [], name: "Shape_l410g", color: "gray" }
    ] as Shape[],
    connectors: [
      { id: "nskmhbx7f", startShapeId: "h7kfx7xgj", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 0 },
      { id: "fdoaki5vi", startShapeId: "km58fc80c", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 1 },
      { id: "p82czd5tf", startShapeId: "xuhnd2tru", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 2 },
      { id: "p3cukje5q", startShapeId: "ol868yez6", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 3 },
      { id: "jujrd158k", startShapeId: "oy4w2x1u5", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 4 },
      { id: "e2tz5v652", startShapeId: "82hn6sdaa", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 5 },
      { id: "766cnlsni", startShapeId: "dadqhdzgb", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 6 },
      { id: "ydeh6a0cw", startShapeId: "fj2srf95b", endShapeId: "ilr85oebt", startOutputIndex: 0, endInputIndex: 7 },
      { id: "z1un6mhyo", startShapeId: "ilr85oebt", endShapeId: "eq3fsd53r", startOutputIndex: 0, endInputIndex: 0 },
      { id: "gmkj9g37j", startShapeId: "ilr85oebt", endShapeId: "eq3fsd53r", startOutputIndex: 1, endInputIndex: 1 },
      { id: "0k9c40a1n", startShapeId: "ilr85oebt", endShapeId: "eq3fsd53r", startOutputIndex: 2, endInputIndex: 2 },
      { id: "zgfsbiz8u", startShapeId: "ilr85oebt", endShapeId: "eq3fsd53r", startOutputIndex: 3, endInputIndex: 3 },
      { id: "k5em7tq2d", startShapeId: "h7kfx7xgj", endShapeId: "lymj4o1ek", startOutputIndex: 0, endInputIndex: 0 },
      { id: "jlu90ebwj", startShapeId: "km58fc80c", endShapeId: "lymj4o1ek", startOutputIndex: 0, endInputIndex: 1 },
      { id: "47weta99y", startShapeId: "xuhnd2tru", endShapeId: "lymj4o1ek", startOutputIndex: 0, endInputIndex: 2 },
      { id: "uwfa0mwmz", startShapeId: "ol868yez6", endShapeId: "lymj4o1ek", startOutputIndex: 0, endInputIndex: 3 },
      { id: "iqwe9rujo", startShapeId: "oy4w2x1u5", endShapeId: "i7mue712n", startOutputIndex: 0, endInputIndex: 0 },
      { id: "t2sswvss1", startShapeId: "82hn6sdaa", endShapeId: "i7mue712n", startOutputIndex: 0, endInputIndex: 1 },
      { id: "bm2zbuhw8", startShapeId: "dadqhdzgb", endShapeId: "i7mue712n", startOutputIndex: 0, endInputIndex: 2 },
      { id: "5asbgaq7d", startShapeId: "fj2srf95b", endShapeId: "i7mue712n", startOutputIndex: 0, endInputIndex: 3 }
    ]
  },
  'Flowchart Demo': {
    fileName: 'Flowchart Demo',
    shapes: [
      { id: 'start', type: 'FlowStart', x: 50, y: 50, width: 120, height: 60, label: 'START', outputs: [{ x: 60, y: 60, label: 'Out', value: 1, name: 'out' }], name: 'start' },
      { id: 'proc1', type: 'FlowProcess', x: 50, y: 150, width: 120, height: 60, label: 'INIT VARS', inputs: [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 60, label: 'Out', value: 0, name: 'out' }], name: 'proc1' },
      { id: 'dec1', type: 'FlowDecision', x: 50, y: 250, width: 120, height: 80, label: 'IS > 10?', inputs: [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 80, label: 'YES', value: 0, name: 'yes' }, { x: 120, y: 40, label: 'NO', value: 0, name: 'no' }], name: 'dec1' },
      { id: 'proc2', type: 'FlowProcess', x: 50, y: 380, width: 120, height: 60, label: 'FINISH', inputs: [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 60, y: 60, label: 'Out', value: 0, name: 'out' }], name: 'proc2' },
      { id: 'end', type: 'FlowEnd', x: 50, y: 480, width: 120, height: 60, label: 'END', inputs: [{ x: 60, y: 0, label: 'In', value: 0, name: 'in' }], name: 'end' },
      { id: 'proc3', type: 'FlowProcess', x: 250, y: 260, width: 120, height: 60, label: 'INCREMENT', inputs: [{ x: 0, y: 30, label: 'In', value: 0, name: 'in' }], outputs: [{ x: 120, y: 30, label: 'Out', value: 0, name: 'out' }], name: 'proc3' },
      { id: 'data', type: 'FlowInputOutput', x: 250, y: 150, width: 120, height: 60, label: 'READ SENSOR', outputs: [{ x: 60, y: 60, label: 'Out', value: 0, name: 'out' }], name: 'data' }
    ] as Shape[],
    connectors: [
      { id: 'c1', startShapeId: 'start', endShapeId: 'proc1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c2', startShapeId: 'proc1', endShapeId: 'dec1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c3', startShapeId: 'dec1', endShapeId: 'proc2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c4', startShapeId: 'proc2', endShapeId: 'end', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c5', startShapeId: 'dec1', endShapeId: 'proc3', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'c6', startShapeId: 'proc3', endShapeId: 'proc1', startOutputIndex: 0, endInputIndex: 0 }
    ]
  },
  'PCB Layout Example': {
    fileName: 'PCB Layout Example',
    shapes: [
      { id: 'board', type: 'PCB_Board', x: 20, y: 20, width: 760, height: 560, label: 'Main Digital Controller', inputs: [], outputs: [], name: 'board', color: '#0c0c0c' },
      { id: 'lcd', type: 'PCB_LCD16x2', x: 50, y: 50, width: 400, height: 120, label: 'LCD Module Footprint', inputs: [], outputs: [], name: 'lcd' },
      { id: 'mcu', type: 'PCB_DIP40', x: 260, y: 200, width: 100, height: 250, label: 'MCU Foothprint', inputs: [], outputs: [], name: 'mcu' },
      { id: 'ic1', type: 'PCB_DIP16', x: 450, y: 350, width: 60, height: 100, label: 'SN74HC595', inputs: [], outputs: [], name: 'ic1' },
      { id: 'r1', type: 'PCB_Resistor', x: 100, y: 250, width: 40, height: 15, label: '10k', inputs: [], outputs: [], name: 'r1' },
      { id: 'r2', type: 'PCB_Resistor', x: 150, y: 300, width: 40, height: 15, label: '10k', inputs: [], outputs: [], name: 'r2' },
      { id: 'r3', type: 'PCB_Resistor', x: 120, y: 400, width: 40, height: 15, label: '10k', inputs: [], outputs: [], name: 'r3' },
      { id: 'cp1', type: 'PCB_Capacitor_Polar', x: 550, y: 300, width: 30, height: 30, label: '100uF', inputs: [], outputs: [], name: 'cp1' },
      { id: 'cp2', type: 'PCB_Capacitor_Polar', x: 550, y: 350, width: 30, height: 30, label: '100uF', inputs: [], outputs: [], name: 'cp2' },
      { id: 'sw1', type: 'PCB_Switch_Tactile', x: 500, y: 250, width: 40, height: 40, label: 'BUTTON', inputs: [], outputs: [], name: 'sw1' },
      { id: 'pot1', type: 'PCB_Potentiometer', x: 70, y: 450, width: 40, height: 40, label: 'CONTRAST', inputs: [], outputs: [], name: 'pot1' },
      { id: 'hdr1', type: 'PCB_Header_8', x: 200, y: 500, width: 20, height: 100, label: 'EXPANSION', rotation: 90, inputs: [], outputs: [], name: 'hdr1' },
      { id: 'hdr2', type: 'PCB_Header_8', x: 450, y: 500, width: 20, height: 100, label: 'ICSP', rotation: 90, inputs: [], outputs: [], name: 'hdr2' },
      { id: 'xtal', type: 'PCB_Crystal', x: 380, y: 250, width: 30, height: 15, label: '16MHz', inputs: [], outputs: [], name: 'xtal' },
      { id: 'via1', type: 'PCB_Via', x: 200, y: 200, width: 10, height: 10, label: '', inputs: [], outputs: [], name: 'via1' },
      { id: 'via2', type: 'PCB_Via', x: 210, y: 210, width: 10, height: 10, label: '', inputs: [], outputs: [], name: 'via2' },
      { id: 'h1', type: 'PCB_Mounting_Hole', x: 35, y: 35, width: 30, height: 30, label: '', inputs: [], outputs: [], name: 'h1' },
      { id: 'h2', type: 'PCB_Mounting_Hole', x: 765, y: 35, width: 30, height: 30, label: '', inputs: [], outputs: [], name: 'h2' },
      { id: 'h3', type: 'PCB_Mounting_Hole', x: 35, y: 565, width: 30, height: 30, label: '', inputs: [], outputs: [], name: 'h3' },
      { id: 'h4', type: 'PCB_Mounting_Hole', x: 765, y: 565, width: 30, height: 30, label: '', inputs: [], outputs: [], name: 'h4' },
      { id: 'desc', type: 'Text', x: 550, y: 500, width: 200, height: 50, label: 'PCB RATSNEST VIEW\n(Layout Prototype)', color: '#22c55e', name: 'desc' }
    ] as Shape[],
    connectors: [
      { id: 'pc1', startShapeId: 'mcu', endShapeId: 'lcd', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'pc2', startShapeId: 'mcu', endShapeId: 'lcd', startOutputIndex: 1, endInputIndex: 1 },
      { id: 'pc3', startShapeId: 'mcu', endShapeId: 'lcd', startOutputIndex: 2, endInputIndex: 2 },
      { id: 'pc4', startShapeId: 'mcu', endShapeId: 'r1', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'pc5', startShapeId: 'mcu', endShapeId: 'cp1', startOutputIndex: 4, endInputIndex: 0 },
      { id: 'pc6', startShapeId: 'sw1', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'pc7', startShapeId: 'xtal', endShapeId: 'mcu', startOutputIndex: 0, endInputIndex: 6 },
      { id: 'pc8', startShapeId: 'xtal', endShapeId: 'mcu', startOutputIndex: 1, endInputIndex: 7 },
      { id: 'pc9', startShapeId: 'mcu', endShapeId: 'hdr1', startOutputIndex: 8, endInputIndex: 0 },
      { id: 'pc10', startShapeId: 'mcu', endShapeId: 'ic1', startOutputIndex: 9, endInputIndex: 0 },
      { id: 'pc11', startShapeId: 'ic1', endShapeId: 'hdr2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'pc12', startShapeId: 'pot1', endShapeId: 'lcd', startOutputIndex: 0, endInputIndex: 3 }
    ]
  },
  'Gate Level 4-Bit to 7-Seg Driver': {
    fileName: '7-Seg Individual-Gates Driver',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 800, height: 40, label: 'Gate Level 4-Bit to 7-Segment Driver (Individual Inputs)', name: 'title', color: '#10b981', font: '24px Orbitron' },
      { id: 'desc', type: 'Text', x: 50, y: 700, width: 900, height: 60, label: 'Standard BCD mapping. Uses individual inputs and gates with max 4 inputs per gate for better modular decomposition.', name: 'desc', color: '#9ca3af', font: '14px Inter' },
      
      // Individual Inputs: Toggle Switches
      { id: 'sw_s3', type: 'ToggleSwitch', x: 50, y: 100, width: 80, height: 40, label: 'S3 (8)', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s3' },
      { id: 'sw_s2', type: 'ToggleSwitch', x: 50, y: 160, width: 80, height: 40, label: 'S2 (4)', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s2' },
      { id: 'sw_s1', type: 'ToggleSwitch', x: 50, y: 220, width: 80, height: 40, label: 'S1 (2)', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s1' },
      { id: 'sw_s0', type: 'ToggleSwitch', x: 50, y: 280, width: 80, height: 40, label: 'S0 (1)', inputs: [], outputs: [{ x: 60, y: 20, label: 'Out', value: 0, name: 'out' }], name: 'sw_s0' },

      // Inverters
      { id: 'not_3', type: 'NOT', x: 200, y: 100, width: 50, height: 35, label: '!S3', name: 'not_3' },
      { id: 'not_2', type: 'NOT', x: 200, y: 160, width: 50, height: 35, label: '!S2', name: 'not_2' },
      { id: 'not_1', type: 'NOT', x: 200, y: 220, width: 50, height: 35, label: '!S1', name: 'not_1' },
      { id: 'not_0', type: 'NOT', x: 200, y: 280, width: 50, height: 35, label: '!S0', name: 'not_0' },

      // Product Terms (ANDs)
      { id: 'a1', type: 'AND', x: 350, y: 80, label: 'S2 & S0', name: 'a1' },
      { id: 'a2', type: 'AND', x: 350, y: 130, label: '!S2 & !S0', name: 'a2' },
      { id: 'a3', type: 'AND', x: 350, y: 180, label: 'S1 & S0', name: 'a3' },
      { id: 'a4', type: 'AND', x: 350, y: 230, label: '!S1 & !S0', name: 'a4' },
      { id: 'a5', type: 'AND', x: 350, y: 280, label: 'S1 & !S0', name: 'a5' },
      { id: 'a6', type: 'AND', x: 350, y: 330, label: '!S2 & S1', name: 'a6' },
      { id: 'a7', type: 'AND3', x: 350, y: 380, label: 'S2 & !S1 & S0', name: 'a7' },
      { id: 'a8', type: 'AND', x: 350, y: 440, label: 'S2 & !S1', name: 'a8' },
      { id: 'a9', type: 'AND', x: 350, y: 490, label: 'S2 & !S0', name: 'a9' },
      { id: 'a10', type: 'AND', x: 350, y: 540, label: '!S2 & S1', name: 'a10' },

      // OR Combination Logic (Max 4 inputs)
      // Segment a
      { id: 'or_a', type: 'OR4', x: 750, y: 80, label: 'OR_A', name: 'or_a' },
      // Segment b
      { id: 'or_b', type: 'OR3', x: 750, y: 160, label: 'OR_B', name: 'or_b' },
      // Segment c
      { id: 'or_c', type: 'OR3', x: 750, y: 240, label: 'OR_C', name: 'or_c' },
      // Segment d (Splitting OR5 into two gates)
      { id: 'or_d1', type: 'OR3', x: 600, y: 320, label: 'OR_D_PART', name: 'or_d1' },
      { id: 'or_d2', type: 'OR3', x: 750, y: 350, label: 'OR_D_FINAL', name: 'or_d2' },
      // Segment e
      { id: 'or_e', type: 'OR', x: 750, y: 450, label: 'OR_E', name: 'or_e' },
      // Segment f
      { id: 'or_f', type: 'OR4', x: 750, y: 520, label: 'OR_F', name: 'or_f' },
      // Segment g
      { id: 'or_g', type: 'OR4', x: 750, y: 600, label: 'OR_G', name: 'or_g' },

      // Final Display
      { id: 'disp', type: 'Display', x: 1000, y: 150, width: 100, height: 300, label: 'BCD-7S', inputs: [
        { x: 0, y: 15, label: 'A', value: 0 },
        { x: 0, y: 45, label: 'B', value: 0 },
        { x: 0, y: 75, label: 'C', value: 0 },
        { x: 0, y: 105, label: 'D', value: 0 },
        { x: 0, y: 135, label: 'E', value: 0 },
        { x: 0, y: 165, label: 'F', value: 0 },
        { x: 0, y: 195, label: 'G', value: 0 }
      ], name: 'disp' }
    ] as Shape[],
    connectors: [
      // S -> NOT
      { id: 'c_n3', startShapeId: 'sw_s3', endShapeId: 'not_3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_n2', startShapeId: 'sw_s2', endShapeId: 'not_2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_n1', startShapeId: 'sw_s1', endShapeId: 'not_1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'c_n0', startShapeId: 'sw_s0', endShapeId: 'not_0', startOutputIndex: 0, endInputIndex: 0 },

      // a1: S2 & S0
      { id: 'ca1_1', startShapeId: 'sw_s2', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca1_2', startShapeId: 'sw_s0', endShapeId: 'a1', startOutputIndex: 0, endInputIndex: 1 },
      // a2: !S2 & !S0
      { id: 'ca2_1', startShapeId: 'not_2', endShapeId: 'a2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca2_2', startShapeId: 'not_0', endShapeId: 'a2', startOutputIndex: 0, endInputIndex: 1 },
      // a3: S1 & S0
      { id: 'ca3_1', startShapeId: 'sw_s1', endShapeId: 'a3', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca3_2', startShapeId: 'sw_s0', endShapeId: 'a3', startOutputIndex: 0, endInputIndex: 1 },
      // a4: !S1 & !S0
      { id: 'ca4_1', startShapeId: 'not_1', endShapeId: 'a4', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca4_2', startShapeId: 'not_0', endShapeId: 'a4', startOutputIndex: 0, endInputIndex: 1 },
      // a5: S1 & !S0
      { id: 'ca5_1', startShapeId: 'sw_s1', endShapeId: 'a5', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca5_2', startShapeId: 'not_0', endShapeId: 'a5', startOutputIndex: 0, endInputIndex: 1 },
      // a6: !S2 & S1
      { id: 'ca6_1', startShapeId: 'not_2', endShapeId: 'a6', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca6_2', startShapeId: 'sw_s1', endShapeId: 'a6', startOutputIndex: 0, endInputIndex: 1 },
      // a7: S2 & !S1 & S0
      { id: 'ca7_1', startShapeId: 'sw_s2', endShapeId: 'a7', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca7_2', startShapeId: 'not_1', endShapeId: 'a7', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'ca7_3', startShapeId: 'sw_s0', endShapeId: 'a7', startOutputIndex: 0, endInputIndex: 2 },
      // a8: S2 & !S1
      { id: 'ca8_1', startShapeId: 'sw_s2', endShapeId: 'a8', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca8_2', startShapeId: 'not_1', endShapeId: 'a8', startOutputIndex: 0, endInputIndex: 1 },
      // a9: S2 & !S0
      { id: 'ca9_1', startShapeId: 'sw_s2', endShapeId: 'a9', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca9_2', startShapeId: 'not_0', endShapeId: 'a9', startOutputIndex: 0, endInputIndex: 1 },
      // a10: !S2 & S1
      { id: 'ca10_1', startShapeId: 'not_2', endShapeId: 'a10', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ca10_2', startShapeId: 'sw_s1', endShapeId: 'a10', startOutputIndex: 0, endInputIndex: 1 },

      // Seg A: S3 + S1 + a1 + a2
      { id: 'coa1', startShapeId: 'sw_s3', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'coa2', startShapeId: 'sw_s1', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'coa3', startShapeId: 'a1', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'coa4', startShapeId: 'a2', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 3 },

      // Seg B: !S2 + a3 + a4
      { id: 'cob1', startShapeId: 'not_2', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cob2', startShapeId: 'a3', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cob3', startShapeId: 'a4', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 2 },

      // Seg C: S2 + !S1 + S0
      { id: 'coc1', startShapeId: 'sw_s2', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'coc2', startShapeId: 'not_1', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'coc3', startShapeId: 'sw_s0', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 2 },

      // Seg D: S3 + a5 + a6 + a2 + a7 (OR5 split)
      { id: 'cod1', startShapeId: 'sw_s3', endShapeId: 'or_d1', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cod2', startShapeId: 'a5', endShapeId: 'or_d1', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cod3', startShapeId: 'a6', endShapeId: 'or_d1', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cod4', startShapeId: 'or_d1', endShapeId: 'or_d2', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cod5', startShapeId: 'a2', endShapeId: 'or_d2', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cod6', startShapeId: 'a7', endShapeId: 'or_d2', startOutputIndex: 0, endInputIndex: 2 },

      // Seg E: a2 + a5
      { id: 'coe1', startShapeId: 'a2', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'coe2', startShapeId: 'a5', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 1 },

      // Seg F: S3 + a4 + a8 + a9
      { id: 'cof1', startShapeId: 'sw_s3', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cof2', startShapeId: 'a4', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cof3', startShapeId: 'a8', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cof4', startShapeId: 'a9', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 3 },

      // Seg G: S3 + a8 + a10 + a5
      { id: 'cog1', startShapeId: 'sw_s3', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cog2', startShapeId: 'a8', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cog3', startShapeId: 'a10', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'cog4', startShapeId: 'a5', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 3 },

      // Final Segments -> Display
      { id: 'da', startShapeId: 'or_a', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'db', startShapeId: 'or_b', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'dc', startShapeId: 'or_c', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'dd', startShapeId: 'or_d2', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'de', startShapeId: 'or_e', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'df', startShapeId: 'or_f', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'dg', startShapeId: 'or_g', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 6 }
    ]
  },
  'Gate Level 4-Bit 7-Seg Driver': {
    fileName: '7-Seg Gate-Level Driver',
    shapes: [
      { id: 'title', type: 'Text', x: 50, y: 10, width: 800, height: 40, label: 'Gate Level 4-Bit 7-Segment Driver', name: 'title', color: '#fbbf24', font: '24px Orbitron' },
      { id: 'desc', type: 'Text', x: 50, y: 700, width: 900, height: 60, label: 'Standard BCD to 7-Segment mapping (0-9). Uses logic gates to implement the required Boolean expressions for each segment a-g.', name: 'desc', color: '#9ca3af', font: '14px Inter' },
      
      // Inputs: Switches for BCD bits (3 to 0)
      { id: 'sw_in', type: 'InputControl', x: 50, y: 150, width: 100, height: 160, label: '4-Bit BCD', inputs: [], outputs: [
        { x: 80, y: 20, label: 'S3 (8)', value: 0, name: 's3' },
        { x: 80, y: 55, label: 'S2 (4)', value: 0, name: 's2' },
        { x: 80, y: 90, label: 'S1 (2)', value: 0, name: 's1' },
        { x: 80, y: 125, label: 'S0 (1)', value: 0, name: 's0' }
      ], name: 'sw_in' },

      // Inverters Stage
      // Using indices: 0:!S3, 1:!S2, 2:!S1, 3:!S0
      ...Array.from({length: 4}, (_, i) => ({
        id: `not_${i}`, type: 'NOT' as ShapeType, x: 200, y: 150 + i * 50, width: 60, height: 35, label: `!S${3-i}`, name: `not_${i}`
      })),

      // AND Terms Stage (Product terms for the logic expressions)
      { id: 'and_aa', type: 'AND', x: 350, y: 100, width: 80, height: 40, label: 'S2 & S0', name: 'and_aa' },
      { id: 'and_ab', type: 'AND', x: 350, y: 150, width: 80, height: 40, label: '!S2 & !S0', name: 'and_ab' },
      
      { id: 'and_ba', type: 'AND', x: 350, y: 200, width: 80, height: 40, label: 'S1 & S0', name: 'and_ba' },
      { id: 'and_bb', type: 'AND', x: 350, y: 250, width: 80, height: 40, label: '!S1 & !S0', name: 'and_bb' },
      
      { id: 'and_da', type: 'AND', x: 350, y: 300, width: 80, height: 40, label: 'S1 & !S0', name: 'and_da' },
      { id: 'and_db', type: 'AND', x: 350, y: 350, width: 80, height: 40, label: '!S2 & S1', name: 'and_db' },
      { id: 'and_dc', type: 'AND3', x: 350, y: 400, width: 80, height: 50, label: 'S2 & !S1 & S0', name: 'and_dc' },
      
      { id: 'and_ea', type: 'AND', x: 350, y: 460, width: 80, height: 40, label: '!S2 & !S0', name: 'and_ea' }, // Note: reuse of !S2 & !S0 is possible but let's draw separate for clarity
      { id: 'and_eb', type: 'AND', x: 350, y: 510, width: 80, height: 40, label: 'S1 & !S0', name: 'and_eb' },
      
      { id: 'and_fa', type: 'AND', x: 350, y: 560, width: 80, height: 40, label: '!S1 & !S0', name: 'and_fa' },
      { id: 'and_fb', type: 'AND', x: 350, y: 610, width: 80, height: 40, label: 'S2 & !S1', name: 'and_fb' },
      { id: 'and_fc', type: 'AND', x: 350, y: 660, width: 80, height: 40, label: 'S2 & !S0', name: 'and_fc' },

      { id: 'and_ga', type: 'AND', x: 500, y: 600, width: 80, height: 40, label: 'S2 & !S1', name: 'and_ga' },
      { id: 'and_gb', type: 'AND', x: 500, y: 650, width: 80, height: 40, label: '!S2 & S1', name: 'and_gb' },

      // OR Gates Stage (Combining product terms for segments a-g)
      { id: 'or_a', type: 'OR4', x: 750, y: 100, width: 80, height: 60, label: 'Seg a', name: 'or_a', inputs: [
        { x: 0, y: 10, label: 'S3', value: 0 }, { x: 0, y: 25, label: 'S1', value: 0 }, { x: 0, y: 40, label: 'T1', value: 0 }, { x: 0, y: 55, label: 'T2', value: 0 }
      ]},
      { id: 'or_b', type: 'OR3', x: 750, y: 180, width: 80, height: 50, label: 'Seg b', name: 'or_b', inputs: [
        { x: 0, y: 10, label: '!S2', value: 0 }, { x: 0, y: 25, label: 'T3', value: 0 }, { x: 0, y: 40, label: 'T4', value: 0 }
      ]},
      { id: 'or_c', type: 'OR3', x: 750, y: 250, width: 80, height: 50, label: 'Seg c', name: 'or_c', inputs: [
        { x: 0, y: 10, label: 'S2', value: 0 }, { x: 0, y: 25, label: '!S1', value: 0 }, { x: 0, y: 40, label: 'S0', value: 0 }
      ]},
      { id: 'or_d', type: 'OR5', x: 750, y: 320, width: 80, height: 80, label: 'Seg d', name: 'or_d', inputs: [
        { x: 0, y: 10, label: 'S3', value: 0 }, { x: 0, y: 25, label: 'T5', value: 0 }, { x: 0, y: 40, label: 'T6', value: 0 }, { x: 0, y: 55, label: 'T2', value: 0 }, { x: 0, y: 70, label: 'T7', value: 0 }
      ]},
      { id: 'or_e', type: 'OR', x: 750, y: 450, width: 80, height: 40, label: 'Seg e', name: 'or_e' },
      { id: 'or_f', type: 'OR4', x: 750, y: 520, width: 80, height: 60, label: 'Seg f', name: 'or_f', inputs: [
        { x: 0, y: 10, label: 'S3', value: 0 }, { x: 0, y: 25, label: 'T4', value: 0 }, { x: 0, y: 40, label: 'T8', value: 0 }, { x: 0, y: 55, label: 'T10', value: 0 }
      ]},
      { id: 'or_g', type: 'OR4', x: 750, y: 600, width: 80, height: 60, label: 'Seg g', name: 'or_g', inputs: [
        { x: 0, y: 10, label: 'S3', value: 0 }, { x: 0, y: 25, label: 'T8', value: 0 }, { x: 0, y: 40, label: 'T9', value: 0 }, { x: 0, y: 55, label: 'T5', value: 0 }
      ]},

      // Final Display
      { id: 'disp', type: 'Display', x: 1000, y: 200, width: 100, height: 260, label: '7-Segment', inputs: [
        { x: 0, y: 15, label: 'A', value: 0, name: 'seg_a' },
        { x: 0, y: 40, label: 'B', value: 0, name: 'seg_b' },
        { x: 0, y: 65, label: 'C', value: 0, name: 'seg_c' },
        { x: 0, y: 90, label: 'D', value: 0, name: 'seg_d' },
        { x: 0, y: 115, label: 'E', value: 0, name: 'seg_e' },
        { x: 0, y: 140, label: 'F', value: 0, name: 'seg_f' },
        { x: 0, y: 165, label: 'G', value: 0, name: 'seg_g' }
      ], name: 'disp' }
    ] as Shape[],
    connectors: [
      // S0...S3 to NOTs
      { id: 'cn0', startShapeId: 'sw_in', endShapeId: 'not_3', startOutputIndex: 3, endInputIndex: 0 },
      { id: 'cn1', startShapeId: 'sw_in', endShapeId: 'not_2', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'cn2', startShapeId: 'sw_in', endShapeId: 'not_1', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cn3', startShapeId: 'sw_in', endShapeId: 'not_0', startOutputIndex: 0, endInputIndex: 0 },

      // AND AA: S2 & S0
      { id: 'caa1', startShapeId: 'sw_in', endShapeId: 'and_aa', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'caa2', startShapeId: 'sw_in', endShapeId: 'and_aa', startOutputIndex: 3, endInputIndex: 1 },
      // AND AB: !S2 & !S0
      { id: 'cab1', startShapeId: 'not_1', endShapeId: 'and_ab', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cab2', startShapeId: 'not_3', endShapeId: 'and_ab', startOutputIndex: 0, endInputIndex: 1 },

      // AND BA: S1 & S0
      { id: 'cba1', startShapeId: 'sw_in', endShapeId: 'and_ba', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'cba2', startShapeId: 'sw_in', endShapeId: 'and_ba', startOutputIndex: 3, endInputIndex: 1 },
      // AND BB: !S1 & !S0
      { id: 'cbb1', startShapeId: 'not_2', endShapeId: 'and_bb', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cbb2', startShapeId: 'not_3', endShapeId: 'and_bb', startOutputIndex: 0, endInputIndex: 1 },

      // AND DA: S1 & !S0
      { id: 'cda1', startShapeId: 'sw_in', endShapeId: 'and_da', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'cda2', startShapeId: 'not_3', endShapeId: 'and_da', startOutputIndex: 0, endInputIndex: 1 },
      // AND DB: !S2 & S1
      { id: 'cdb1', startShapeId: 'not_1', endShapeId: 'and_db', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cdb2', startShapeId: 'sw_in', endShapeId: 'and_db', startOutputIndex: 2, endInputIndex: 1 },
      // AND DC: S2 & !S1 & S0 (AND3)
      { id: 'cdc1', startShapeId: 'sw_in', endShapeId: 'and_dc', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cdc2', startShapeId: 'not_2', endShapeId: 'and_dc', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'cdc3', startShapeId: 'sw_in', endShapeId: 'and_dc', startOutputIndex: 3, endInputIndex: 2 },

      // AND EA: !S2 & !S0
      { id: 'cea1', startShapeId: 'not_1', endShapeId: 'and_ea', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cea2', startShapeId: 'not_3', endShapeId: 'and_ea', startOutputIndex: 0, endInputIndex: 1 },
      // AND EB: S1 & !S0
      { id: 'ceb1', startShapeId: 'sw_in', endShapeId: 'and_eb', startOutputIndex: 2, endInputIndex: 0 },
      { id: 'ceb2', startShapeId: 'not_3', endShapeId: 'and_eb', startOutputIndex: 0, endInputIndex: 1 },

      // AND FA: !S1 & !S0
      { id: 'cfa1', startShapeId: 'not_2', endShapeId: 'and_fa', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cfa2', startShapeId: 'not_3', endShapeId: 'and_fa', startOutputIndex: 0, endInputIndex: 1 },
      // AND FB: S2 & !S1
      { id: 'cfb1', startShapeId: 'sw_in', endShapeId: 'and_fb', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cfb2', startShapeId: 'not_2', endShapeId: 'and_fb', startOutputIndex: 0, endInputIndex: 1 },
      // AND FC: S2 & !S0
      { id: 'cfc1', startShapeId: 'sw_in', endShapeId: 'and_fc', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cfc2', startShapeId: 'not_3', endShapeId: 'and_fc', startOutputIndex: 0, endInputIndex: 1 },

      // AND GA: S2 & !S1
      { id: 'cga1', startShapeId: 'sw_in', endShapeId: 'and_ga', startOutputIndex: 1, endInputIndex: 0 },
      { id: 'cga2', startShapeId: 'not_2', endShapeId: 'and_ga', startOutputIndex: 0, endInputIndex: 1 },
      // AND GB: !S2 & S1
      { id: 'cgb1', startShapeId: 'not_1', endShapeId: 'and_gb', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'cgb2', startShapeId: 'sw_in', endShapeId: 'and_gb', startOutputIndex: 2, endInputIndex: 1 },

      // Segment A Logic
      { id: 'ca1', startShapeId: 'sw_in', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 0 }, // S3
      { id: 'ca2', startShapeId: 'sw_in', endShapeId: 'or_a', startOutputIndex: 2, endInputIndex: 1 }, // S1
      { id: 'ca3', startShapeId: 'and_aa', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 2 }, // T1: S2&S0
      { id: 'ca4', startShapeId: 'and_ab', endShapeId: 'or_a', startOutputIndex: 0, endInputIndex: 3 }, // T2: !S2&!S0

      // Segment B Logic
      { id: 'cb1', startShapeId: 'not_1', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 0 }, // !S2
      { id: 'cb2', startShapeId: 'and_ba', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 1 }, // T3: S1&S0
      { id: 'cb3', startShapeId: 'and_bb', endShapeId: 'or_b', startOutputIndex: 0, endInputIndex: 2 }, // T4: !S1&!S0

      // Segment C Logic
      { id: 'cc1', startShapeId: 'sw_in', endShapeId: 'or_c', startOutputIndex: 1, endInputIndex: 0 }, // S2
      { id: 'cc2', startShapeId: 'not_2', endShapeId: 'or_c', startOutputIndex: 0, endInputIndex: 1 }, // !S1
      { id: 'cc3', startShapeId: 'sw_in', endShapeId: 'or_c', startOutputIndex: 3, endInputIndex: 2 }, // S0

      // Segment D Logic
      { id: 'cd1', startShapeId: 'sw_in', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 0 }, // S3
      { id: 'cd2', startShapeId: 'and_da', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 1 }, // T5: S1&!S0
      { id: 'cd3', startShapeId: 'and_db', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 2 }, // T6: !S2&S1
      { id: 'cd4', startShapeId: 'and_ab', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 3 }, // T2: !S2&!S0
      { id: 'cd5', startShapeId: 'and_dc', endShapeId: 'or_d', startOutputIndex: 0, endInputIndex: 4 }, // T7: S2&!S1&S0

      // Segment E Logic
      { id: 'ce1', startShapeId: 'and_ea', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'ce2', startShapeId: 'and_eb', endShapeId: 'or_e', startOutputIndex: 0, endInputIndex: 1 },

      // Segment F Logic
      { id: 'cf1', startShapeId: 'sw_in', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 0 }, // S3
      { id: 'cf2', startShapeId: 'and_fa', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 1 }, // T4: !S1&!S0
      { id: 'cf3', startShapeId: 'and_fb', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 2 }, // T8: S2&!S1
      { id: 'cf4', startShapeId: 'and_fc', endShapeId: 'or_f', startOutputIndex: 0, endInputIndex: 3 }, // T10: S2&!S0

      // Segment G Logic
      { id: 'cg1', startShapeId: 'sw_in', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 0 }, // S3
      { id: 'cg2', startShapeId: 'and_ga', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 1 }, // T8: S2&!S1
      { id: 'cg3', startShapeId: 'and_gb', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 2 }, // T9: !S2&S1
      { id: 'cg4', startShapeId: 'and_da', endShapeId: 'or_g', startOutputIndex: 0, endInputIndex: 3 }, // T5: S1&!S0

      // Final Segment connections to Display
      { id: 'sa', startShapeId: 'or_a', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 0 },
      { id: 'sb', startShapeId: 'or_b', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 1 },
      { id: 'sc', startShapeId: 'or_c', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 2 },
      { id: 'sd', startShapeId: 'or_d', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 3 },
      { id: 'se', startShapeId: 'or_e', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 4 },
      { id: 'sf', startShapeId: 'or_f', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 5 },
      { id: 'sg', startShapeId: 'or_g', endShapeId: 'disp', startOutputIndex: 0, endInputIndex: 6 }
    ]
  }
};

export const CIRCUIT_CODES = [
  'TD-7000 Radio Receiver',
  'PWM LED Dimmer',
  'Summing Amplifier',
  'Bridge Rectifier Demo',
  'Darlington Motor Driver',
  'LDR Light Switch',
  'PWM Motor Speed Control',
  'Summing Control Block',
  'Multiplication Block',
  'Zener Voltage Regulator',
  'VCO: Voltage Controlled Oscillator',
  'Transistor Switch (NPN)',
  'Relay Control Circuit',
  'Voltage Regulator Circuit',
  'Potentiometer Control',
  'NPN Transistor LED Driver',
  'PNP Transistor Switch',
  'Relay Self-Latching',
  'DC Motor with Flyback Diode',
  'Voltage Divider with Potentiometer',
  'Transistor AND Gate (Discrete)',
  'Transistor OR Gate (Discrete)',
  'Battery Charger Indicator',
  'Emergency Light Circuit',
  'Oscilloscope: Sine & Square',
  'Comparator Monitoring',
  '4-Bit Adder Monitor',
  'MOSFET Switch Circuit',
  '4-Bit Sum Block',
  'Control Blocks Demo',
  '555 Timer Astable',
  '555 & 7490 Counter (0-9)',
  '555 & Dual 7490 (0-99)',
  '555 & 74193 Hex Counter',
  '555 Digital Clock (MM:SS)',
  '555 & 74192 Countdown',
  '74160 Decade Counter Demo',
  '74160 & 7448: Decade Counter with Mux Monitoring',
  '7493 & 7447: Binary Counter with Dual Mux Selection',
  'Flip-Flop Lab: Edge Triggering',
  'Flip-Flop: 4-Bit Binary Counter',
  'Latch Lab: Level Sensitivity',
  'Latch: Active-Low SR Memory',
  'Advanced Display Lab',
  '4-bit TTL Counter',
  'PCB Layout Example',
  'Convertidor de 4-Bits a 7-Seg (Bloque)',
  'Convertidor de 4-Bits a 8-Seg (Bloque)',
  'Flowchart Demo'
];

export const CIRCUIT_EXAMPLES = [
  'Dice Simulator (Bloque)',
  'Gate Level ALU 74181',
  'Substractor de 2 Números (Bloque)',
  '7-Seg to 4-Bit Decoder (Bloque)',
  'Convertidor de 4-Bits a 7-Seg (Bloque)',
  'Convertidor de 4-Bits a 8-Seg (Bloque)',
  'Gate Level 4-Bit 7-Seg Driver',
  'Gate Level 4-Bit to 7-Seg Driver',
  'Elevador 4 Niveles (Bloque)',
  'Tic-Tac-Toe Game (Bloque)',
  '74181: 4-Bit Adder/Subtractor',
  '74181: Logical unit (AND/OR/XOR)',
  '74181: Magnitude Comparator (A=B)',
  'Traffic Light Controller (Modular)',
  'Sumador 4-Bits Anidado',
  'Contador Modulo-16 (Bloques JK)',
  'Registrador PISO 4-Bits',
  'Comparador de 4-Bits Modular',
  'TD-7000 Radio Receiver',
  'Basic AND Gate',
  '74138 Decoder Demo',
  '74151 8-to-1 Mux',
  '4017 LED Chaser',
  'JK Flip-Flop Counter',
  'D Flip-Flop Shift Register',
  'MCU Binary Counter',
  '4-Digit Multiplexed Counter',
  'Buzzer & Motor Alarm',
  '74161 Binary Counter Demo',
  '74153 Dual 4-to-1 Mux',
  '4001 CMOS NOR Demo',
  '4011 CMOS NAND Demo',
  'Advanced Traffic Light',
  'Digital Clock System',
  '4066 Quad Bilateral Switch',
  'MCU Serial to Parallel',
  'MCU Temperature Monitor',
  '74LS Series Counter',
  '74LS Digital Clock',
  '555 Astable: LED Blinker',
  '555 Astable: Fast Pulse + Scope',
  '555 Astable: 8-Bit Shift Register',
  '555 SR Latch: Start/Stop Control',
  'Gate-Level SR Flip-Flop',
  'Gate-Level D Latch',
  'Gate-Level D Flip-Flop',
  'Gate-Level JK Flip-Flop',
  'Gate-Level T Flip-Flop',
  'Hexadecimal Up-Counter',
  'Decade Counter (0-9)',
  'Priority Encoder Lab',
  'Shift Register Monitor',
  'Logic Lab: AND Family',
  'Logic Lab: OR Family',
  'Logic Lab: Universal Gates',
  'Logic Lab: Exclusive Gates',
  'Logic Lab: Inverters & Buffers',
  '7408: Basic AND Logic',
  '7408: 3-Input AND Gate',
  '7408: Quad AND Tester',
  '7400: Basic NAND Logic',
  '7400: NAND as Inverter',
  '7400: SR Latch (NAND)',
  '7432: Basic OR Logic',
  '7432: 3-Input OR Gate',
  '7432: Quad OR Tester',
  '7402: Basic NOR Logic',
  '7402: NOR SR Latch',
  '7402: NOR as Inverter',
  '7486: Basic XOR Logic',
  '7486: Controlled Inverter',
  '7486: Parity Bit Generator',
  '7404: Basic NOT Logic',
  '7404: Hex NOT Tester',
  '7404: Cascaded NOT (Buffer)',
  'Reloj Digital 74Ls93',
  'Digital Clock',
  '74LS47: BCD to 7-Segment Decoder',
  '74LS93 & 74LS47: Decade Counter (0-9)',
  'BCD to 7-Segment Decoder (Schematic)',
  'Countdown (9-0)',
  'Binary Counter (0-15)',
  'Decade Counter (0-99)',
  'Decade Counter (0-99) Alt',
  '74161: Basic 4-Bit Counter',
  '74161: Modulo-10 Counter',
  '74138: 3-to-8 Decoder Demo',
  '74138: 2-to-4 Decoder',
  '74153: Dual 4-to-1 Mux Demo',
  '74153: XOR Implementation',
  '74HC595: 8-Bit Serial-to-Parallel',
  '74HC595: Running Light',
  'Control Blocks Demo',
  '555 Timer Astable',
  'Pocket Pager Circuit',
  '74160 & 7448: Decade Counter with Mux Monitoring',
  '7493 & 7447: Binary Counter with Dual Mux Selection',
  'Flip-Flop Lab: Edge Triggering',
  'Flip-Flop: 4-Bit Binary Counter',
  'Latch Lab: Level Sensitivity',
  'Latch: Active-Low SR Memory',
  'Advanced Display Lab',
  '8-Seg Counter (7490+7447)',
  '8-Seg Shift Register',
  '8-Seg MCU Driver',
  '9-Seg MCU Alphanumeric',
  '9-Seg Shift Register',
  '9-Seg Logic Pattern',
  '14-Seg MCU Message',
  '14-Seg Dual Shift Register',
  '14-Seg Logic Decoder',
  'Dot Matrix 4017 Scanner',
  'Dot Matrix MCU Pattern',
  'Dot Matrix Shift Drive',
  '16-Seg MCU Alphanumeric',
  '16-Seg Dual Shift Register',
  '16-Seg Logic Pattern',
  'LGT8F328P: Fast PWM Demo',
  'LGT8F328P: Internal DAC Output',
  'ATmega16: 8-Bit Port Counter',
  'ATmega16: External Interrupt Lab',
  'ATtiny85: Compact Blink',
  'ATtiny85: PWM Dimmer',
  'PIC18F2520: ADC Reading',
  'PIC18F2520: SPI Communication',
  'ESP32: Dual Core Tasking',
  'ESP32: Wi-Fi Status Monitor',
  'RP2040: Dual Core Blink',
  'RP2040: PIO State Machine Demo',
  '16-Seg Numbers',
  '16-Seg A-D',
  '16-Seg E-H',
  '16-Seg I-L',
  '16-Seg M-P',
  '16-Seg Q-T',
  '16-Seg U-X',
  '16-Seg Y-Z',
  '16-Seg Symbols'
];

export const LIBRARY_BLOCKS: Shape[] = [
  {
    id: "lqabbslag",
    type: "CustomBlock",
    x: 100,
    y: 82,
    width: 120,
    height: 115,
    label: "Full Adder",
    inputs: [
      { x: 0, y: 20, label: "A Out", value: 0, name: "in_0" },
      { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" },
      { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }
    ],
    outputs: [
      { x: 120, y: 20, label: "S In", value: 0, name: "out_0" },
      { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }
    ],
    name: "Shape_91k0n",
    color: "#8b5cf6",
    font: "14px Orbitron",
    subcircuit: {
      shapes: [
        {
          id: "hge88cddc",
          type: "XOR",
          x: 284.61904761904765,
          y: 90.3809523809524,
          width: 100,
          height: 50,
          label: "XOR",
          inputs: [
            { x: 0, y: 10, label: "A", value: 0, name: "in_a" },
            { x: 0, y: 40, label: "B", value: 0, name: "in_b" }
          ],
          outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }],
          name: "Shape_giiiv",
          color: "gray",
          font: "14px Orbitron",
          prevInputs: [0, 0]
        },
        {
          id: "lqabcrrrm",
          type: "XOR",
          x: 484.61904761904765,
          y: 120.3809523809524,
          width: 100,
          height: 50,
          label: "XOR",
          inputs: [
            { x: 0, y: 10, label: "A", value: 0, name: "in_a" },
            { x: 0, y: 40, label: "B", value: 0, name: "in_b" }
          ],
          outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }],
          name: "Shape_xvjjd",
          color: "gray",
          font: "14px Orbitron",
          prevInputs: [0, 0]
        },
        {
          id: "lqabdsmmm",
          type: "AND",
          x: 484.61904761904765,
          y: 190.3809523809524,
          width: 100,
          height: 50,
          label: "AND",
          inputs: [
            { x: 0, y: 15, label: "A", value: 0, name: "in_a" },
            { x: 0, y: 35, label: "B", value: 0, name: "in_b" }
          ],
          outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }],
          name: "Shape_kkiio",
          color: "gray",
          font: "14px Orbitron",
          prevInputs: [0, 0]
        },
        {
          id: "lqabesnnn",
          type: "AND",
          x: 284.61904761904765,
          y: 240.3809523809524,
          width: 100,
          height: 50,
          label: "AND",
          inputs: [
            { x: 0, y: 15, label: "A", value: 0, name: "in_a" },
            { x: 0, y: 35, label: "B", value: 0, name: "in_b" }
          ],
          outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }],
          name: "Shape_llpqq",
          color: "gray",
          font: "14px Orbitron",
          prevInputs: [0, 0]
        },
        {
          id: "lqabfsooo",
          type: "OR",
          x: 684.61904761904765,
          y: 215.3809523809524,
          width: 100,
          height: 50,
          label: "OR",
          inputs: [
            { x: 0, y: 15, label: "A", value: 0, name: "in_a" },
            { x: 0, y: 35, label: "B", value: 0, name: "in_b" }
          ],
          outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }],
          name: "Shape_rrssst",
          color: "gray",
          font: "14px Orbitron",
          prevInputs: [0, 0]
        }
      ],
      connectors: [
        { id: "lqabgsqqq", startShapeId: "hge88cddc", endShapeId: "lqabcrrrm", startOutputIndex: 0, endInputIndex: 0 },
        { id: "lqabhsrrr", startShapeId: "hge88cddc", endShapeId: "lqabdsmmm", startOutputIndex: 0, endInputIndex: 0 },
        { id: "lqabissss", startShapeId: "lqabfsooo", endShapeId: "lqabcrrrm", startOutputIndex: 0, endInputIndex: 1 },
        { id: "lqabjsttt", startShapeId: "lqabfsooo", endShapeId: "lqabdsmmm", startOutputIndex: 0, endInputIndex: 1 },
        { id: "lqabksuuu", startShapeId: "lqabfsooo", endShapeId: "lqabesnnn", startOutputIndex: 0, endInputIndex: 1 }
      ]
    }
  },
  {
    id: "7k2wty4np",
    type: "CustomBlock",
    x: 277,
    y: 181,
    width: 140,
    height: 265,
    label: "4-Bit Adder ",
    inputs: [
      { x: 0, y: 20, label: "A3 Out", value: 0, name: "in_0" },
      { x: 0, y: 45, label: "A2 Out", value: 0, name: "in_1" },
      { x: 0, y: 70, label: "A1 Out", value: 0, name: "in_2" },
      { x: 0, y: 95, label: "A0 Out", value: 0, name: "in_3" },
      { x: 0, y: 120, label: "B3 Out", value: 0, name: "in_4" },
      { x: 0, y: 145, label: "B2 Out", value: 0, name: "in_5" },
      { x: 0, y: 170, label: "B1 Out", value: 0, name: "in_6" },
      { x: 0, y: 195, label: "B0 Out", value: 0, name: "in_7" },
      { x: 0, y: 220, label: "CIn Out", value: 0, name: "in_8" }
    ],
    outputs: [
      { x: 140, y: 20, label: "OutPutL In", value: 0, name: "out_0" },
      { x: 140, y: 45, label: "OutPutL In", value: 0, name: "out_1" },
      { x: 140, y: 70, label: "OutPutL In", value: 0, name: "out_2" },
      { x: 140, y: 95, label: "OutPutL In", value: 0, name: "out_3" },
      { x: 140, y: 120, label: "OutPutL In", value: 0, name: "out_4" }
    ],
    name: "Shape_csbgt",
    color: "#8b5cf6",
    font: "14px Orbitron",
    subcircuit: {
      shapes: [
        {
          id: "ql03guwyq",
          type: "CustomBlock",
          x: 192,
          y: 208,
          width: 120,
          height: 115,
          label: "Full Adder",
          inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }],
          outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }],
          name: "Shape_91k0n",
          color: "#8b5cf6",
          font: "14px Orbitron",
          subcircuit: {
            shapes: [
              { id: "hge88cddc", type: "XOR", x: 284.6, y: 90.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray", font: "14px Orbitron" },
              { id: "kls62jc20", type: "XOR", x: 387.6, y: 94.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray", font: "14px Orbitron" },
              { id: "bydvut9p5", type: "AND", x: 284.6, y: 189.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray", font: "14px Orbitron" },
              { id: "6y2fe8hmp", type: "AND", x: 387.6, y: 197.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray", font: "14px Orbitron" },
              { id: "8n2yoysqy", type: "OR", x: 485.6, y: 203.3, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray", font: "14px Orbitron" },
              { id: "hudfyn3hd", type: "InputL", x: 139.6, y: 38.3, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444", font: "14px Orbitron" },
              { id: "tt62vtsgj", type: "InputL", x: 139.6, y: 140.3, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444", font: "14px Orbitron" },
              { id: "fftgderw1", type: "InputL", x: 139.6, y: 230.3, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444", font: "14px Orbitron" },
              { id: "rut969tm5", type: "OutPutL", x: 596.6, y: 90.3, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6", font: "14px Orbitron" },
              { id: "69txkidh0", type: "OutPutL", x: 596.6, y: 212.3, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6", font: "14px Orbitron" },
              { id: "ud49znr5i", type: "Text", x: 420, y: 18, width: 200, height: 40, label: "Full Adder", inputs: [], outputs: [], name: "Shape_pv463", color: "gray", font: "16px Orbitron" }
            ],
            connectors: [
              { id: "c1", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c2", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c3", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
              { id: "c4", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
              { id: "c5", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c6", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
              { id: "c7", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c8", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
              { id: "c9", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
              { id: "c10", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c11", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
              { id: "c12", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
            ],
            inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
            outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
          }
        },
        { id: "cv7b0h55k", type: "CustomBlock", x: 499, y: 67, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
        { id: "cuszxxxpt", type: "CustomBlock", x: 389, y: 109, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
        { id: "jhy8ox2wi", type: "CustomBlock", x: 289, y: 156, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
        { id: "3er9m5he2", type: "OutPutL", x: 673, y: 50, width: 100, height: 50, label: "OutPutL", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_kwa7n", color: "#3b82f6", font: "14px Orbitron" },
        { id: "y19mb0s03", type: "OutPutL", x: 673, y: 80, width: 100, height: 50, label: "OutPutL", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_3ugdf", color: "#3b82f6", font: "14px Orbitron" },
        { id: "fzroi5awc", type: "OutPutL", x: 673, y: 110, width: 100, height: 50, label: "OutPutL", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_asfxz", color: "#3b82f6", font: "14px Orbitron" },
        { id: "quicna2uk", type: "OutPutL", x: 673, y: 140, width: 100, height: 50, label: "OutPutL", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_xlumk", color: "#3b82f6", font: "14px Orbitron" },
        { id: "t1ds6utu4", type: "OutPutL", x: 673, y: 170, width: 100, height: 50, label: "OutPutL", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_bd6uk", color: "#3b82f6", font: "14px Orbitron" },
        { id: "etszoo8n8", type: "InputL", x: 38, y: 17, width: 100, height: 50, label: "A3", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_uspuk", color: "#ef4444", font: "14px Orbitron" },
        { id: "5ipter2v7", type: "InputL", x: 38, y: 47, width: 100, height: 50, label: "A2", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_tx3vj", color: "#ef4444", font: "14px Orbitron" },
        { id: "4dh9a3rss", type: "InputL", x: 38, y: 77, width: 100, height: 50, label: "A1", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_mqbmc", color: "#ef4444", font: "14px Orbitron" },
        { id: "ckev6ndj0", type: "InputL", x: 38, y: 107, width: 100, height: 50, label: "A0", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_evibi", color: "#ef4444", font: "14px Orbitron" },
        { id: "a7gbzibdp", type: "InputL", x: 38, y: 137, width: 100, height: 50, label: "B3", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_dxy2l", color: "#ef4444", font: "14px Orbitron" },
        { id: "0egn7ix89", type: "InputL", x: 38, y: 167, width: 100, height: 50, label: "B2", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_bc1ui", color: "#ef4444", font: "14px Orbitron" },
        { id: "6prkrpqg3", type: "InputL", x: 38, y: 197, width: 100, height: 50, label: "B1", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_4r47k", color: "#ef4444", font: "14px Orbitron" },
        { id: "by1xagytx", type: "InputL", x: 38, y: 227, width: 100, height: 50, label: "B0", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_0y8ln", color: "#ef4444", font: "14px Orbitron" },
        { id: "l2s4yczak", type: "InputL", x: 38, y: 257, width: 100, height: 50, label: "CIn", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_k9iuk", color: "#ef4444", font: "14px Orbitron" },
        { id: "by6micisw", type: "Text", x: 374, y: 22, width: 200, height: 40, label: "4-Bit Adder", inputs: [], outputs: [], name: "Shape_w4mtn", color: "gray", font: "16px Orbitron" },
        { id: "effd1y50a", type: "Text", x: 367, y: 282, width: 200, height: 40, label: "5 Outs", inputs: [], outputs: [], name: "Shape_inhkm", color: "gray", font: "16px Orbitron" }
      ],
      connectors: [
        { id: "uhheb2yor", startShapeId: "cv7b0h55k", endShapeId: "y19mb0s03", startOutputIndex: 0, endInputIndex: 0 },
        { id: "kewmvamjl", startShapeId: "cuszxxxpt", endShapeId: "fzroi5awc", startOutputIndex: 0, endInputIndex: 0 },
        { id: "t82mfcp0q", startShapeId: "jhy8ox2wi", endShapeId: "quicna2uk", startOutputIndex: 0, endInputIndex: 0 },
        { id: "8h9lf28gt", startShapeId: "ql03guwyq", endShapeId: "t1ds6utu4", startOutputIndex: 0, endInputIndex: 0 },
        { id: "i2jl0huav", startShapeId: "l2s4yczak", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 2 },
        { id: "j2ep0veu3", startShapeId: "ql03guwyq", endShapeId: "jhy8ox2wi", startOutputIndex: 1, endInputIndex: 2 },
        { id: "icw17iv70", startShapeId: "jhy8ox2wi", endShapeId: "cuszxxxpt", startOutputIndex: 1, endInputIndex: 2 },
        { id: "aw906ma7p", startShapeId: "cuszxxxpt", endShapeId: "cv7b0h55k", startOutputIndex: 1, endInputIndex: 2 },
        { id: "jdsij57ao", startShapeId: "by1xagytx", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 1 },
        { id: "nu7qszb4q", startShapeId: "6prkrpqg3", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 1 },
        { id: "htnr9v3su", startShapeId: "0egn7ix89", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 1 },
        { id: "bii06mon9", startShapeId: "a7gbzibdp", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 1 },
        { id: "beg0l6y4n", startShapeId: "ckev6ndj0", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 0 },
        { id: "vz6gflryw", startShapeId: "4dh9a3rss", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 0 },
        { id: "6lndaqe0r", startShapeId: "5ipter2v7", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 0 },
        { id: "zvlcucke1", startShapeId: "etszoo8n8", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 0 },
        { id: "aqzauciwc", startShapeId: "cv7b0h55k", endShapeId: "3er9m5he2", startOutputIndex: 1, endInputIndex: 0 }
      ],
      inputMapping: [
        { internalShapeId: "etszoo8n8", type: "output", index: 0 },
        { internalShapeId: "5ipter2v7", type: "output", index: 0 },
        { internalShapeId: "4dh9a3rss", type: "output", index: 0 },
        { internalShapeId: "ckev6ndj0", type: "output", index: 0 },
        { internalShapeId: "a7gbzibdp", type: "output", index: 0 },
        { internalShapeId: "0egn7ix89", type: "output", index: 0 },
        { internalShapeId: "6prkrpqg3", type: "output", index: 0 },
        { internalShapeId: "by1xagytx", type: "output", index: 0 },
        { internalShapeId: "l2s4yczak", type: "output", index: 0 }
      ],
      outputMapping: [
        { internalShapeId: "3er9m5he2", type: "input", index: 0 },
        { internalShapeId: "y19mb0s03", type: "input", index: 0 },
        { internalShapeId: "fzroi5awc", type: "input", index: 0 },
        { internalShapeId: "quicna2uk", type: "input", index: 0 },
        { internalShapeId: "t1ds6utu4", type: "input", index: 0 }
      ]
    },
    prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "6cg4k0tzl",
    type: "CustomBlock",
    x: 457.7,
    y: 259.2,
    width: 124,
    height: 465,
    label: "8-Bit Adder",
    inputs: [
      { x: 0, y: 20, label: "B7 Out", value: 0, name: "in_0" },
      { x: 0, y: 45, label: "B6 Out", value: 0, name: "in_1" },
      { x: 0, y: 70, label: "B5 Out", value: 0, name: "in_2" },
      { x: 0, y: 95, label: "B4 Out", value: 0, name: "in_3" },
      { x: 0, y: 120, label: "B3 Out", value: 0, name: "in_4" },
      { x: 0, y: 145, label: "B2 Out", value: 0, name: "in_5" },
      { x: 0, y: 170, label: "B1 Out", value: 0, name: "in_6" },
      { x: 0, y: 195, label: "B0 Out", value: 0, name: "in_7" },
      { x: 0, y: 220, label: "A7 Out", value: 0, name: "in_8" },
      { x: 0, y: 245, label: "A6 Out", value: 0, name: "in_9" },
      { x: 0, y: 270, label: "A5 Out", value: 0, name: "in_10" },
      { x: 0, y: 295, label: "A4 Out", value: 0, name: "in_11" },
      { x: 0, y: 320, label: "A3 Out", value: 0, name: "in_12" },
      { x: 0, y: 345, label: "A2 Out", value: 0, name: "in_13" },
      { x: 0, y: 370, label: "A1 Out", value: 0, name: "in_14" },
      { x: 0, y: 395, label: "A0 Out", value: 0, name: "in_15" },
      { x: 0, y: 420, label: "C In Out", value: 0, name: "in_16" }
    ],
    outputs: [
      { x: 124, y: 20, label: "C Out In", value: 0, name: "out_0" },
      { x: 124, y: 45, label: "D7 In", value: 0, name: "out_1" },
      { x: 124, y: 70, label: "D6 In", value: 0, name: "out_2" },
      { x: 124, y: 95, label: "D5 In", value: 0, name: "out_3" },
      { x: 124, y: 120, label: "D4 In", value: 0, name: "out_4" },
      { x: 124, y: 145, label: "D3 In", value: 0, name: "out_5" },
      { x: 124, y: 170, label: "D2 In", value: 0, name: "out_6" },
      { x: 124, y: 195, label: "D1 In", value: 0, name: "out_7" },
      { x: 124, y: 220, label: "D0 In", value: 0, name: "out_8" }
    ],
    name: "Shape_a9y8k",
    color: "#8b5cf6",
    font: "14px Orbitron",
    subcircuit: {
      shapes: [
        { id: "hbaz9d55v", type: "InputL", x: 63, y: 11, width: 100, height: 50, label: "B7", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_xrfrs", color: "#ef4444", font: "14px Orbitron" },
        { id: "6ziu7ltha", type: "InputL", x: 63, y: 41, width: 100, height: 50, label: "B6", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_li86c", color: "#ef4444", font: "14px Orbitron" },
        { id: "eab4z96em", type: "InputL", x: 63, y: 71, width: 100, height: 50, label: "B5", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_b87gv", color: "#ef4444", font: "14px Orbitron" },
        { id: "0vpb9p9a4", type: "InputL", x: 63, y: 101, width: 100, height: 50, label: "B4", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_bqj7f", color: "#ef4444", font: "14px Orbitron" },
        { id: "cmgnik2p4", type: "InputL", x: 63, y: 131, width: 100, height: 50, label: "B3", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_7j572", color: "#ef4444", font: "14px Orbitron" },
        { id: "vt5e39ioo", type: "InputL", x: 63, y: 161, width: 100, height: 50, label: "B2", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_otexq", color: "#ef4444", font: "14px Orbitron" },
        { id: "9cq3onja8", type: "InputL", x: 63, y: 191, width: 100, height: 50, label: "B1", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_9xc0s", color: "#ef4444", font: "14px Orbitron" },
        { id: "r22ikeh5q", type: "InputL", x: 63, y: 221, width: 100, height: 50, label: "B0", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_9gcmn", color: "#ef4444", font: "14px Orbitron" },
        { id: "7k4dtri7r", type: "InputL", x: 76, y: 298, width: 100, height: 50, label: "A7", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_xrfrs", color: "#ef4444", font: "14px Orbitron" },
        { id: "pku0246k2", type: "InputL", x: 76, y: 328, width: 100, height: 50, label: "A6", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_li86c", color: "#ef4444", font: "14px Orbitron" },
        { id: "v13dnqi3y", type: "InputL", x: 76, y: 358, width: 100, height: 50, label: "A5", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_b87gv", color: "#ef4444", font: "14px Orbitron" },
        { id: "7tlbzy21h", type: "InputL", x: 76, y: 388, width: 100, height: 50, label: "A4", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_bqj7f", color: "#ef4444", font: "14px Orbitron" },
        { id: "pihu8es8u", type: "InputL", x: 76, y: 418, width: 100, height: 50, label: "A3", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_7j572", color: "#ef4444", font: "14px Orbitron" },
        { id: "lo3siutzb", type: "InputL", x: 76, y: 448, width: 100, height: 50, label: "A2", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_otexq", color: "#ef4444", font: "14px Orbitron" },
        { id: "o0q9g4f8i", type: "InputL", x: 76, y: 478, width: 100, height: 50, label: "A1", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_9xc0s", color: "#ef4444", font: "14px Orbitron" },
        { id: "psdz2pixf", type: "InputL", x: 76, y: 508, width: 100, height: 50, label: "A0", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_9gcmn", color: "#ef4444", font: "14px Orbitron" },
        { id: "9ahkwsx6l", type: "OutPutL", x: 500, y: 28, width: 100, height: 50, label: "C Out", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_79opk", color: "#3b82f6", font: "14px Orbitron" },
        { id: "gl8qwruzz", type: "OutPutL", x: 501, y: 85, width: 100, height: 50, label: "D7", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_zjpa4", color: "#3b82f6", font: "14px Orbitron" },
        { id: "npy4ernj2", type: "OutPutL", x: 501, y: 115, width: 100, height: 50, label: "D6", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_4zktx", color: "#3b82f6", font: "14px Orbitron" },
        { id: "insx4njxp", type: "OutPutL", x: 501, y: 145, width: 100, height: 50, label: "D5", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_8zcz3", color: "#3b82f6", font: "14px Orbitron" },
        { id: "osqlg7js5", type: "OutPutL", x: 501, y: 175, width: 100, height: 50, label: "D4", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_rtbki", color: "#3b82f6", font: "14px Orbitron" },
        { id: "xo0lr8fhm", type: "OutPutL", x: 501, y: 205, width: 100, height: 50, label: "D3", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_ibmoc", color: "#3b82f6", font: "14px Orbitron" },
        { id: "92iwk1cva", type: "OutPutL", x: 501, y: 235, width: 100, height: 50, label: "D2", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_ega42", color: "#3b82f6", font: "14px Orbitron" },
        { id: "k900bzj85", type: "OutPutL", x: 501, y: 265, width: 100, height: 50, label: "D1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_aqcps", color: "#3b82f6", font: "14px Orbitron" },
        { id: "q48zzo0zg", type: "OutPutL", x: 501, y: 295, width: 100, height: 50, label: "D0", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_kkx2v", color: "#3b82f6", font: "14px Orbitron" },
        { id: "kuxpwv7cu", type: "InputL", x: 72, y: 576, width: 100, height: 50, label: "C In", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_0jc02", color: "#ef4444", font: "14px Orbitron" },
        { id: "31ox9329z", type: "Text", x: 279, y: 22, width: 200, height: 40, label: "8-Bit Adder", inputs: [], outputs: [], name: "Shape_5i60m", color: "gray", font: "16px Orbitron", fontSize: 16 },
        { id: "r3hjooeyx", type: "CustomBlock", x: 315, y: 52, width: 140, height: 265, label: "4-Bit Full Adder", inputs: [{ x: 0, y: 20, label: "A3 Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "A2 Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "A1 Out", value: 0, name: "in_2" }, { x: 0, y: 95, label: "A0 Out", value: 0, name: "in_3" }, { x: 0, y: 120, label: "B3 Out", value: 0, name: "in_4" }, { x: 0, y: 145, label: "B2 Out", value: 0, name: "in_5" }, { x: 0, y: 170, label: "B1 Out", value: 0, name: "in_6" }, { x: 0, y: 195, label: "B0 Out", value: 0, name: "in_7" }, { x: 0, y: 220, label: "CIn Out", value: 0, name: "in_8" }], outputs: [{ x: 140, y: 20, label: "OutPutL In", value: 0, name: "out_0" }, { x: 140, y: 45, label: "OutPutL In", value: 0, name: "out_1" }, { x: 140, y: 70, label: "OutPutL In", value: 0, name: "out_2" }, { x: 140, y: 95, label: "OutPutL In", value: 0, name: "out_3" }, { x: 140, y: 120, label: "OutPutL In", value: 0, name: "out_4" }], name: "Shape_6u76x", color: "#8b5cf6", font: "14px Orbitron", subcircuit: {
          shapes: [
            { id: "ql03guwyq", type: "CustomBlock", x: 192, y: 208, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: {
              shapes: [
                { id: "hge88cddc", type: "XOR", x: 284.6, y: 90.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray", font: "14px Orbitron" },
                { id: "kls62jc20", type: "XOR", x: 387.6, y: 94.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray", font: "14px Orbitron" },
                { id: "bydvut9p5", type: "AND", x: 284.6, y: 189.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray", font: "14px Orbitron" },
                { id: "6y2fe8hmp", type: "AND", x: 387.6, y: 197.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray", font: "14px Orbitron" },
                { id: "8n2yoysqy", type: "OR", x: 485.6, y: 203.3, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray", font: "14px Orbitron" },
                { id: "hudfyn3hd", type: "InputL", x: 139.6, y: 38.3, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444", font: "14px Orbitron" },
                { id: "tt62vtsgj", type: "InputL", x: 139.6, y: 140.3, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444", font: "14px Orbitron" },
                { id: "fftgderw1", type: "InputL", x: 139.6, y: 230.3, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444", font: "14px Orbitron" },
                { id: "rut969tm5", type: "OutPutL", x: 596.6, y: 90.3, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6", font: "14px Orbitron" },
                { id: "69txkidh0", type: "OutPutL", x: 596.6, y: 212.3, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6", font: "14px Orbitron" },
                { id: "ud49znr5i", type: "Text", x: 420, y: 18, width: 200, height: 40, label: "Full Adder", inputs: [], outputs: [], name: "Shape_pv463", color: "gray", font: "16px Orbitron", fontSize: 16 }
              ],
              connectors: [
                { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
              ],
              inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
              outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
            } },
            { id: "cv7b0h55k", type: "CustomBlock", x: 499, y: 67, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
            { id: "cuszxxxpt", type: "CustomBlock", x: 389, y: 109, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
            { id: "jhy8ox2wi", type: "CustomBlock", x: 289, y: 156, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } }
          ],
          connectors: [
            { id: "uhheb2yor", startShapeId: "cv7b0h55k", endShapeId: "y19mb0s03", startOutputIndex: 0, endInputIndex: 0 },
            { id: "kewmvamjl", startShapeId: "cuszxxxpt", endShapeId: "fzroi5awc", startOutputIndex: 0, endInputIndex: 0 },
            { id: "t82mfcp0q", startShapeId: "jhy8ox2wi", endShapeId: "quicna2uk", startOutputIndex: 0, endInputIndex: 0 },
            { id: "8h9lf28gt", startShapeId: "ql03guwyq", endShapeId: "t1ds6utu4", startOutputIndex: 0, endInputIndex: 0 },
            { id: "i2jl0huav", startShapeId: "l2s4yczak", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 2 },
            { id: "j2ep0veu3", startShapeId: "ql03guwyq", endShapeId: "jhy8ox2wi", startOutputIndex: 1, endInputIndex: 2 },
            { id: "icw17iv70", startShapeId: "jhy8ox2wi", endShapeId: "cuszxxxpt", startOutputIndex: 1, endInputIndex: 2 },
            { id: "aw906ma7p", startShapeId: "cuszxxxpt", endShapeId: "cv7b0h55k", startOutputIndex: 1, endInputIndex: 2 },
            { id: "jdsij57ao", startShapeId: "by1xagytx", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 1 },
            { id: "nu7qszb4q", startShapeId: "6prkrpqg3", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 1 },
            { id: "htnr9v3su", startShapeId: "0egn7ix89", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 1 },
            { id: "bii06mon9", startShapeId: "a7gbzibdp", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 1 },
            { id: "beg0l6y4n", startShapeId: "ckev6ndj0", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 0 },
            { id: "vz6gflryw", startShapeId: "4dh9a3rss", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 0 },
            { id: "6lndaqe0r", startShapeId: "5ipter2v7", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 0 },
            { id: "zvlcucke1", startShapeId: "etszoo8n8", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 0 },
            { id: "aqzauciwc", startShapeId: "cv7b0h55k", endShapeId: "3er9m5he2", startOutputIndex: 1, endInputIndex: 0 }
          ],
          inputMapping: [{ internalShapeId: "etszoo8n8", type: "output", index: 0 }, { internalShapeId: "5ipter2v7", type: "output", index: 0 }, { internalShapeId: "4dh9a3rss", type: "output", index: 0 }, { internalShapeId: "ckev6ndj0", type: "output", index: 0 }, { internalShapeId: "a7gbzibdp", type: "output", index: 0 }, { internalShapeId: "0egn7ix89", type: "output", index: 0 }, { internalShapeId: "6prkrpqg3", type: "output", index: 0 }, { internalShapeId: "by1xagytx", type: "output", index: 0 }, { internalShapeId: "l2s4yczak", type: "output", index: 0 }],
          outputMapping: [{ internalShapeId: "3er9m5he2", type: "input", index: 0 }, { internalShapeId: "y19mb0s03", type: "input", index: 0 }, { internalShapeId: "fzroi5awc", type: "input", index: 0 }, { internalShapeId: "quicna2uk", type: "input", index: 0 }, { internalShapeId: "t1ds6utu4", type: "input", index: 0 }]
        }
      },
        { id: "esr420eu8", type: "CustomBlock", x: 251, y: 242, width: 140, height: 265, label: "4-Bit Full Adder", inputs: [{ x: 0, y: 20, label: "A3 Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "A2 Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "A1 Out", value: 0, name: "in_2" }, { x: 0, y: 95, label: "A0 Out", value: 0, name: "in_3" }, { x: 0, y: 120, label: "B3 Out", value: 0, name: "in_4" }, { x: 0, y: 145, label: "B2 Out", value: 0, name: "in_5" }, { x: 0, y: 170, label: "B1 Out", value: 0, name: "in_6" }, { x: 0, y: 195, label: "B0 Out", value: 0, name: "in_7" }, { x: 0, y: 220, label: "CIn Out", value: 0, name: "in_8" }], outputs: [{ x: 140, y: 20, label: "OutPutL In", value: 0, name: "out_0" }, { x: 140, y: 45, label: "OutPutL In", value: 0, name: "out_1" }, { x: 140, y: 70, label: "OutPutL In", value: 0, name: "out_2" }, { x: 140, y: 95, label: "OutPutL In", value: 0, name: "out_3" }, { x: 140, y: 120, label: "OutPutL In", value: 0, name: "out_4" }], name: "Shape_6u76x", color: "#8b5cf6", font: "14px Orbitron", subcircuit: {
          shapes: [
            { id: "ql03guwyq", type: "CustomBlock", x: 192, y: 208, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: {
              shapes: [
                { id: "hge88cddc", type: "XOR", x: 284.6, y: 90.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_giiiv", color: "gray", font: "14px Orbitron" },
                { id: "kls62jc20", type: "XOR", x: 387.6, y: 94.3, width: 100, height: 50, label: "XOR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ja3ww", color: "gray", font: "14px Orbitron" },
                { id: "bydvut9p5", type: "AND", x: 284.6, y: 189.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_ge5l7", color: "gray", font: "14px Orbitron" },
                { id: "6y2fe8hmp", type: "AND", x: 387.6, y: 197.3, width: 100, height: 50, label: "AND", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_bh1ia", color: "gray", font: "14px Orbitron" },
                { id: "8n2yoysqy", type: "OR", x: 485.6, y: 203.3, width: 100, height: 50, label: "OR", inputs: [{ x: 0, y: 10, label: "A", value: 0, name: "in_a" }, { x: 0, y: 40, label: "B", value: 0, name: "in_b" }], outputs: [{ x: 100, y: 25, label: "Y", value: 0, name: "out_y" }], name: "Shape_jdw2o", color: "gray", font: "14px Orbitron" },
                { id: "hudfyn3hd", type: "InputL", x: 139.6, y: 38.3, width: 100, height: 50, label: "A", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_w0asc", color: "#ef4444", font: "14px Orbitron" },
                { id: "tt62vtsgj", type: "InputL", x: 139.6, y: 140.3, width: 100, height: 50, label: "B", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_slbkv", color: "#ef4444", font: "14px Orbitron" },
                { id: "fftgderw1", type: "InputL", x: 139.6, y: 230.3, width: 100, height: 50, label: "Co", inputs: [], outputs: [{ x: 85, y: 25, label: "Out", value: 0, name: "out" }], name: "Shape_11pri", color: "#ef4444", font: "14px Orbitron" },
                { id: "rut969tm5", type: "OutPutL", x: 596.6, y: 90.3, width: 100, height: 50, label: "S", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_tofks", color: "#3b82f6", font: "14px Orbitron" },
                { id: "69txkidh0", type: "OutPutL", x: 596.6, y: 212.3, width: 100, height: 50, label: "C1", inputs: [{ x: 50, y: 60, label: "In", value: 0, name: "in" }], outputs: [], name: "Shape_klyn1", color: "#3b82f6", font: "14px Orbitron" },
                { id: "ud49znr5i", type: "Text", x: 420, y: 18, width: 200, height: 40, label: "Full Adder", inputs: [], outputs: [], name: "Shape_pv463", color: "gray", font: "16px Orbitron", fontSize: 16 }
              ],
              connectors: [
                { id: "scp82tx36", startShapeId: "hudfyn3hd", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 0 },
                { id: "mumc2bq59", startShapeId: "hudfyn3hd", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 0 },
                { id: "kj56z2s1q", startShapeId: "tt62vtsgj", endShapeId: "hge88cddc", startOutputIndex: 0, endInputIndex: 1 },
                { id: "1njg1wzfz", startShapeId: "tt62vtsgj", endShapeId: "bydvut9p5", startOutputIndex: 0, endInputIndex: 1 },
                { id: "cxsbn8v8p", startShapeId: "hge88cddc", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 0 },
                { id: "drhkaqcut", startShapeId: "fftgderw1", endShapeId: "kls62jc20", startOutputIndex: 0, endInputIndex: 1 },
                { id: "1nmf5nm15", startShapeId: "hge88cddc", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 0 },
                { id: "kky1ge2t1", startShapeId: "fftgderw1", endShapeId: "6y2fe8hmp", startOutputIndex: 0, endInputIndex: 1 },
                { id: "tb1n1ytz0", startShapeId: "bydvut9p5", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 1 },
                { id: "9nc4pgmp7", startShapeId: "6y2fe8hmp", endShapeId: "8n2yoysqy", startOutputIndex: 0, endInputIndex: 0 },
                { id: "d1zizzvla", startShapeId: "kls62jc20", endShapeId: "rut969tm5", startOutputIndex: 0, endInputIndex: 0 },
                { id: "3ou25wk4o", startShapeId: "8n2yoysqy", endShapeId: "69txkidh0", startOutputIndex: 0, endInputIndex: 0 }
              ],
              inputMapping: [{ internalShapeId: "hudfyn3hd", type: "output", index: 0 }, { internalShapeId: "tt62vtsgj", type: "output", index: 0 }, { internalShapeId: "fftgderw1", type: "output", index: 0 }],
              outputMapping: [{ internalShapeId: "rut969tm5", type: "input", index: 0 }, { internalShapeId: "69txkidh0", type: "input", index: 0 }]
            } },
            { id: "cv7b0h55k", type: "CustomBlock", x: 499, y: 67, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
            { id: "cuszxxxpt", type: "CustomBlock", x: 389, y: 109, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } },
            { id: "jhy8ox2wi", type: "CustomBlock", x: 289, y: 156, width: 120, height: 115, label: "Full Adder", inputs: [{ x: 0, y: 20, label: "A Out", value: 0, name: "in_0" }, { x: 0, y: 45, label: "B Out", value: 0, name: "in_1" }, { x: 0, y: 70, label: "Co Out", value: 0, name: "in_2" }], outputs: [{ x: 120, y: 20, label: "S In", value: 0, name: "out_0" }, { x: 120, y: 45, label: "C1 In", value: 0, name: "out_1" }], name: "Shape_91k0n", color: "#8b5cf6", font: "14px Orbitron", subcircuit: { shapes: [], connectors: [], inputMapping: [], outputMapping: [] } }
          ],
          connectors: [
            { id: "uhheb2yor", startShapeId: "cv7b0h55k", endShapeId: "y19mb0s03", startOutputIndex: 0, endInputIndex: 0 },
            { id: "kewmvamjl", startShapeId: "cuszxxxpt", endShapeId: "fzroi5awc", startOutputIndex: 0, endInputIndex: 0 },
            { id: "t82mfcp0q", startShapeId: "jhy8ox2wi", endShapeId: "quicna2uk", startOutputIndex: 0, endInputIndex: 0 },
            { id: "8h9lf28gt", startShapeId: "ql03guwyq", endShapeId: "t1ds6utu4", startOutputIndex: 0, endInputIndex: 0 },
            { id: "i2jl0huav", startShapeId: "l2s4yczak", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 2 },
            { id: "j2ep0veu3", startShapeId: "ql03guwyq", endShapeId: "jhy8ox2wi", startOutputIndex: 1, endInputIndex: 2 },
            { id: "icw17iv70", startShapeId: "jhy8ox2wi", endShapeId: "cuszxxxpt", startOutputIndex: 1, endInputIndex: 2 },
            { id: "aw906ma7p", startShapeId: "cuszxxxpt", endShapeId: "cv7b0h55k", startOutputIndex: 1, endInputIndex: 2 },
            { id: "jdsij57ao", startShapeId: "by1xagytx", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 1 },
            { id: "nu7qszb4q", startShapeId: "6prkrpqg3", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 1 },
            { id: "htnr9v3su", startShapeId: "0egn7ix89", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 1 },
            { id: "bii06mon9", startShapeId: "a7gbzibdp", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 1 },
            { id: "beg0l6y4n", startShapeId: "ckev6ndj0", endShapeId: "ql03guwyq", startOutputIndex: 0, endInputIndex: 0 },
            { id: "vz6gflryw", startShapeId: "4dh9a3rss", endShapeId: "jhy8ox2wi", startOutputIndex: 0, endInputIndex: 0 },
            { id: "6lndaqe0r", startShapeId: "5ipter2v7", endShapeId: "cuszxxxpt", startOutputIndex: 0, endInputIndex: 0 },
            { id: "zvlcucke1", startShapeId: "etszoo8n8", endShapeId: "cv7b0h55k", startOutputIndex: 0, endInputIndex: 0 },
            { id: "aqzauciwc", startShapeId: "cv7b0h55k", endShapeId: "3er9m5he2", startOutputIndex: 1, endInputIndex: 0 }
          ],
          inputMapping: [{ internalShapeId: "etszoo8n8", type: "output", index: 0 }, { internalShapeId: "5ipter2v7", type: "output", index: 0 }, { internalShapeId: "4dh9a3rss", type: "output", index: 0 }, { internalShapeId: "ckev6ndj0", type: "output", index: 0 }, { internalShapeId: "a7gbzibdp", type: "output", index: 0 }, { internalShapeId: "0egn7ix89", type: "output", index: 0 }, { internalShapeId: "6prkrpqg3", type: "output", index: 0 }, { internalShapeId: "by1xagytx", type: "output", index: 0 }, { internalShapeId: "l2s4yczak", type: "output", index: 0 }],
          outputMapping: [{ internalShapeId: "3er9m5he2", type: "input", index: 0 }, { internalShapeId: "y19mb0s03", type: "input", index: 0 }, { internalShapeId: "fzroi5awc", type: "input", index: 0 }, { internalShapeId: "quicna2uk", type: "input", index: 0 }, { internalShapeId: "t1ds6utu4", type: "input", index: 0 }]
        }
      },
        { id: "j4zjxws3t", type: "Text", x: 305.6, y: 602.8, width: 200, height: 40, label: "9 Outs", inputs: [], outputs: [], name: "Shape_6pb0j", color: "gray", font: "16px Orbitron", fontSize: 16 }
      ],
      connectors: [
        { id: "cko04i1us", startShapeId: "r3hjooeyx", endShapeId: "9ahkwsx6l", startOutputIndex: 0, endInputIndex: 0 },
        { id: "k6tpkm4i3", startShapeId: "r3hjooeyx", endShapeId: "gl8qwruzz", startOutputIndex: 1, endInputIndex: 0 },
        { id: "icp5fdx6n", startShapeId: "r3hjooeyx", endShapeId: "npy4ernj2", startOutputIndex: 2, endInputIndex: 0 },
        { id: "8lxss1mw1", startShapeId: "r3hjooeyx", endShapeId: "insx4njxp", startOutputIndex: 3, endInputIndex: 0 },
        { id: "dmncysrz2", startShapeId: "r3hjooeyx", endShapeId: "osqlg7js5", startOutputIndex: 4, endInputIndex: 0 },
        { id: "6mo59gdgq", startShapeId: "0vpb9p9a4", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 7 },
        { id: "ug529zbwq", startShapeId: "eab4z96em", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 6 },
        { id: "90k33wz3w", startShapeId: "6ziu7ltha", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 5 },
        { id: "hxlirpqmq", startShapeId: "hbaz9d55v", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 4 },
        { id: "m3acf8n7y", startShapeId: "7tlbzy21h", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 3 },
        { id: "cqcf0ucuw", startShapeId: "v13dnqi3y", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 2 },
        { id: "k6v4v0u1z", startShapeId: "pku0246k2", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 1 },
        { id: "9qifrl25i", startShapeId: "7k4dtri7r", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 0 },
        { id: "h9alzzl87", startShapeId: "kuxpwv7cu", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 8 },
        { id: "0ts567gwb", startShapeId: "esr420eu8", endShapeId: "xo0lr8fhm", startOutputIndex: 1, endInputIndex: 0 },
        { id: "8epl7ut7r", startShapeId: "esr420eu8", endShapeId: "92iwk1cva", startOutputIndex: 2, endInputIndex: 0 },
        { id: "zan5k9jcy", startShapeId: "esr420eu8", endShapeId: "k900bzj85", startOutputIndex: 3, endInputIndex: 0 },
        { id: "kfhpisw7r", startShapeId: "esr420eu8", endShapeId: "q48zzo0zg", startOutputIndex: 4, endInputIndex: 0 },
        { id: "55a9y7rs9", startShapeId: "r22ikeh5q", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 7 },
        { id: "1svpjizxd", startShapeId: "9cq3onja8", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 6 },
        { id: "ohdpskc20", startShapeId: "vt5e39ioo", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 5 },
        { id: "5fd42p29c", startShapeId: "cmgnik2p4", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 4 },
        { id: "uvnhb967v", startShapeId: "psdz2pixf", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 3 },
        { id: "1k21ej4xo", startShapeId: "o0q9g4f8i", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 2 },
        { id: "xfl1zfnad", startShapeId: "lo3siutzb", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 1 },
        { id: "0fatl98q2", startShapeId: "pihu8es8u", endShapeId: "esr420eu8", startOutputIndex: 0, endInputIndex: 0 },
        { id: "eexohda1e", startShapeId: "esr420eu8", endShapeId: "r3hjooeyx", startOutputIndex: 0, endInputIndex: 8 }
      ],
      inputMapping: [
        { internalShapeId: "hbaz9d55v", type: "output", index: 0 },
        { internalShapeId: "6ziu7ltha", type: "output", index: 0 },
        { internalShapeId: "eab4z96em", type: "output", index: 0 },
        { internalShapeId: "0vpb9p9a4", type: "output", index: 0 },
        { internalShapeId: "cmgnik2p4", type: "output", index: 0 },
        { internalShapeId: "vt5e39ioo", type: "output", index: 0 },
        { internalShapeId: "9cq3onja8", type: "output", index: 0 },
        { internalShapeId: "r22ikeh5q", type: "output", index: 0 },
        { internalShapeId: "7k4dtri7r", type: "output", index: 0 },
        { internalShapeId: "pku0246k2", type: "output", index: 0 },
        { internalShapeId: "v13dnqi3y", type: "output", index: 0 },
        { internalShapeId: "7tlbzy21h", type: "output", index: 0 },
        { internalShapeId: "pihu8es8u", type: "output", index: 0 },
        { internalShapeId: "lo3siutzb", type: "output", index: 0 },
        { internalShapeId: "o0q9g4f8i", type: "output", index: 0 },
        { internalShapeId: "psdz2pixf", type: "output", index: 0 },
        { internalShapeId: "kuxpwv7cu", type: "output", index: 0 }
      ],
      outputMapping: [
        { internalShapeId: "9ahkwsx6l", type: "input", index: 0 },
        { internalShapeId: "gl8qwruzz", type: "input", index: 0 },
        { internalShapeId: "npy4ernj2", type: "input", index: 0 },
        { internalShapeId: "insx4njxp", type: "input", index: 0 },
        { internalShapeId: "osqlg7js5", type: "input", index: 0 },
        { internalShapeId: "xo0lr8fhm", type: "input", index: 0 },
        { internalShapeId: "92iwk1cva", type: "input", index: 0 },
        { internalShapeId: "k900bzj85", type: "input", index: 0 },
        { internalShapeId: "q48zzo0zg", type: "input", index: 0 }
      ]
    },
    prevInputs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
];
