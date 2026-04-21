import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CircuitCanvas from './components/CircuitCanvas';
import TruthTableModal from './components/TruthTableModal';
import { Shape, Connector, ShapeType, CircuitData, ConnectionPoint, Page } from './types';
import { generateRandomCircuit } from './services/aiService';
import { EXAMPLES, LIBRARY_BLOCKS } from './examples';
import { createShape } from './lib/circuitUtils';
import { INPUT_CONTROL_TYPES, OUTPUT_CONTROL_TYPES } from './constants';
import { Cpu, PlusSquare, Scissors, Plus, X, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [fileName, setFileName] = useState('Untitled Circuit');
  const [zoom, setZoom] = useState(100);
  const [clipboard, setClipboard] = useState<CircuitData | null>(null);
  const [isTruthTableOpen, setIsTruthTableOpen] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [truthTableData, setTruthTableData] = useState({ inputs: [], outputs: [], rows: [] });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pages, setPages] = useState<Page[]>([
    { id: 'main', name: 'Página Principal', shapes: [], connectors: [] }
  ]);
  const [currentPageId, setCurrentPageId] = useState('main');
  const [customBlocks, setCustomBlocks] = useState<Shape[]>([]);
  const [libraryBlocks, setLibraryBlocks] = useState<Shape[]>(LIBRARY_BLOCKS);
  const [isCreateBlockModalOpen, setIsCreateBlockModalOpen] = useState(false);
  const [newBlockName, setNewBlockName] = useState('');
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [wireStyle, setWireStyle] = useState<'curved' | 'orthogonal' | 'schematic'>('schematic');
  const [gridStyle, setGridStyle] = useState<'dots' | 'lines' | 'none'>('dots');
  const [gridColor, setGridColor] = useState('#313348'); // Match Sidebar background
  const [highlightedPin, setHighlightedPin] = useState<{ shapeId: string, type: 'input' | 'output', index: number } | null>(null);

  const [isMagneticWiresEnabled, setIsMagneticWiresEnabled] = useState(false);
  const [isConnectionCloningEnabled, setIsConnectionCloningEnabled] = useState(false);
  const [highlightedConnectorId, setHighlightedConnectorId] = useState<string | null>(null);
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  useEffect(() => {
    const fetchLibraries = async () => {
      const urls = [
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Full%20Adder%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/4-Bit%20Adder%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/8-Bit%20Adder%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/1-Bit%20Register%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/4-Bit%20Register%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/8-Bit%20Register%20Block%20Libray.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/7-Seg%20Driver%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Blanking%20Neg%20Driver%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/8-Bit%20Add%20Sub%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Buff%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/8%20Buffer%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Comparator%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/4-Bit%20Comparator%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/8-Bit%20Comparator%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Two%20Comp%20Driver%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/Logic%20Chip%20Block%20Library.json',
        'https://raw.githubusercontent.com/ravendano014/logicgateslablibrary/refs/heads/main/4-Bit%20Add%20Sub%20Block%20Library.json'
      ];

      try {
        const results = await Promise.all(urls.map(url => 
          fetch(url).then(res => res.json()).catch(err => {
            console.error(`Error fetching ${url}:`, err);
            return null;
          })
        ));

        const allShapes: Shape[] = [];
        results.forEach(data => {
          if (data && data.shapes) {
            allShapes.push(...data.shapes);
          }
        });

        if (allShapes.length > 0) {
          setLibraryBlocks(allShapes);
        }
      } catch (error) {
        console.error('Error fetching libraries:', error);
      }
    };
    fetchLibraries();
  }, []);

  const bcdToSegments = (bcd: string) => {
    switch (bcd) {
      case "0000": return [1, 1, 1, 1, 1, 1, 0]; // 0
      case "0001": return [0, 1, 1, 0, 0, 0, 0]; // 1
      case "0010": return [1, 1, 0, 1, 1, 0, 1]; // 2
      case "0011": return [1, 1, 1, 1, 0, 0, 1]; // 3
      case "0100": return [0, 1, 1, 0, 0, 1, 1]; // 4
      case "0101": return [1, 0, 1, 1, 0, 1, 1]; // 5
      case "0110": return [1, 0, 1, 1, 1, 1, 1]; // 6
      case "0111": return [1, 1, 1, 0, 0, 0, 0]; // 7
      case "1000": return [1, 1, 1, 1, 1, 1, 1]; // 8
      case "1001": return [1, 1, 1, 1, 0, 1, 1]; // 9
      case "1010": return [1, 1, 1, 0, 1, 1, 1]; // A
      case "1011": return [0, 0, 1, 1, 1, 1, 1]; // b
      case "1100": return [1, 0, 0, 1, 1, 1, 0]; // C
      case "1101": return [0, 1, 1, 1, 1, 0, 1]; // d
      case "1110": return [1, 0, 0, 1, 1, 1, 1]; // E
      case "1111": return [1, 0, 0, 0, 1, 1, 1]; // F
      default: return [0, 0, 0, 0, 0, 0, 0];
    }
  };

  // Simulation Logic
  const evaluateCircuit = useCallback((currentShapes: Shape[], currentConnectors: Connector[] = connectors, depth: number = 0) => {
    if (depth > 5) return currentShapes; // Prevent infinite recursion

    const updatedShapes = currentShapes.map(s => ({ 
      ...s, 
      inputs: (s.inputs || []).map(i => ({ ...i })), 
      outputs: (s.outputs || []).map(o => ({ ...o })),
      prevInputs: (s.inputs || []).map(i => i.value),
      history: s.history ? [...s.history] : undefined
    }));
    
    // Simple propagation logic - iterate multiple times to handle feedback loops.
    // For depth > 0 (subcircuits), we only need a few iterations per parent iteration to propagate changes.
    const iterations = depth === 0 ? 60 : 2; 

    for (let iter = 0; iter < iterations; iter++) {
      updatedShapes.forEach(shape => {
        // Handle Clock inside evaluateCircuit for synchronization
        if (shape.type === 'Clock' || shape.type === 'Clock_ms' || shape.type === 'Clock_Hz_Adj' || shape.type === 'Clock_ms_Adj' || shape.type === 'GatedClock') {
          const freq = shape.frequency || 1;
          const periodMs = 1000 / freq;
          const now = Date.now();
          let newValue = Math.floor(now / (periodMs / 2)) % 2 === 0 ? 1 : 0;
          
          if (shape.type === 'GatedClock') {
            const enableInput = shape.inputs?.[0]?.value || 0;
            if (!enableInput) newValue = 0;
          }
          
          shape.color = newValue === 1 ? 'green' : 'red';
          if (shape.outputs[0]) shape.outputs[0].value = newValue;
        }

        const incomingConnectors = currentConnectors.filter(c => c.endShapeId === shape.id);
        
        // Reset inputs that have logic connections to 0 before aggregating (OR behavior)
        const connectedInputIndices = new Set(incomingConnectors.map(c => c.endInputIndex));
        connectedInputIndices.forEach(idx => {
          if (shape.inputs[idx]) shape.inputs[idx].value = 0;
        });

        // Update inputs based on connected outputs (OR gate behavior for multiple connections)
        incomingConnectors.forEach(conn => {
          const sourceShape = updatedShapes.find(s => s.id === conn.startShapeId);
          if (sourceShape && sourceShape.outputs[conn.startOutputIndex] && shape.inputs[conn.endInputIndex]) {
            const rawValue = sourceShape.outputs[conn.startOutputIndex].value;
            const sourceValue = typeof rawValue === 'number' ? rawValue : (rawValue === '1' ? 1 : 0);
            
            // OR logic: if any input is 1, the internal value becomes 1
            if (sourceValue === 1) {
              shape.inputs[conn.endInputIndex].value = 1;
            }
          }
        });

        // Compute logic
        const inputValues = (shape.inputs || []).map(i => typeof i.value === 'number' ? i.value : (i.value === '1' ? 1 : 0));
        const prevInputValues = shape.prevInputs?.map(v => typeof v === 'number' ? v : (v === '1' ? 1 : 0)) || inputValues;
        
        switch (shape.type) {
          case 'AND':
          case 'AND3':
          case 'AND4':
          case 'AND5':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues.every(v => v) ? 1 : 0;
            break;
          case 'OR':
          case 'OR3':
          case 'OR4':
          case 'OR5':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues.some(v => v) ? 1 : 0;
            break;
          case 'NOT':
            if (shape.outputs[0]) shape.outputs[0].value = !inputValues[0] ? 1 : 0;
            break;
          case 'NAND':
          case 'NAND3':
          case 'NAND4':
            if (shape.outputs[0]) shape.outputs[0].value = !inputValues.every(v => v) ? 1 : 0;
            break;
          case 'NOR':
          case 'NOR3':
          case 'NOR4':
            if (shape.outputs[0]) shape.outputs[0].value = !inputValues.some(v => v) ? 1 : 0;
            break;
          case 'XOR':
          case 'XOR3':
          case 'XOR4':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues.filter(v => v).length % 2 !== 0 ? 1 : 0;
            break;
          case 'XNOR':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues.filter(v => v).length % 2 === 0 ? 1 : 0;
            break;
          case 'IC7SegToBCD': {
            // Converts 7-segment active inputs to 4-bit BCD
            // a, b, c, d, e, f, g at inputs 0-6
            const a = !!inputValues[0], b = !!inputValues[1], c = !!inputValues[2];
            const d = !!inputValues[3], e = !!inputValues[4], f = !!inputValues[5], g = !!inputValues[6];
            let val = 0;
            if (a && b && c && d && e && f && !g) val = 0;
            else if (!a && b && c && !d && !e && !f && !g) val = 1;
            else if (a && b && !c && d && e && !f && g) val = 2;
            else if (a && b && c && d && !e && !f && g) val = 3;
            else if (!a && b && c && !d && !e && f && g) val = 4;
            else if (a && !b && c && d && !e && f && g) val = 5;
            else if (a && !b && c && d && e && f && g) val = 6;
            else if (a && b && c && !d && !e && !f && !g) val = 7;
            else if (a && b && c && d && e && f && g) val = 8;
            else if (a && b && c && d && !e && f && g) val = 9;
            
            for (let i = 0; i < 4; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = (val >> i) & 1;
            }
            break;
          }
          case 'Buffer':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] ? 1 : 0;
            break;
          case 'ThreeState':
            if (shape.outputs[0]) {
              const A = inputValues[0];
              const E = inputValues[1];
              shape.outputs[0].value = E ? (A ? 1 : 0) : 0; // If E is 1, Y=A. If E is 0, Y=0 (simulator limitation)
            }
            break;
          case 'SR_Flip_Flop': {
            const S = inputValues[0];
            const R = inputValues[1];
            const CLK = inputValues[2];
            const prevCLK = prevInputValues[2];
            let Q = shape.state !== undefined ? shape.state : 0;
            
            // Rising edge detection
            if (CLK && !prevCLK) {
              if (S && !R) Q = 1;
              else if (!S && R) Q = 0;
              else if (S && R) Q = 1; // Invalid state, usually both high in SR latch
            }
            
            shape.state = Q;
            if (shape.outputs[0]) shape.outputs[0].value = Q;
            if (shape.outputs[1]) shape.outputs[1].value = Q === 1 ? 0 : 1;
            break;
          }
          case 'D_Flip_Flop': {
            const D = inputValues[0];
            const CLK = inputValues[1];
            const prevCLK = prevInputValues[1];
            let Q = shape.state !== undefined ? shape.state : 0;
            
            // Rising edge detection
            if (CLK && !prevCLK) {
              Q = D ? 1 : 0;
            }
            
            shape.state = Q;
            if (shape.outputs[0]) shape.outputs[0].value = Q;
            if (shape.outputs[1]) shape.outputs[1].value = Q === 1 ? 0 : 1;
            break;
          }
          case 'T_Flip_Flop': {
            const T = inputValues[0];
            const CLK = inputValues[1];
            const prevCLK = prevInputValues[1];
            let Q = shape.state !== undefined ? shape.state : 0;
            
            // Rising edge detection
            if (CLK && !prevCLK) {
              if (T) Q = Q === 1 ? 0 : 1;
            }
            
            shape.state = Q;
            if (shape.outputs[0]) shape.outputs[0].value = Q;
            if (shape.outputs[1]) shape.outputs[1].value = Q === 1 ? 0 : 1;
            break;
          }
          case 'D_Latch': {
            const D = inputValues[0];
            const EN = inputValues[1];
            let Q = shape.state !== undefined ? shape.state : 0;
            
            if (EN) {
              Q = D ? 1 : 0;
            }
            
            shape.state = Q;
            if (shape.outputs[0]) shape.outputs[0].value = Q;
            if (shape.outputs[1]) shape.outputs[1].value = Q === 1 ? 0 : 1;
            break;
          }
          case 'JK_Flip_Flop': {
            const J = inputValues[0];
            const K = inputValues[1];
            const CLK = inputValues[2];
            const prevCLK = prevInputValues[2];
            let Q = shape.state !== undefined ? shape.state : 0;
            
            // Rising edge detection
            if (CLK && !prevCLK) {
              if (J && !K) Q = 1;
              else if (!J && K) Q = 0;
              else if (J && K) Q = Q === 1 ? 0 : 1;
            }
            
            shape.state = Q;
            if (shape.outputs[0]) shape.outputs[0].value = Q;
            if (shape.outputs[1]) shape.outputs[1].value = Q === 1 ? 0 : 1;
            break;
          }
          case 'PushButton':
            if (shape.outputs[0]) shape.outputs[0].value = shape.isPressed ? 1 : 0;
            break;
          case 'HighConstant':
            if (shape.outputs[0]) shape.outputs[0].value = 1;
            break;
          case 'LowConstant':
            if (shape.outputs[0]) shape.outputs[0].value = 0;
            break;
          case 'ToggleSwitch':
            // Value is toggled via interaction, logic just propagates it
            break;
          case 'PassSwitch':
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] && shape.state) ? 1 : 0;
            break;
          case 'OutPutL':
            shape.color = inputValues[0] ? (shape.onColor || '#22c55e') : (shape.offColor || '#3b82f6');
            break;
          case 'Oscilloscope':
            if (!shape.state) shape.state = { history: [[], [], [], []] };
            if (!shape.state.history) shape.state.history = [[], [], [], []];
            
            inputValues.forEach((v, i) => {
              if (i < 4) {
                const val = typeof v === 'number' ? v : (v ? 1 : 0);
                shape.state.history[i].push(val);
                if (shape.state.history[i].length > 100) shape.state.history[i].shift();
              }
            });
            break;
          case 'Voltmeter':
          case 'Ammeter':
          case 'Probe':
            // These are measurement tools, they just display the input value
            shape.state = inputValues[0];
            break;
          case 'MUX_2to1': {
            const in0 = inputValues[0];
            const in1 = inputValues[1];
            const sel = inputValues[2];
            if (shape.outputs[0]) shape.outputs[0].value = sel ? in1 : in0;
            break;
          }
          case 'MUX_4to1': {
            const in0 = inputValues[0];
            const in1 = inputValues[1];
            const in2 = inputValues[2];
            const in3 = inputValues[3];
            const s0 = inputValues[4];
            const s1 = inputValues[5];
            const sel = (s1 ? 2 : 0) | (s0 ? 1 : 0);
            const val = [in0, in1, in2, in3][sel];
            if (shape.outputs[0]) shape.outputs[0].value = val;
            break;
          }
          case 'Half_Adder': {
            const a = inputValues[0] ? 1 : 0;
            const b = inputValues[1] ? 1 : 0;
            if (shape.outputs[0]) shape.outputs[0].value = a ^ b;
            if (shape.outputs[1]) shape.outputs[1].value = a & b;
            break;
          }
          case 'Full_Adder': {
            const a = inputValues[0] ? 1 : 0;
            const b = inputValues[1] ? 1 : 0;
            const cin = inputValues[2] ? 1 : 0;
            const sum = a ^ b ^ cin;
            const cout = (a & b) | (cin & (a ^ b));
            if (shape.outputs[0]) shape.outputs[0].value = sum;
            if (shape.outputs[1]) shape.outputs[1].value = cout;
            break;
          }
          case 'Adder_4bit': {
            let cin = inputValues[8] ? 1 : 0;
            for (let i = 0; i < 4; i++) {
              const a = inputValues[i] ? 1 : 0;
              const b = inputValues[i + 4] ? 1 : 0;
              const sum = a ^ b ^ cin;
              cin = (a & b) | (cin & (a ^ b));
              if (shape.outputs[i]) shape.outputs[i].value = sum;
            }
            if (shape.outputs[4]) shape.outputs[4].value = cin;
            break;
          }
          case 'Adder_8bit': {
            let cin = inputValues[16] ? 1 : 0;
            for (let i = 0; i < 8; i++) {
              const a = inputValues[i] ? 1 : 0;
              const b = inputValues[i + 8] ? 1 : 0;
              const sum = a ^ b ^ cin;
              cin = (a & b) | (cin & (a ^ b));
              if (shape.outputs[i]) shape.outputs[i].value = sum;
            }
            if (shape.outputs[8]) shape.outputs[8].value = cin;
            break;
          }
          case 'SR_Latch':
          case 'SR_Latch_Inv': {
            let s = inputValues[0] ? 1 : 0;
            let r = inputValues[1] ? 1 : 0;
            if (shape.type === 'SR_Latch_Inv') {
              s = s ? 0 : 1;
              r = r ? 0 : 1;
            }
            let q = shape.state !== undefined ? shape.state : 0;
            if (s && !r) q = 1;
            else if (!s && r) q = 0;
            // s=1, r=1 is invalid for SR latch, usually keeps state or goes to meta
            shape.state = q;
            if (shape.outputs[0]) shape.outputs[0].value = q;
            if (shape.outputs[1]) shape.outputs[1].value = q ? 0 : 1;
            break;
          }
          case 'Comparator': {
            const pos = typeof inputValues[0] === 'number' ? inputValues[0] : (inputValues[0] ? 5 : 0);
            const neg = typeof inputValues[1] === 'number' ? inputValues[1] : (inputValues[1] ? 5 : 0);
            if (shape.outputs[0]) shape.outputs[0].value = pos > neg ? 1 : 0;
            break;
          }
          case 'IC74160':
          case 'IC74161': {
            // 4-bit binary/decade counter
            // Inputs: 0: CLK, 1: CLEAR (active low), 2: LOAD (active low), 3: ENP, 4: ENT, 5-8: D0-D3
            const clk = inputValues[0];
            const clear = inputValues[1];
            const load = inputValues[2];
            const enp = inputValues[3];
            const ent = inputValues[4];
            const prevClk = prevInputValues[0];
            
            let count = shape.state !== undefined ? shape.state : 0;
            const isDecade = shape.type === 'IC74160';
            const maxCount = isDecade ? 10 : 16;
            
            if (!clear) {
              count = 0;
            } else if (clk && !prevClk) { // Rising edge
              if (!load) {
                count = (inputValues[5] ? 1 : 0) | (inputValues[6] ? 2 : 0) | (inputValues[7] ? 4 : 0) | (inputValues[8] ? 8 : 0);
                if (isDecade && count > 9) count = 0;
              } else if (enp && ent) {
                count = (count + 1) % maxCount;
              }
            }
            
            shape.state = count;
            if (shape.outputs[0]) shape.outputs[0].value = (count & 1) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (count & 2) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = (count & 4) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = (count & 8) ? 1 : 0;
            if (shape.outputs[4]) shape.outputs[4].value = (count === (maxCount - 1) && ent) ? 1 : 0; // RCO
            break;
          }
          case 'IC74192':
          case 'IC74193': {
            // Synchronous Up/Down Counter
            // Inputs: 0: UP, 1: DN, 2: PL (active low), 3: MR (active high), 4-7: D0-D3
            // Outputs: 0-3: Q0-Q3, 4: TCU (active low), 5: TCD (active low)
            const up = inputValues[0];
            const dn = inputValues[1];
            const pl = inputValues[2];
            const mr = inputValues[3];
            const d = [inputValues[4], inputValues[5], inputValues[6], inputValues[7]];
            const prevUp = prevInputValues[0];
            const prevDn = prevInputValues[1];
            
            if (shape.state === undefined || typeof shape.state !== 'number') shape.state = 0;
            
            const max = (shape.type === 'IC74192') ? 9 : 15;
            
            if (mr) {
              shape.state = 0;
            } else if (!pl) {
              shape.state = (d[0] ? 1 : 0) | (d[1] ? 2 : 0) | (d[2] ? 4 : 0) | (d[3] ? 8 : 0);
            } else {
              // Rising edge for UP (while DN is HIGH)
              if (up && !prevUp && dn) {
                shape.state = (shape.state + 1) > max ? 0 : shape.state + 1;
              }
              // Rising edge for DN (while UP is HIGH)
              if (dn && !prevDn && up) {
                shape.state = (shape.state - 1) < 0 ? max : shape.state - 1;
              }
            }
            
            // Outputs
            for (let i = 0; i < 4; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = (shape.state & (1 << i)) ? 1 : 0;
            }
            // TCU (Terminal Count Up) - Active Low
            if (shape.outputs[4]) shape.outputs[4].value = (shape.state === max && !up) ? 0 : 1;
            // TCD (Terminal Count Down) - Active Low
            if (shape.outputs[5]) shape.outputs[5].value = (shape.state === 0 && !dn) ? 0 : 1;
            break;
          }
          case 'IC7493': {
            // 4-bit binary counter (asynchronous)
            // Inputs: 0: CKA, 1: CKB, 2: R0(1), 3: R0(2)
            // Outputs: 0: QA, 1: QB, 2: QC, 3: QD
            const cka = inputValues[0];
            const ckb = inputValues[1];
            const r01 = inputValues[2];
            const r02 = inputValues[3];
            const prevCka = prevInputValues[0];
            const prevCkb = prevInputValues[1];
            
            if (!shape.state) shape.state = { qa: 0, qbcd: 0 };
            
            if (r01 && r02) {
              shape.state.qa = 0;
              shape.state.qbcd = 0;
            } else {
              // Falling edge for CKA
              if (!cka && prevCka) {
                shape.state.qa = (shape.state.qa + 1) % 2;
              }
              // Falling edge for CKB
              if (!ckb && prevCkb) {
                shape.state.qbcd = (shape.state.qbcd + 1) % 8;
              }
            }
            
            if (shape.outputs[0]) shape.outputs[0].value = shape.state.qa;
            if (shape.outputs[1]) shape.outputs[1].value = (shape.state.qbcd & 1) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = (shape.state.qbcd & 2) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = (shape.state.qbcd & 4) ? 1 : 0;
            break;
          }
          case 'IC74138': {
            // 3-to-8 decoder
            // Inputs: 0-2: A, B, C; 3: G1 (active high); 4: G2A (active low); 5: G2B (active low)
            const a = inputValues[0];
            const b = inputValues[1];
            const c = inputValues[2];
            const g1 = inputValues[3];
            const g2a = inputValues[4];
            const g2b = inputValues[5];
            
            const enabled = g1 && !g2a && !g2b;
            const select = (a ? 1 : 0) | (b ? 2 : 0) | (c ? 4 : 0);
            
            for (let i = 0; i < 8; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = (enabled && select === i) ? 0 : 1; // Active low outputs
            }
            break;
          }
          case 'IC74151': {
            // 8-to-1 mux
            // Inputs: 0-7: D0-D7; 8-10: A, B, C; 11: STROBE (active low)
            const select = (inputValues[8] ? 1 : 0) | (inputValues[9] ? 2 : 0) | (inputValues[10] ? 4 : 0);
            const strobe = inputValues[11];
            const y = (!strobe) ? (inputValues[select] ? 1 : 0) : 0;
            if (shape.outputs[0]) shape.outputs[0].value = y;
            if (shape.outputs[1]) shape.outputs[1].value = y ? 0 : 1; // W (inverted Y)
            break;
          }
          case 'IC74153': {
            // Dual 4-to-1 mux
            // Inputs: 0-3: 1D0-1D3; 4: 1G (active low); 5-8: 2D0-2D3; 9: 2G (active low); 10-11: A, B (common select)
            const select = (inputValues[10] ? 1 : 0) | (inputValues[11] ? 2 : 0);
            const g1 = inputValues[4];
            const g2 = inputValues[9];
            
            if (shape.outputs[0]) shape.outputs[0].value = (!g1) ? (inputValues[select] ? 1 : 0) : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (!g2) ? (inputValues[5 + select] ? 1 : 0) : 0;
            break;
          }
          case 'IC7408':
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] && inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (inputValues[2] && inputValues[3]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = (inputValues[4] && inputValues[5]) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = (inputValues[6] && inputValues[7]) ? 1 : 0;
            break;
          case 'IC7400':
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] && inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[2] && inputValues[3]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = !(inputValues[4] && inputValues[5]) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = !(inputValues[6] && inputValues[7]) ? 1 : 0;
            break;
          case 'IC7432':
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] || inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (inputValues[2] || inputValues[3]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = (inputValues[4] || inputValues[5]) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = (inputValues[6] || inputValues[7]) ? 1 : 0;
            break;
          case 'IC7402':
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] || inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[2] || inputValues[3]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = !(inputValues[4] || inputValues[5]) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = !(inputValues[6] || inputValues[7]) ? 1 : 0;
            break;
          case 'IC7486':
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] !== inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (inputValues[2] !== inputValues[3]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = (inputValues[4] !== inputValues[5]) ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = (inputValues[6] !== inputValues[7]) ? 1 : 0;
            break;
          case 'IC7404':
            if (shape.outputs[0]) shape.outputs[0].value = !inputValues[0] ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !inputValues[1] ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = !inputValues[2] ? 1 : 0;
            if (shape.outputs[3]) shape.outputs[3].value = !inputValues[3] ? 1 : 0;
            if (shape.outputs[4]) shape.outputs[4].value = !inputValues[4] ? 1 : 0;
            if (shape.outputs[5]) shape.outputs[5].value = !inputValues[5] ? 1 : 0;
            break;
          case 'IC7445': {
            const bcd = inputValues.slice(0, 4).reverse().map(v => v ? '1' : '0').join('');
            const segments = bcdToSegments(bcd);
            segments.forEach((val, i) => {
              if (shape.outputs[i]) shape.outputs[i].value = val;
            });
            break;
          }
          case 'IC7447': {
            // BCD to 7-Segment Decoder
            const bcd = inputValues.slice(0, 4).reverse().map(v => v ? '1' : '0').join('');
            const segments = bcdToSegments(bcd);
            segments.forEach((val, i) => {
              if (shape.outputs[i]) shape.outputs[i].value = val;
            });
            break;
          }
          case 'IC7448': {
            // BCD to 7-Segment Decoder (Common Cathode / Active High outputs)
            // Inputs: 0: A, 1: B, 2: C, 3: D, 4: LT, 5: RBI, 6: BI
            const a = inputValues[0];
            const b = inputValues[1];
            const c = inputValues[2];
            const d = inputValues[3];
            const lt = inputValues[4];
            const rbi = inputValues[5];
            const bi = inputValues[6];

            if (!bi) {
              // Blanking input active (active low)
              shape.outputs.forEach(o => o.value = 0);
            } else if (!lt) {
              // Lamp test active (active low)
              shape.outputs.forEach(o => o.value = 1);
            } else {
              const bcdValue = (a ? 1 : 0) | (b ? 2 : 0) | (c ? 4 : 0) | (d ? 8 : 0);
              const bcdStrMSB = [d, c, b, a].map(v => v ? '1' : '0').join('');
              
              const segments = bcdToSegments(bcdStrMSB);
              
              // If RBI is active (low) and BCD is 0, blank display
              if (!rbi && bcdValue === 0) {
                shape.outputs.forEach(o => o.value = 0);
              } else {
                segments.forEach((val, i) => {
                  if (shape.outputs[i]) shape.outputs[i].value = val;
                });
              }
            }
            break;
          }
          case 'IC7490': {
            // Decade Counter
            // Inputs: 0: CP0, 1: CP1, 2: MR1, 3: MR2, 4: MS1, 5: MS2
            const cp0 = inputValues[0];
            const prevCp0 = prevInputValues[0];
            const cp1 = inputValues[1];
            const prevCp1 = prevInputValues[1];
            const mr = inputValues[2] && inputValues[3];
            const ms = inputValues[4] && inputValues[5];
            
            let q0 = shape.state?.q0 ?? 0;
            let q123 = shape.state?.q123 ?? 0; // 3-bit counter for CP1
            
            if (mr) {
              q0 = 0;
              q123 = 0;
            } else if (ms) {
              q0 = 1;
              q123 = 4; // Binary 100 -> Q3=1, Q2=0, Q1=0. Combined with Q0=1 gives 1001 (9)
            } else {
              // CP0 triggers Q0
              if (prevCp0 === 1 && cp0 === 0) { // Falling edge
                q0 = q0 === 0 ? 1 : 0;
              }
              // CP1 triggers Q1, Q2, Q3
              if (prevCp1 === 1 && cp1 === 0) { // Falling edge
                q123 = (q123 + 1) % 5; // Decade counter part (mod 5)
              }
            }
            
            shape.state = { q0, q123 };
            if (shape.outputs[0]) shape.outputs[0].value = q0;
            if (shape.outputs[1]) shape.outputs[1].value = (q123 & 1);
            if (shape.outputs[2]) shape.outputs[2].value = (q123 & 2) >> 1;
            if (shape.outputs[3]) shape.outputs[3].value = (q123 & 4) >> 2;
            break;
          }
          case 'IC555':
          case 'IC555_Simple': {
            let trig, thres, reset, vcc = 1, gnd = 0;
            if (shape.inputs.length === 3) {
              // Simple version: 0: TRIG, 1: THRES, 2: RESET
              trig = inputValues[0];
              thres = inputValues[1];
              reset = inputValues[2];
            } else {
              // Complex version: 0: RES, 1: TRI, 2: VCC, 3: DIS, 4: THR, 5: CON, 6: GND
              reset = inputValues[0];
              trig = inputValues[1];
              vcc = inputValues[2];
              thres = inputValues[4];
              gnd = inputValues[6];
            }
            
            const mode = shape.mode || 'astable';
            let q = shape.state?.q ?? 0;
            const now = Date.now();

            if (!shape.state) shape.state = { q: 0 };

            if (!vcc || gnd) {
              q = 0;
            } else if (reset === 0) {
              // Reset is active low
              q = 0;
            } else {
              if (mode === 'astable') {
                const freq = shape.frequency || 1;
                const periodMs = 1000 / freq;
                q = Math.floor(now / (periodMs / 2)) % 2 === 0 ? 1 : 0;
              } else if (mode === 'monostable') {
                const R = shape.resistance || 10000;
                const C = shape.capacitance || 0.00001;
                const T_ms = 1.1 * R * C * 1000;
                
                const prevTrig = shape.state?.lastTrig ?? shape.state?.lastTrigger ?? 1;
                // Trigger on falling edge (1 -> 0)
                if (prevTrig === 1 && trig === 0) {
                  shape.state.pulseEndTime = now + T_ms;
                  q = 1;
                } else if (now < (shape.state?.pulseEndTime || 0)) {
                  q = 1;
                } else {
                  q = 0;
                }
              } else if (mode === 'bistable') {
                // TRI sets (active low), THR resets (active high)
                if (!trig) q = 1;
                else if (thres) q = 0;
              }
            }

            shape.state.lastTrig = trig;
            shape.state.lastTrigger = trig;
            shape.state.q = q;
            if (shape.outputs[0]) shape.outputs[0].value = q;
            break;
          }
          case 'IC7410':
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] && inputValues[1] && inputValues[2]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[3] && inputValues[4] && inputValues[5]) ? 1 : 0;
            if (shape.outputs[2]) shape.outputs[2].value = !(inputValues[6] && inputValues[7] && inputValues[8]) ? 1 : 0;
            break;
          case 'IC7420':
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] && inputValues[1] && inputValues[2] && inputValues[3]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[4] && inputValues[5] && inputValues[6] && inputValues[7]) ? 1 : 0;
            break;
          case 'IC7430':
            if (shape.outputs[0]) shape.outputs[0].value = !inputValues.every(v => v) ? 1 : 0;
            break;
          case 'IC4013': {
            // Dual D Flip-Flop
            const d1 = inputValues[0], clk1 = inputValues[1], r1 = inputValues[2], s1 = inputValues[3];
            const d2 = inputValues[4], clk2 = inputValues[5], r2 = inputValues[6], s2 = inputValues[7];
            const prevClk1 = prevInputValues[1], prevClk2 = prevInputValues[5];
            if (!shape.state) shape.state = { q1: 0, q2: 0 };
            if (r1) shape.state.q1 = 0; else if (s1) shape.state.q1 = 1; else if (clk1 && !prevClk1) shape.state.q1 = d1 ? 1 : 0;
            if (r2) shape.state.q2 = 0; else if (s2) shape.state.q2 = 1; else if (clk2 && !prevClk2) shape.state.q2 = d2 ? 1 : 0;
            if (shape.outputs[0]) shape.outputs[0].value = shape.state.q1;
            if (shape.outputs[1]) shape.outputs[1].value = shape.state.q1 ? 0 : 1;
            if (shape.outputs[2]) shape.outputs[2].value = shape.state.q2;
            if (shape.outputs[3]) shape.outputs[3].value = shape.state.q2 ? 0 : 1;
            break;
          }
          case 'IC4017': {
            // Decade Counter
            const clk = inputValues[0], clken = inputValues[1], reset = inputValues[2];
            const prevClk = prevInputValues[0];
            if (!shape.state || typeof shape.state !== 'object') shape.state = { count: 0 };
            if (reset) shape.state.count = 0;
            else if (clk && !prevClk && !clken) shape.state.count = (shape.state.count + 1) % 10;
            for (let i = 0; i < 10; i++) if (shape.outputs && shape.outputs[i]) shape.outputs[i].value = (shape.state.count === i) ? 1 : 0;
            if (shape.outputs && shape.outputs[10]) shape.outputs[10].value = (shape.state.count < 5) ? 1 : 0; // Carry out
            break;
          }
          case 'LM358':
          case 'LM324':
          case 'LM311':
            // Comparator logic for all
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] > inputValues[1]) ? 1 : 0;
            if (shape.outputs[1] && inputValues.length > 3) shape.outputs[1].value = (inputValues[2] > inputValues[3]) ? 1 : 0;
            break;
          case 'IC7SegToBCD': {
            // Converts 7-segment lines (a-g) back to 4-bit BCD (0-9, A-F)
            const segs = inputValues.slice(0, 7).map(v => v ? '1' : '0').join('');
            // Map common 7-seg patterns back to hex
            const segMap: { [key: string]: number } = {
              "1111110": 0, "0110000": 1, "1101101": 2, "1111001": 3, "0110011": 4,
              "1011011": 5, "1011111": 6, "1110000": 7, "1111111": 8, "1111011": 9,
              "1110111": 10, "0011111": 11, "1001110": 12, "0111101": 13, "1001111": 14, "1000111": 15
            };
            const val = segMap[segs] ?? 0;
            for (let i = 0; i < 4; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = (val >> i) & 1;
            }
            break;
          }
          case 'IC74HC595': {
            const data = inputValues[0];
            const clk = inputValues[1];
            const latch = inputValues[2];
            const prevInputs = shape.prevInputs || [0, 0, 0];
            const prevClk = prevInputs[1] === 1;
            const prevLatch = prevInputs[2] === 1;
            
            if (!shape.state || typeof shape.state !== 'object' || !shape.state.storageReg) {
              shape.state = { shiftReg: Array(8).fill(0), storageReg: Array(8).fill(0) };
            }
            
            // Shift on rising edge of clock
            if (clk && !prevClk) {
              shape.state.shiftReg.unshift(data ? 1 : 0);
              shape.state.shiftReg.pop();
            }
            
            // Latch on rising edge of latch
            if (latch && !prevLatch) {
              shape.state.storageReg = [...shape.state.shiftReg];
            }
            
            // Update outputs
            if (Array.isArray(shape.state.storageReg)) {
              shape.state.storageReg.forEach((val: number, i: number) => {
                if (shape.outputs[i]) shape.outputs[i].value = val;
              });
            }
            break;
          }
          case 'Display4Digit': {
            // 8 segments (A-G, DP) + 4 digits (D1-D4)
            if (!shape.state) {
              shape.state = {
                digitSegments: Array(4).fill(0).map(() => Array(8).fill(0))
              };
            }
            // Update segments for active digits (multiplexing simulation)
            for (let d = 0; d < 4; d++) {
              // Assume active HIGH for digit selector (common cathode style for simulation)
              const isDigitActive = inputValues[8 + d];
              if (isDigitActive) {
                for (let s = 0; s < 8; s++) {
                  shape.state.digitSegments[d][s] = inputValues[s] ? 1 : 0;
                }
              }
            }
            break;
          }
          case 'Buzzer':
            // Visual feedback handled in rendering
            break;
          case 'Motor':
            if (!shape.state) shape.state = { rotation: 0 };
            if (inputValues[0]) {
              shape.state.rotation = (shape.state.rotation + 15) % 360;
            }
            break;
          case 'RGB_LED':
            // Inputs: 0:R, 1:G, 2:B
            const r = inputValues[0] ? 255 : 0;
            const g = inputValues[1] ? 255 : 0;
            const b = inputValues[2] ? 255 : 0;
            shape.color = `rgb(${r},${g},${b})`;
            break;
          case 'OLED_Display':
            // Simple display simulation
            if (!shape.state) shape.state = { text: 'OLED READY' };
            if (inputValues[0]) shape.state.text = 'SIGNAL HIGH';
            else shape.state.text = 'SIGNAL LOW';
            break;
          case 'IC74147':
          case 'IC74148': {
            if (shape.type === 'IC74147') {
              // 10-line to 4-line Priority Encoder (Active Low)
              let highest = -1;
              for (let i = 8; i >= 0; i--) {
                if (!inputValues[i]) {
                  highest = i + 1;
                  break;
                }
              }
              const bcd = highest === -1 ? 0xF : (~highest & 0xF);
              for (let i = 0; i < 4; i++) {
                if (shape.outputs[i]) shape.outputs[i].value = (bcd >> i) & 1;
              }
            } else {
              // 74148: 8-line to 3-line Priority Encoder (Active Low)
              // Inputs: 0-7: I0-I7, 8: EI
              const ei = inputValues[8];
              if (ei) {
                // Disabled
                shape.outputs.forEach(o => o.value = 1);
              } else {
                let highest = -1;
                for (let i = 7; i >= 0; i--) {
                  if (!inputValues[i]) {
                    highest = i;
                    break;
                  }
                }
                if (highest === -1) {
                  // No input active
                  if (shape.outputs[0]) shape.outputs[0].value = 1; // A0
                  if (shape.outputs[1]) shape.outputs[1].value = 1; // A1
                  if (shape.outputs[2]) shape.outputs[2].value = 1; // A2
                  if (shape.outputs[3]) shape.outputs[3].value = 1; // GS
                  if (shape.outputs[4]) shape.outputs[4].value = 0; // EO
                } else {
                  // Input active
                  const bin = ~highest & 0x7;
                  if (shape.outputs[0]) shape.outputs[0].value = (bin >> 0) & 1;
                  if (shape.outputs[1]) shape.outputs[1].value = (bin >> 1) & 1;
                  if (shape.outputs[2]) shape.outputs[2].value = (bin >> 2) & 1;
                  if (shape.outputs[3]) shape.outputs[3].value = 0; // GS
                  if (shape.outputs[4]) shape.outputs[4].value = 1; // EO
                }
              }
            }
            break;
          }
          case 'FlowStart':
            if (shape.outputs[0]) shape.outputs[0].value = 1;
            break;
          case 'FlowProcess':
          case 'FlowInputOutput':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] ? 1 : 0;
            break;
          case 'FlowDecision':
            const trigger = inputValues[0] ? 1 : 0;
            if (shape.outputs[0]) shape.outputs[0].value = trigger; // YES
            if (shape.outputs[1]) shape.outputs[1].value = trigger ? 0 : 1; // NO
            break;
          case 'FlowEnd':
            break;
          case 'CustomBlock': {
            if (shape.subcircuit) {
              const { inputMapping, outputMapping, shapes: subShapes, connectors: subConnectors } = shape.subcircuit;
              
              // Use a fresh map for this iteration to avoid stale references
              const internalShapeMap = new Map<string, Shape>(subShapes.map(s => [s.id, s]));

              // Map external block inputs to internal subcircuit components
              if (inputMapping) {
                inputMapping.forEach((mapping, idx) => {
                  const internalShape = internalShapeMap.get(mapping.internalShapeId);
                  if (internalShape && shape.inputs[idx]) {
                    const val = shape.inputs[idx].value;
                    if (mapping.type === 'input') {
                      if (internalShape.inputs?.[mapping.index]) {
                        internalShape.inputs[mapping.index].value = val;
                      }
                    } else if (mapping.type === 'output') {
                      if (internalShape.outputs?.[mapping.index]) {
                        internalShape.outputs[mapping.index].value = val;
                      }
                    }
                    
                    // Sync visual states for internal input controls (visual feedback inside the block)
                    if (internalShape.type === 'PushButton') internalShape.isPressed = val === 1;
                    if (internalShape.type === 'ToggleSwitch') internalShape.state = val === 1;
                    if (internalShape.type === 'InputL' || internalShape.type === 'ToggleSwitch' || internalShape.type === 'PushButton') {
                      internalShape.color = val === 1 ? '#22c55e' : '#ef4444';
                    }
                  }
                });
              }

              // Evaluate the subcircuit (recursion happens here)
              const internalShapes = evaluateCircuit(subShapes, subConnectors, depth + 1);
              shape.subcircuit.shapes = internalShapes;
              
              // Map stabilized internal component states back to external block outputs
              if (outputMapping) {
                const updatedInternalShapeMap = new Map<string, Shape>(internalShapes.map(s => [s.id, s]));
                outputMapping.forEach((mapping, idx) => {
                  const internalShape = updatedInternalShapeMap.get(mapping.internalShapeId);
                  if (internalShape && shape.outputs?.[idx]) {
                    const val = mapping.type === 'input' 
                      ? (internalShape.inputs?.[mapping.index]?.value ?? 0)
                      : (internalShape.outputs?.[mapping.index]?.value ?? 0);
                    
                    shape.outputs[idx].value = val;

                    // Sync visual states for internal output controls
                    if (internalShape.type === 'OutPutL') {
                      internalShape.color = val === 1 ? (internalShape.onColor || '#22c55e') : (internalShape.offColor || '#3b82f6');
                    }
                  }
                });
              }
            }
            break;
          }
          case 'IC7485': {
            // 4-bit Magnitude Comparator
            // A: in0-3, B: in4-7, Cascading: in8-10
            const a = (inputValues[0] ? 1 : 0) | (inputValues[1] ? 2 : 0) | (inputValues[2] ? 4 : 0) | (inputValues[3] ? 8 : 0);
            const b = (inputValues[4] ? 1 : 0) | (inputValues[5] ? 2 : 0) | (inputValues[6] ? 4 : 0) | (inputValues[7] ? 8 : 0);
            let altb = a < b ? 1 : 0;
            let aeqb = a === b ? 1 : 0;
            let agtb = a > b ? 1 : 0;
            if (shape.outputs[0]) shape.outputs[0].value = altb;
            if (shape.outputs[1]) shape.outputs[1].value = aeqb;
            if (shape.outputs[2]) shape.outputs[2].value = agtb;
            break;
          }
          case 'IC74181': {
            // 4-bit ALU (74181)
            // Inputs: 0-3: A, 4-7: B, 8-11: S (Select), 12: M (Mode), 13: Cn (Carry in)
            const a = (inputValues[0] ? 1 : 0) | (inputValues[1] ? 2 : 0) | (inputValues[2] ? 4 : 0) | (inputValues[3] ? 8 : 0);
            const b = (inputValues[4] ? 1 : 0) | (inputValues[5] ? 2 : 0) | (inputValues[6] ? 4 : 0) | (inputValues[7] ? 8 : 0);
            const s = (inputValues[8] ? 1 : 0) | (inputValues[9] ? 2 : 0) | (inputValues[10] ? 4 : 0) | (inputValues[11] ? 8 : 0);
            const m = inputValues[12] ? 1 : 0; // 1 for Logic, 0 for Arithmetic
            const cn = inputValues[13] ? 1 : 0; // Active low carry in (0 = carry present)
            
            let f = 0;
            let cout = 1; // Active low carry out (1 = no carry)

            if (m) {
              // Logic Mode (M=1)
              switch (s) {
                case 0: f = ~a; break;
                case 1: f = ~(a | b); break;
                case 2: f = (~a) & b; break;
                case 3: f = 0; break;
                case 4: f = ~(a & b); break;
                case 5: f = ~b; break;
                case 6: f = a ^ b; break;
                case 7: f = a & (~b); break;
                case 8: f = (~a) | b; break;
                case 9: f = ~(a ^ b); break;
                case 10: f = b; break;
                case 11: f = a & b; break;
                case 12: f = 15; break;
                case 13: f = a | (~b); break;
                case 14: f = a | b; break;
                case 15: f = a; break;
              }
            } else {
              // Arithmetic Mode (M=0)
              const cin = cn ? 0 : 1;
              let res = 0;
              switch (s) {
                case 0: res = a + cin; break;
                case 9: res = a + b + cin; break;
                case 6: res = a - b - 1 + cin; break;
                case 15: res = a - 1 + cin; break;
                default: res = a + cin; // Default fallback
              }
              f = res & 0xF;
              cout = (res > 15 || res < 0) ? 0 : 1;
            }
            
            f = f & 0xF;
            for (let i = 0; i < 4; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = (f >> i) & 1;
            }
            if (shape.outputs[4]) shape.outputs[4].value = (a === b) ? 1 : 0; // A=B
            if (shape.outputs[5]) shape.outputs[5].value = cout; // Cn+4
            break;
          }
          case 'IC4013': {
            // Dual D Flip-Flop
            const d = inputValues[0];
            const clk = inputValues[1];
            const prevClk = shape.prevInputs?.[1] === 1;
            if (!shape.state) shape.state = { q: 0 };
            if (clk && !prevClk) {
              shape.state.q = d ? 1 : 0;
            }
            if (shape.outputs[0]) shape.outputs[0].value = shape.state.q;
            if (shape.outputs[1]) shape.outputs[1].value = shape.state.q ? 0 : 1;
            break;
          }
          case 'IC74107': {
            // Dual JK Flip-Flop with Clear, Negative-Edge Triggered
            if (!shape.state) shape.state = { q1: 0, q2: 0 };
            
            const j1 = inputValues[0];
            const k1 = inputValues[1];
            const clk1 = inputValues[2];
            const clr1 = inputValues[3];
            
            const j2 = inputValues[4];
            const k2 = inputValues[5];
            const clk2 = inputValues[6];
            const clr2 = inputValues[7];
            
            const prevClk1 = shape.prevInputs?.[2] === 1;
            const prevClk2 = shape.prevInputs?.[6] === 1;
            
            // Unit 1
            if (clr1 === 0) {
              shape.state.q1 = 0;
            } else if (prevClk1 && !clk1) { // Falling edge
              if (j1 && !k1) shape.state.q1 = 1;
              else if (!j1 && k1) shape.state.q1 = 0;
              else if (j1 && k1) shape.state.q1 = shape.state.q1 ? 0 : 1;
            }
            
            // Unit 2
            if (clr2 === 0) {
              shape.state.q2 = 0;
            } else if (prevClk2 && !clk2) { // Falling edge
              if (j2 && !k2) shape.state.q2 = 1;
              else if (!j2 && k2) shape.state.q2 = 0;
              else if (j2 && k2) shape.state.q2 = shape.state.q2 ? 0 : 1;
            }
            
            if (shape.outputs[0]) shape.outputs[0].value = shape.state.q1;
            if (shape.outputs[1]) shape.outputs[1].value = shape.state.q1 ? 0 : 1;
            if (shape.outputs[2]) shape.outputs[2].value = shape.state.q2;
            if (shape.outputs[3]) shape.outputs[3].value = shape.state.q2 ? 0 : 1;
            break;
          }
          case 'IC4066': {
            // Quad Bilateral Switch
            const sig = inputValues[0];
            const ctrl = inputValues[1];
            if (shape.outputs[0]) shape.outputs[0].value = ctrl ? (sig ? 1 : 0) : 0;
            break;
          }
          case 'LGT8F328P':
          case 'ATmega16U2':
          case 'ATmega16':
          case 'ATtiny85':
          case 'PIC18F2520':
          case 'ESP32':
          case 'RP2040': {
            // Generic MCU simulation: simple pass-through for now or custom logic
            inputValues.forEach((val, i) => {
              if (shape.outputs[i]) shape.outputs[i].value = val ? 1 : 0;
            });
            break;
          }
          case 'ATmega328P': {
            const reset = inputValues[0];
            const vcc = inputValues[1];
            if (!shape.state) shape.state = { count: 0 };
            
            if (!vcc) {
              shape.outputs.forEach(o => o.value = 0);
            } else if (!reset) {
              shape.state.count = 0;
              shape.outputs.forEach(o => o.value = 0);
            } else {
              // Simple counter logic for demonstration
              shape.state.count = (shape.state.count + 1) % 256;
              for (let i = 0; i < 8; i++) {
                if (shape.outputs[i]) {
                  shape.outputs[i].value = (shape.state.count >> i) & 1;
                }
              }
            }
            break;
          }
          case 'IC4001': // NOR
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] || inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[2] || inputValues[3]) ? 1 : 0;
            break;
          case 'IC4011': // NAND
            if (shape.outputs[0]) shape.outputs[0].value = !(inputValues[0] && inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = !(inputValues[2] && inputValues[3]) ? 1 : 0;
            break;
          case 'IC4071': // OR
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] || inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (inputValues[2] || inputValues[3]) ? 1 : 0;
            break;
          case 'IC4081': // AND
            if (shape.outputs[0]) shape.outputs[0].value = (inputValues[0] && inputValues[1]) ? 1 : 0;
            if (shape.outputs[1]) shape.outputs[1].value = (inputValues[2] && inputValues[3]) ? 1 : 0;
            break;
          case 'IC4069': // NOT
            for (let i = 0; i < 6; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = !inputValues[i] ? 1 : 0;
            }
            break;
          case 'LM386':
            // Audio Amp: Simple buffer
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] ? 1 : 0;
            break;
          case 'ICMAX7219': {
            // MAX7219 Serial Driver
            // Inputs: 0:DIN, 1:CLK, 2:LOAD, 3:VCC, 4:GND, 5:ISET
            // For now, simple pass-through to DOUT and basic state
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0]; // DOUT = DIN
            // Placeholder for DIG/SEG outputs
            for (let i = 1; i < shape.outputs.length; i++) {
              if (shape.outputs[i]) shape.outputs[i].value = 0;
            }
            break;
          }
          case 'DisplayBCD': {
            const bcdStr = [inputValues[3], inputValues[2], inputValues[1], inputValues[0]].map(v => v ? '1' : '0').join('');
            const segments = bcdToSegments(bcdStr);
            if (!shape.state) shape.state = {};
            shape.state.segments = segments;
            break;
          }
          case 'Battery':
          case 'VCC':
            if (shape.outputs[0]) shape.outputs[0].value = 1;
            if (shape.type === 'Battery' && shape.outputs[1]) shape.outputs[1].value = 0;
            break;
          case 'DC_Voltage_Source':
          case 'Battery':
          case 'VCC':
            if (shape.outputs[0]) shape.outputs[0].value = shape.voltage || 5;
            if (shape.type === 'Battery' && shape.outputs[1]) shape.outputs[1].value = 0;
            break;
          case 'AC_Voltage_Source': {
            const now = Date.now();
            const freq = shape.frequency || 1;
            const amp = shape.voltage || 5;
            const phase = shape.phase || 0;
            const offset = shape.offset || 0;
            const newValue = offset + amp * Math.sin(now / 1000 * 2 * Math.PI * freq + (phase * Math.PI / 180));
            if (shape.outputs[0]) shape.outputs[0].value = newValue;
            break;
          }
          case 'Step_Voltage_Source': {
            const now = Date.now();
            const freq = shape.frequency || 1;
            const amp = shape.voltage || 5;
            const duty = (shape.dutyCycle || 50) / 100;
            const offset = shape.offset || 0;
            const period = 1 / freq;
            const t = (now / 1000) % period;
            const newValue = offset + (t < period * duty ? amp : 0);
            if (shape.outputs[0]) shape.outputs[0].value = newValue;
            break;
          }
          case 'GND':
            if (shape.outputs[0]) shape.outputs[0].value = 0;
            break;
          case 'Resistor':
          case 'Capacitor':
          case 'Inductor':
          case 'Diode':
          case 'LED': {
            // Pass-through + update state
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0];
            if (!shape.state) shape.state = {};
            shape.state.isOn = inputValues[0] > 0.5;
            break;
          }
          case 'Fuse':
          case 'Coil':
          case 'Transformer':
            // Pass-through
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0];
            if (shape.type === 'Transformer' && shape.outputs[1]) shape.outputs[1].value = inputValues[1];
            break;
          case 'Regulator':
            // Simple regulator: output fixed voltage if input is higher
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] > 7 ? 5 : 0;
            break;
          case 'Transistor_NPN':
          case 'MOSFET_N':
          case 'JFET_N': {
            const gate = inputValues[0];
            const drain = inputValues[1];
            const threshold = shape.type === 'Transistor_NPN' ? 0.7 : 2.0;
            if (shape.outputs[1]) shape.outputs[1].value = gate > threshold ? drain : 0;
            break;
          }
          case 'Transistor_PNP':
          case 'MOSFET_P':
          case 'JFET_P': {
            const gate = inputValues[0];
            const drain = inputValues[1];
            const threshold = shape.type === 'Transistor_PNP' ? 0.7 : 2.0;
            if (shape.outputs[1]) shape.outputs[1].value = gate < threshold ? drain : 0;
            break;
          }
          case 'Potentiometer': {
            const v1 = inputValues[0];
            const v2 = inputValues[1];
            const ratio = (shape.resistance || 50) / 100; // Using resistance as % for now
            if (shape.outputs[0]) shape.outputs[0].value = v1 + (v2 - v1) * ratio;
            break;
          }
          case 'Relay':
          case 'Relay_SPDT':
          case 'Relay_DPDT': {
            const coil = Math.abs(inputValues[0] - inputValues[1]) > 3; // 3V threshold for relay
            if (shape.type === 'Relay') {
              const com = inputValues[2];
              if (shape.outputs[0]) shape.outputs[0].value = coil ? com : 0;
              if (shape.outputs[1]) shape.outputs[1].value = !coil ? com : 0;
            } else if (shape.type === 'Relay_SPDT') {
              const com = inputValues[2];
              if (shape.outputs[1]) shape.outputs[1].value = !coil ? com : 0; // NC
              if (shape.outputs[2]) shape.outputs[2].value = coil ? com : 0; // NO
            } else if (shape.type === 'Relay_DPDT') {
              const com1 = inputValues[2];
              const com2 = inputValues[5];
              if (shape.outputs[1]) shape.outputs[1].value = !coil ? com1 : 0; // NC1
              if (shape.outputs[2]) shape.outputs[2].value = coil ? com1 : 0; // NO1
              if (shape.outputs[4]) shape.outputs[4].value = !coil ? com2 : 0; // NC2
              if (shape.outputs[5]) shape.outputs[5].value = coil ? com2 : 0; // NO2
            }
            break;
          }
          case 'Switch_SPST':
            if (shape.outputs[0]) shape.outputs[0].value = shape.state ? inputValues[0] : 0;
            break;
          case 'Switch_SPDT':
            if (shape.outputs[0]) shape.outputs[0].value = !shape.state ? inputValues[0] : 0;
            if (shape.outputs[1]) shape.outputs[1].value = shape.state ? inputValues[0] : 0;
            break;
          case 'OpAmp': {
            const pos = inputValues[0];
            const neg = inputValues[1];
            const vcc = inputValues[2] || 15;
            const vee = inputValues[3] || -15;
            const gain = 100000; // Open loop gain
            let out = (pos - neg) * gain;
            out = Math.min(Math.max(out, vee), vcc);
            if (shape.outputs[0]) shape.outputs[0].value = out;
            break;
          }
          case 'LB1':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] * (shape.gain || 1);
            break;
          case 'SUM1':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] - inputValues[1];
            break;
          case 'SUM2':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] + inputValues[1];
            break;
          case 'MUL1':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0] * inputValues[1];
            break;
          case 'Bridge_Rectifier': {
            const ac1 = inputValues[0];
            const ac2 = inputValues[1];
            const diff = Math.abs(ac1 - ac2);
            if (shape.outputs[0]) shape.outputs[0].value = diff; // +
            if (shape.outputs[1]) shape.outputs[1].value = 0; // -
            break;
          }
          case 'Darlington_NPN': {
            const gate = inputValues[0];
            const drain = inputValues[1];
            if (shape.outputs[1]) shape.outputs[1].value = gate > 1.2 ? drain : 0;
            break;
          }
          case 'Darlington_PNP': {
            const gate = inputValues[0];
            const drain = inputValues[1];
            if (shape.outputs[1]) shape.outputs[1].value = gate < 1.2 ? drain : 0;
            break;
          }
          case 'SCR': {
            const anode = inputValues[0];
            const gate = inputValues[1];
            let isOn = shape.state?.isOn || false;
            if (gate > 0.7) isOn = true;
            if (anode < 0.1) isOn = false;
            if (!shape.state) shape.state = {};
            shape.state.isOn = isOn;
            if (shape.outputs[0]) shape.outputs[0].value = isOn ? anode : 0;
            break;
          }
          case 'DIAC': {
            const v = inputValues[0];
            let isOn = shape.state?.isOn || false;
            if (Math.abs(v) > 30) isOn = true;
            if (Math.abs(v) < 5) isOn = false;
            if (!shape.state) shape.state = {};
            shape.state.isOn = isOn;
            if (shape.outputs[0]) shape.outputs[0].value = isOn ? v : 0;
            break;
          }
          case 'TRIAC': {
            const mt1 = inputValues[0];
            const gate = inputValues[1];
            let isOn = shape.state?.isOn || false;
            if (Math.abs(gate) > 0.7) isOn = true;
            if (Math.abs(mt1) < 0.1) isOn = false;
            if (!shape.state) shape.state = {};
            shape.state.isOn = isOn;
            if (shape.outputs[0]) shape.outputs[0].value = isOn ? mt1 : 0;
            break;
          }
          case 'PWM_Block': {
            const now = Date.now();
            const period = 1000; // 1s
            const duty = (shape.dutyCycle || 50) / 100;
            const t = now % period;
            if (shape.outputs[0]) shape.outputs[0].value = t < period * duty ? 5 : 0;
            break;
          }
          case 'Variable_Capacitor':
          case 'Polarized_Capacitor':
          case 'Crystal':
          case 'Speaker':
          case 'Antenna':
          case 'Lamp':
          case 'Microphone':
          case 'LDR':
            if (shape.outputs[0]) shape.outputs[0].value = inputValues[0];
            break;
          case 'VCCS':
          case 'VCVS':
          case 'CCCS':
          case 'CCVS': {
            const ctrl = inputValues[0] - inputValues[1];
            const gain = shape.gain || 1;
            if (shape.outputs[0]) shape.outputs[0].value = ctrl * gain;
            break;
          }
        }
        // Update prevInputs for next iteration/frame to prevent multiple triggers
        shape.prevInputs = inputValues;
      });
    }

    return updatedShapes;
  }, [connectors, bcdToSegments]);

  // Run simulation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev => evaluateCircuit(prev));
    }, 50); // Faster interval for smoother simulation and higher clock support
    return () => clearInterval(interval);
  }, [evaluateCircuit]);

  const generateTruthTable = () => {
    const INPUT_TYPES: ShapeType[] = ['InputL', 'ToggleSwitch', 'PushButton', 'InputControl', 'HighConstant', 'LowConstant'];
    const OUTPUT_TYPES: ShapeType[] = ['OutPutL', 'Display', 'DisplayBCD', 'Display7Segment', 'Display8Segment', 'Display9Segment', 'Display14Segment', 'Display16Segment', 'Buzzer', 'Motor', 'LED'];

    const inputPins: { shapeId: string; pinIndex: number; label: string }[] = [];
    shapes.forEach(s => {
      if (INPUT_TYPES.includes(s.type)) {
        s.outputs.forEach((p, i) => {
          inputPins.push({
            shapeId: s.id,
            pinIndex: i,
            label: s.outputs.length > 1 ? `${s.label} (${p.label || i})` : s.label
          });
        });
      }
    });

    const outputPins: { shapeId: string; pinIndex: number; label: string }[] = [];
    shapes.forEach(s => {
      if (OUTPUT_TYPES.includes(s.type)) {
        s.inputs.forEach((p, i) => {
          outputPins.push({
            shapeId: s.id,
            pinIndex: i,
            label: s.inputs.length > 1 ? `${s.label} (${p.label || i})` : s.label
          });
        });
      }
    });

    if (inputPins.length === 0 || outputPins.length === 0) {
      alert('Circuit must have at least one Logic Input (Input, Toggle, etc.) and one Logic Output (LED, Display, etc.).');
      return;
    }

    if (inputPins.length > 8) {
      alert('Too many inputs for truth table generation (max 8).');
      return;
    }

    const numCombinations = Math.pow(2, inputPins.length);
    const rows: number[][] = [];

    for (let i = 0; i < numCombinations; i++) {
      const combination = i.toString(2).padStart(inputPins.length, '0').split('').map(Number);
      
      // Setup test state
      let testShapes = shapes.map(s => ({ 
        ...s, 
        inputs: (s.inputs || []).map(in_ => ({ ...in_ })), 
        outputs: (s.outputs || []).map(o => ({ ...o })),
        prevInputs: (s.inputs || []).map(in_ => in_.value) 
      }));

      inputPins.forEach((pin, idx) => {
        const shapeIdx = testShapes.findIndex(s => s.id === pin.shapeId);
        if (shapeIdx !== -1 && testShapes[shapeIdx].outputs?.[pin.pinIndex]) {
          testShapes[shapeIdx].outputs[pin.pinIndex].value = combination[idx];
        }
      });

      // Run simulation on test state
      testShapes = evaluateCircuit(testShapes);

      // Collect results
      const results = outputPins.map(pin => {
        const shape = testShapes.find(s => s.id === pin.shapeId);
        const val = shape?.inputs?.[pin.pinIndex]?.value;
        return val === 1 || val === '1' || (typeof val === 'number' && val > 0.5) ? 1 : 0;
      });

      rows.push([...combination, ...results]);
    }

    setTruthTableData({
      inputs: inputPins.map(p => p.label),
      outputs: outputPins.map(p => p.label),
      rows
    });
    setIsTruthTableOpen(true);
  };

  const exportTruthTableToCanvas = () => {
    if (!truthTableData.rows.length) return;

    const startX = 200;
    const startY = 200;
    const cellWidth = 80;
    const cellHeight = 30;
    
    const newLabels: Shape[] = [];
    
    // Headers
    const headers = [...truthTableData.inputs, ...truthTableData.outputs];
    headers.forEach((header, i) => {
      newLabels.push({
        ...createShape('Text', startX + i * cellWidth, startY),
        label: header,
        color: i < truthTableData.inputs.length ? '#eab308' : '#22c55e', // yellow for inputs, green for outputs
        width: cellWidth,
        height: cellHeight,
        font: 'bold 12px Mono'
      });
    });

    // Rows
    truthTableData.rows.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        newLabels.push({
          ...createShape('Text', startX + colIndex * cellWidth, startY + (rowIndex + 1) * cellHeight),
          label: val.toString(),
          color: '#ffffff',
          width: cellWidth,
          height: cellHeight,
          font: '12px Mono'
        });
      });
    });

    setShapes(prev => [...prev, ...newLabels]);
    setIsTruthTableOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, type: ShapeType) => {
    e.dataTransfer.setData('shapeType', type);
  };

  const handleAddItem = (type: ShapeType, blockId?: string) => {
    let x = 400;
    let y = 300;
    let overlapping = true;
    const offset = 30;

    while (overlapping) {
      overlapping = shapes.some(s => Math.abs(s.x - x) < 20 && Math.abs(s.y - y) < 20);
      if (overlapping) {
        x += offset;
        y += offset;
      }
    }

    let newShape: Shape;
    if (type === 'CustomBlock' && blockId) {
      const template = customBlocks.find(b => b.id === blockId) || libraryBlocks.find(b => b.id === blockId);
      if (template) {
        newShape = {
          ...JSON.parse(JSON.stringify(template)),
          id: Math.random().toString(36).substr(2, 9),
          x,
          y,
          isSelected: false
        };
      } else {
        newShape = createShape(type, x, y);
      }
    } else {
      newShape = createShape(type, x, y);
    }
    setShapes(prev => [...prev, newShape]);
  };

  const handleLoadExample = (name: string) => {
    const example = EXAMPLES[name];
    if (example) {
      const initializeShape = (s: Shape): Shape => {
        const template = createShape(s.type, s.x, s.y);
        const initialized: Shape = {
          ...template,
          ...s,
          inputs: (s.inputs && s.inputs.length > 0) ? s.inputs.map(i => ({ ...i })) : template.inputs,
          outputs: (s.outputs && s.outputs.length > 0) ? s.outputs.map(o => ({ ...o })) : template.outputs,
        };

        if (initialized.subcircuit && initialized.subcircuit.shapes) {
          initialized.subcircuit.shapes = initialized.subcircuit.shapes.map(initializeShape);
        }

        return initialized;
      };

      const initializedShapes = example.shapes.map(initializeShape);
      setShapes(initializedShapes);
      setConnectors(example.connectors.map(c => ({ ...c })));
      setFileName(example.fileName);
    }
  };

  const handleClearConnections = () => {
    const selectedIds = new Set(shapes.filter(s => s.isSelected).map(s => s.id));
    if (selectedIds.size === 0) return;
    
    setConnectors(prev => prev.filter(c => 
      !selectedIds.has(c.startShapeId) && !selectedIds.has(c.endShapeId)
    ));

    // Reset component states (values and internal state)
    setShapes(prev => prev.map(s => {
      if (selectedIds.has(s.id)) {
        return {
          ...s,
          inputs: s.inputs.map(i => ({ ...i, value: 0 })),
          outputs: s.outputs.map(o => ({ ...o, value: 0 })),
          state: {} // Reset internal state
        };
      }
      return s;
    }));
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'new':
        setShapes([]);
        setConnectors([]);
        setFileName('Untitled Circuit');
        setSelectedShape(null);
        setSelectedConnector(null);
        break;
      case 'ai-generate':
        handleAIGenerate();
        break;
      case 'save':
        const data: CircuitData = { fileName, shapes, connectors };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.json`;
        a.click();
        break;
      case 'load':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (re) => {
            const loadedData = JSON.parse(re.target?.result as string) as CircuitData;
            setShapes(loadedData.shapes);
            setConnectors(loadedData.connectors);
            setFileName(loadedData.fileName);
          };
          reader.readAsText(file);
        };
        input.click();
        break;
      case 'copy': {
        const selectedShapes = shapes.filter(s => s.isSelected);
        const selectedIds = new Set(selectedShapes.map(s => s.id));
        
        // Include connectors that are explicitly selected OR connect two selected shapes
        const connectorsToCopy = connectors.filter(c => 
          c.isSelected || (selectedIds.has(c.startShapeId) && selectedIds.has(c.endShapeId))
        );
        
        if (selectedShapes.length > 0) {
          setClipboard({
            fileName: 'Clipboard',
            // Use JSON stringify/parse for a deep copy of properties and nested arrays
            shapes: selectedShapes.map(s => JSON.parse(JSON.stringify(s))),
            connectors: connectorsToCopy.map(c => ({ ...c }))
          });
        } else if (selectedShape) {
          setClipboard({
            fileName: 'Clipboard',
            shapes: [JSON.parse(JSON.stringify(selectedShape))],
            connectors: []
          });
        }
        break;
      }
      case 'paste': {
        if (clipboard && clipboard.shapes.length > 0) {
          const idMap: Record<string, string> = {};
          const newShapes = clipboard.shapes.map(s => {
            const newId = Math.random().toString(36).substr(2, 9);
            idMap[s.id] = newId;
            return {
              ...s,
              id: newId,
              x: s.x + 40,
              y: s.y + 40,
              isSelected: true,
              isRunning: false,
              intervalId: null,
              history: s.history ? [] : undefined
            };
          });

          const newConnectors = clipboard.connectors
            .filter(c => idMap[c.startShapeId] && idMap[c.endShapeId])
            .map(c => ({
              ...c,
              id: Math.random().toString(36).substr(2, 9),
              startShapeId: idMap[c.startShapeId],
              endShapeId: idMap[c.endShapeId],
              isSelected: true
            }));

          // Deselect current
          const deselectedShapes = shapes.map(s => ({ ...s, isSelected: false }));
          const deselectedConnectors = connectors.map(c => ({ ...c, isSelected: false }));

          setShapes([...deselectedShapes, ...newShapes]);
          setConnectors([...deselectedConnectors, ...newConnectors]);
        }
        break;
      }
      case 'cut': {
        const selectedShapes = shapes.filter(s => s.isSelected);
        const selectedIds = new Set(selectedShapes.map(s => s.id));
        
        // Include connectors that are explicitly selected OR connect two selected shapes
        const connectorsToCopy = connectors.filter(c => 
          c.isSelected || (selectedIds.has(c.startShapeId) && selectedIds.has(c.endShapeId))
        );

        if (selectedShapes.length > 0) {
          setClipboard({
            fileName: 'Clipboard',
            shapes: selectedShapes.map(s => JSON.parse(JSON.stringify(s))),
            connectors: connectorsToCopy.map(c => ({ ...c }))
          });
          setShapes(shapes.filter(s => !selectedIds.has(s.id)));
          setConnectors(connectors.filter(c => !connectorsToCopy.some(cc => cc.id === c.id) && !selectedIds.has(c.startShapeId) && !selectedIds.has(c.endShapeId)));
        } else if (selectedShape) {
          setClipboard({
            fileName: 'Clipboard',
            shapes: [JSON.parse(JSON.stringify(selectedShape))],
            connectors: []
          });
          setShapes(shapes.filter(s => s.id !== selectedShape.id));
          setConnectors(connectors.filter(c => c.startShapeId !== selectedShape.id && c.endShapeId !== selectedShape.id));
          setSelectedShape(null);
        }
        break;
      }
      case 'move-up':
        if (shapes.some(s => s.isSelected)) {
          setShapes(shapes.map(s => s.isSelected ? { ...s, y: (s.y || 0) - 10 } : s));
        } else if (selectedShape) {
          updateShape(selectedShape.id, { y: selectedShape.y - 10 });
        }
        break;
      case 'move-down':
        if (shapes.some(s => s.isSelected)) {
          setShapes(shapes.map(s => s.isSelected ? { ...s, y: (s.y || 0) + 10 } : s));
        } else if (selectedShape) {
          updateShape(selectedShape.id, { y: selectedShape.y + 10 });
        }
        break;
      case 'move-left':
        if (shapes.some(s => s.isSelected)) {
          setShapes(shapes.map(s => s.isSelected ? { ...s, x: (s.x || 0) - 10 } : s));
        } else if (selectedShape) {
          updateShape(selectedShape.id, { x: selectedShape.x - 10 });
        }
        break;
      case 'move-right':
        if (shapes.some(s => s.isSelected)) {
          setShapes(shapes.map(s => s.isSelected ? { ...s, x: (s.x || 0) + 10 } : s));
        } else if (selectedShape) {
          updateShape(selectedShape.id, { x: selectedShape.x + 10 });
        }
        break;
      case 'align-left':
      case 'align-right':
      case 'align-top':
      case 'align-bottom': {
        const selectedShapes = shapes.filter(s => s.isSelected);
        if (selectedShapes.length < 2) break;

        if (action === 'align-left') {
          const targetVal = Math.min(...selectedShapes.map(s => s.x));
          setShapes(shapes.map(s => s.isSelected ? { ...s, x: targetVal } : s));
        } else if (action === 'align-right') {
          const targetVal = Math.max(...selectedShapes.map(s => {
            const { width } = getShapeDimensions(s);
            return s.x + width;
          }));
          setShapes(shapes.map(s => {
            if (!s.isSelected) return s;
            const { width } = getShapeDimensions(s);
            return { ...s, x: targetVal - width };
          }));
        } else if (action === 'align-top') {
          const targetVal = Math.min(...selectedShapes.map(s => s.y));
          setShapes(shapes.map(s => s.isSelected ? { ...s, y: targetVal } : s));
        } else if (action === 'align-bottom') {
          const targetVal = Math.max(...selectedShapes.map(s => {
            const { height } = getShapeDimensions(s);
            return s.y + height;
          }));
          setShapes(shapes.map(s => {
            if (!s.isSelected) return s;
            const { height } = getShapeDimensions(s);
            return { ...s, y: targetVal - height };
          }));
        }
        break;
      }
      case 'truth-table':
        generateTruthTable();
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't move if typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
          handleAction('copy');
          return;
        }
        if (e.key === 'v') {
          handleAction('paste');
          return;
        }
        if (e.key === 'x') {
          handleAction('cut');
          return;
        }
        if (e.key === 'a') {
          e.preventDefault();
          setShapes(prev => prev.map(s => ({ ...s, isSelected: true })));
          setConnectors(prev => prev.map(c => ({ ...c, isSelected: true })));
          return;
        }
      }

      if (!selectedShape && !selectedConnector && !shapes.some(s => s.isSelected) && !connectors.some(c => c.isSelected)) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleAction('move-up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleAction('move-down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleAction('move-left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleAction('move-right');
          break;
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          if (shapes.some(s => s.isSelected) || connectors.some(c => c.isSelected)) {
            const selectedIds = new Set(shapes.filter(s => s.isSelected).map(s => s.id));
            setShapes(prev => prev.filter(s => !s.isSelected));
            setConnectors(prev => prev.filter(c => !c.isSelected && !selectedIds.has(c.startShapeId) && !selectedIds.has(c.endShapeId)));
          } else if (selectedShape) {
            setShapes(prev => prev.filter(s => s.id !== selectedShape.id));
            setConnectors(prev => prev.filter(c => c.startShapeId !== selectedShape.id && c.endShapeId !== selectedShape.id));
            setSelectedShape(null);
          } else if (selectedConnector) {
            setConnectors(prev => prev.filter(c => c.id !== selectedConnector.id));
            setSelectedConnector(null);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShape, shapes, connectors]);

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    try {
      const circuit = await generateRandomCircuit();
      setShapes(circuit.shapes);
      setConnectors(circuit.connectors);
      setFileName(circuit.fileName);
      setSelectedShape(null);
      setSelectedConnector(null);
    } catch (error) {
      console.error('Failed to generate AI circuit:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const deleteConnector = (id: string) => {
    setConnectors(prev => prev.filter(c => c.id !== id));
    setSelectedConnector(null);
  };

  const disconnectWire = (shapeId: string, type: 'input' | 'output', index: number) => {
    setConnectors(prev => prev.filter(c => {
      if (type === 'input') {
        return !(c.endShapeId === shapeId && c.endInputIndex === index);
      } else {
        return !(c.startShapeId === shapeId && c.startOutputIndex === index);
      }
    }));
  };

  const updateShape = (id: string, updates: Partial<Shape>) => {
    setShapes(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const getShapeDimensions = (shape: Shape) => {
    const scale = shape.scale || 1;
    let width = shape.width / 2;
    let height = shape.height / 2;

    if (shape.type.includes('Flip_Flop') || shape.type === 'D_Latch') {
      width = 50; height = 50;
    } else if (shape.type === 'PushButton' || shape.type === 'HighConstant' || shape.type === 'LowConstant') {
      width = 30; height = 30;
    } else if (shape.type === 'ToggleSwitch') {
      width = 40; height = 20;
    } else if (shape.type === 'VCC' || shape.type === 'GND') {
      width = 20; height = 20;
    } else if (shape.type === 'Battery' || shape.type === 'AC_Voltage_Source' || shape.type === 'DC_Voltage_Source' || shape.type.includes('Current_Source') || shape.type.includes('Voltage_Source')) {
      width = 40; height = 40;
    } else if (shape.type === 'Resistor' || shape.type === 'Capacitor' || shape.type === 'Inductor' || shape.type.includes('Diode') || shape.type === 'LED' || shape.type === 'Fuse' || shape.type === 'Coil') {
      width = 50; height = 25;
    } else if (shape.type === 'Transistor_NPN' || shape.type === 'Transistor_PNP' || shape.type.startsWith('MOSFET') || shape.type.startsWith('JFET')) {
      width = 40; height = 40;
    } else if (shape.type === 'Regulator' || shape.type === 'OpAmp' || shape.type.includes('Relay') || shape.type.includes('Source') || shape.type.length === 4 || shape.type === 'Comparator') {
      width = 60; height = 40;
    } else if (shape.type.startsWith('Switch_') || shape.type.startsWith('MUX_') || shape.type.includes('Adder') || shape.type.includes('Latch')) {
      width = 60; height = 40;
      if (shape.type === 'MUX_4to1') height = 80;
      if (shape.type === 'Adder_8bit') width = 120;
    } else if (shape.type === 'Voltmeter' || shape.type === 'Ammeter') {
      width = 40; height = 40;
    } else if (shape.type === 'Probe') {
      width = 30; height = 30;
    }

    return { width: width * scale, height: height * scale };
  };

  const handleConnectShapes = (startShapeId: string, startOutputIndex: number, endShapeId: string, endInputIndex: number) => {
    // Check if connection already exists
    const exists = connectors.some(c => 
      c.startShapeId === startShapeId && 
      c.startOutputIndex === startOutputIndex && 
      c.endShapeId === endShapeId && 
      c.endInputIndex === endInputIndex
    );

    if (!exists) {
      const newConnector: Connector = {
        id: Math.random().toString(36).substr(2, 9),
        startShapeId,
        startOutputIndex,
        endShapeId,
        endInputIndex
      };
      setConnectors(prev => [...prev, newConnector]);
    }
  };

  const createCustomBlock = () => {
    const selectedShapes = shapes.filter(s => s.isSelected);
    if (selectedShapes.length === 0) return;

    const selectedIds = new Set(selectedShapes.map(s => s.id));
    const selectedConnectors = connectors.filter(c => selectedIds.has(c.startShapeId) && selectedIds.has(c.endShapeId));

    // Identify inputs and outputs based on Input and Output Control types (including Displays as outputs)
    const internalInputControls = selectedShapes.filter(s => INPUT_CONTROL_TYPES.includes(s.type));
    const internalOutputControls = selectedShapes.filter(s => 
      OUTPUT_CONTROL_TYPES.includes(s.type) || s.type.toLowerCase().includes('display')
    );

    const blockType: ShapeType = 'CustomBlock';
    const block = createShape(blockType, 0, 0);
    block.label = newBlockName || 'Custom Block';
    
    const inputMapping: { internalShapeId: string; type: 'input' | 'output'; index: number }[] = [];
    const outputMapping: { internalShapeId: string; type: 'input' | 'output'; index: number }[] = [];

    // Configure external inputs
    const blockInputs: ConnectionPoint[] = [];
    internalInputControls.forEach((s) => {
      const baseLabel = s.label && s.label !== s.type ? s.label : s.type;
      
      // Input controls generally export their outputs as block inputs
      s.outputs.forEach((out, i) => {
        const pinLabel = out.label || (s.outputs.length > 1 ? `Out ${i}` : '');
        blockInputs.push({
          x: 0,
          y: 20 + blockInputs.length * 25,
          label: pinLabel ? `${baseLabel} ${pinLabel}` : baseLabel,
          value: 0,
          name: `in_${blockInputs.length}`
        });
        inputMapping.push({ internalShapeId: s.id, type: 'output', index: i });
      });
      // If they have inputs (like PassSwitch), export them too
      s.inputs.forEach((inp, i) => {
        const pinLabel = inp.label || (s.inputs.length > 1 ? `In ${i}` : '');
        blockInputs.push({
          x: 0,
          y: 20 + blockInputs.length * 25,
          label: pinLabel ? `${baseLabel} ${pinLabel}` : baseLabel,
          value: 0,
          name: `in_${blockInputs.length}`
        });
        inputMapping.push({ internalShapeId: s.id, type: 'input', index: i });
      });
    });

    // Configure external outputs
    const blockOutputs: ConnectionPoint[] = [];
    internalOutputControls.forEach((s) => {
      const baseLabel = s.label && s.label !== s.type ? s.label : s.type;

      if (s.outputs && s.outputs.length > 0) {
        // If it has outputs, export ONLY outputs
        s.outputs.forEach((out, i) => {
          const pinLabel = out.label || (s.outputs.length > 1 ? `Out ${i}` : '');
          blockOutputs.push({
            x: 120,
            y: 20 + blockOutputs.length * 25,
            label: pinLabel ? `${baseLabel} ${pinLabel}` : baseLabel,
            value: 0,
            name: `out_${blockOutputs.length}`
          });
          outputMapping.push({ internalShapeId: s.id, type: 'output', index: i });
        });
      } else {
        // Otherwise, export inputs as block outputs (to monitor their states)
        s.inputs.forEach((inp, i) => {
          const pinLabel = inp.label || (s.inputs.length > 1 ? `In ${i}` : '');
          blockOutputs.push({
            x: 120,
            y: 20 + blockOutputs.length * 25,
            label: pinLabel ? `${baseLabel} ${pinLabel}` : baseLabel,
            value: 0,
            name: `out_${blockOutputs.length}`
          });
          outputMapping.push({ internalShapeId: s.id, type: 'input', index: i });
        });
      }
    });

    block.inputs = blockInputs;
    block.outputs = blockOutputs;
    block.subcircuit = {
      shapes: JSON.parse(JSON.stringify(selectedShapes)),
      connectors: JSON.parse(JSON.stringify(selectedConnectors)),
      inputMapping,
      outputMapping
    };

    // Calculate width based on longest label
    const allLabels = [...blockInputs, ...blockOutputs].map(p => p.label || '');
    const maxLabelLen = Math.max(0, ...allLabels.map(l => l.length));
    block.width = Math.max(120, maxLabelLen * 8 + 60);
    block.height = Math.max(80, Math.max(blockInputs.length, blockOutputs.length) * 25 + 40);
    
    // Update output pin X positions if width changed
    block.outputs.forEach(p => p.x = block.width);

    setCustomBlocks(prev => [...prev, block]);
    setIsCreateBlockModalOpen(false);
    setNewBlockName('');
  };

  const switchPage = (pageId: string) => {
    // 1. Sync current state to the pages array before switching
    setPages(prev => prev.map(p => p.id === currentPageId ? { ...p, shapes, connectors } : p));
    
    // 2. Clear current selection
    setSelectedShape(null);
    setSelectedConnector(null);

    // 3. Find and load the new page
    const newPage = pages.find(p => p.id === pageId);
    if (newPage) {
      setCurrentPageId(pageId);
      setShapes(newPage.shapes);
      setConnectors(newPage.connectors);
    }
  };

  const addPage = (name?: string) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newPage: Page = {
      id: newId,
      name: name || `Página ${pages.length + 1}`,
      shapes: [],
      connectors: []
    };
    setPages(prev => {
      const updated = prev.map(p => p.id === currentPageId ? { ...p, shapes, connectors } : p);
      return [...updated, newPage];
    });
    
    // Switch to new page
    setCurrentPageId(newId);
    setShapes([]);
    setConnectors([]);
  };

  const deletePage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pages.length <= 1) return;
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (currentPageId === id) {
      const first = newPages[0];
      setCurrentPageId(first.id);
      setShapes(first.shapes);
      setConnectors(first.connectors);
    }
  };

  useEffect(() => {
    if (isCreateBlockModalOpen) {
      const selectedShapes = shapes.filter(s => s.isSelected);
      const selectedIds = new Set(selectedShapes.map(s => s.id));
      const warnings: string[] = [];

      selectedShapes.forEach(s => {
        if (s.type === 'Text' || s.type === 'Node_Label') return;

        const isInputControl = INPUT_CONTROL_TYPES.includes(s.type);
        const isOutputControl = OUTPUT_CONTROL_TYPES.includes(s.type) || s.type.toLowerCase().includes('display');

        if (isInputControl) {
          s.outputs.forEach((_, i) => {
            const isConnectedInside = connectors.some(c => 
              c.startShapeId === s.id && c.startOutputIndex === i && selectedIds.has(c.endShapeId)
            );
            if (!isConnectedInside) {
              warnings.push(`Input "${s.label || s.type}" not connected to internal components.`);
            }
          });
        } else if (isOutputControl) {
          s.inputs.forEach((_, i) => {
            const isConnectedInside = connectors.some(c => 
              c.endShapeId === s.id && c.endInputIndex === i && selectedIds.has(c.startShapeId)
            );
            if (!isConnectedInside) {
              warnings.push(`Output "${s.label || s.type}" not receiving signals from internal components.`);
            }
          });
        } else {
          s.inputs.forEach((_, i) => {
            const isConnected = connectors.some(c => c.endShapeId === s.id && c.endInputIndex === i && selectedIds.has(c.startShapeId));
            if (!isConnected) {
              warnings.push(`${s.label || s.type} pin In ${i + 1} is unconnected.`);
            }
          });
          s.outputs.forEach((_, i) => {
            const isConnected = connectors.some(c => c.startShapeId === s.id && c.startOutputIndex === i && selectedIds.has(c.endShapeId));
            if (!isConnected) {
              warnings.push(`${s.label || s.type} pin Out ${i + 1} is unconnected.`);
            }
          });
        }
      });
      setValidationWarnings(warnings);
    } else {
      setValidationWarnings([]);
    }
  }, [isCreateBlockModalOpen, shapes, connectors]);

  const explodeCustomBlock = (block: Shape) => {
    if (block.type !== 'CustomBlock' || !block.subcircuit) return;

    const { shapes: subShapes, connectors: subConnectors } = block.subcircuit;
    
    // Create a new page for the exploded content
    const newPageId = Math.random().toString(36).substr(2, 9);
    const newPage: Page = {
      id: newPageId,
      name: `Bloque: ${block.label}`,
      shapes: JSON.parse(JSON.stringify(subShapes)),
      connectors: JSON.parse(JSON.stringify(subConnectors))
    };

    setPages(prev => {
      const updated = prev.map(p => p.id === currentPageId ? { ...p, shapes, connectors } : p);
      return [...updated, newPage];
    });
    
    // Switch to new page
    setCurrentPageId(newPageId);
    setShapes(newPage.shapes);
    setConnectors(newPage.connectors);
    setSelectedShape(null);
  };

  const saveCustomBlockToLibrary = (block: Shape) => {
    if (block.type !== 'CustomBlock') return;
    // Check if it already exists by label
    const exists = customBlocks.some(cb => cb.label === block.label);
    if (!exists) {
      const template: Shape = {
        ...JSON.parse(JSON.stringify(block)),
        id: Math.random().toString(36).substr(2, 9),
        x: 0,
        y: 0,
        isSelected: false
      };
      setCustomBlocks(prev => [...prev, template]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-dk-darker-bg text-white font-sans">
      <Navbar 
        fileName={fileName} 
        onFileNameChange={setFileName} 
        onAction={handleAction} 
        isGeneratingAI={isGeneratingAI}
        magneticWiresEnabled={isMagneticWiresEnabled}
        onToggleMagneticWires={() => setIsMagneticWiresEnabled(!isMagneticWiresEnabled)}
        connectionCloningEnabled={isConnectionCloningEnabled}
        onToggleConnectionCloning={() => setIsConnectionCloningEnabled(!isConnectionCloningEnabled)}
        onClearConnections={handleClearConnections}
        statusVisible={isStatusVisible}
        onToggleStatus={() => setIsStatusVisible(!isStatusVisible)}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          onDragStart={handleDragStart} 
          onAddItem={handleAddItem}
          selectedShape={selectedShape}
          selectedConnector={selectedConnector}
          onUpdateShape={(updates) => selectedShape && updateShape(selectedShape.id, updates)}
          onDeleteConnector={deleteConnector}
          onDisconnectWire={disconnectWire}
          onLoadExample={handleLoadExample}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          wireStyle={wireStyle}
          onWireStyleChange={setWireStyle}
          gridStyle={gridStyle}
          onGridStyleChange={setGridStyle}
          gridColor={gridColor}
          onGridColorChange={setGridColor}
          shapes={shapes}
          connectors={connectors}
          onHighlightPin={setHighlightedPin}
          onHighlightConnector={setHighlightedConnectorId}
          onConnectShapes={handleConnectShapes}
          onAction={handleAction}
          customBlocks={customBlocks}
          onDeleteCustomBlock={(id) => setCustomBlocks(prev => prev.filter(b => b.id !== id))}
          onSaveCustomBlock={saveCustomBlockToLibrary}
          libraryBlocks={libraryBlocks}
        />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Create Block Button */}
          {shapes.filter(s => s.isSelected).length > 1 && (
            <button 
              onClick={() => setIsCreateBlockModalOpen(true)}
              className="absolute bottom-24 right-6 z-30 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-2xl font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 transition-all active:scale-95"
            >
              <PlusSquare className="w-5 h-5" /> Create Block
            </button>
          )}

          {/* Explode Block Button */}
          {selectedShape?.type === 'CustomBlock' && (
            <button 
              onClick={() => explodeCustomBlock(selectedShape)}
              className="absolute bottom-24 right-6 z-30 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-2xl font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 transition-all active:scale-95"
            >
              <Scissors className="w-5 h-5" /> Explode Block
            </button>
          )}
          {/* Mobile Sidebar Toggle */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-4 left-4 z-30 p-2 bg-dk-dark-bg/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl hover:bg-dk-dark-bg transition-all md:hidden"
            >
              <Cpu className="w-6 h-6 text-yellow-500" />
            </button>
          )}
          <CircuitCanvas 
            shapes={shapes}
            connectors={connectors}
            onShapesChange={setShapes}
            onConnectorsChange={setConnectors}
            onSelectShape={setSelectedShape}
            onSelectConnector={setSelectedConnector}
            zoom={zoom}
            wireStyle={wireStyle}
            gridStyle={gridStyle}
            gridColor={gridColor}
            highlightedPin={highlightedPin}
            onHighlightPin={setHighlightedPin}
            selectedShape={selectedShape}
            customBlocks={customBlocks}
            magneticWiresEnabled={isMagneticWiresEnabled}
            onDisableMagneticWires={() => setIsMagneticWiresEnabled(false)}
            connectionCloningEnabled={isConnectionCloningEnabled}
            onDisableConnectionCloning={() => setIsConnectionCloningEnabled(false)}
            highlightedConnectorId={highlightedConnectorId}
            statusVisible={isStatusVisible}
            libraryBlocks={libraryBlocks}
          />
          
          {/* Pages Tab Bar */}
          <div className="absolute bottom-6 left-6 z-30 flex items-center gap-1 bg-dk-dark-bg/80 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-2xl overflow-x-auto max-w-[calc(100%-350px)] no-scrollbar">
            {pages.map(page => (
              <div 
                key={page.id}
                onClick={() => switchPage(page.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all animate-in fade-in zoom-in-95 ${
                  currentPageId === page.id 
                    ? 'bg-yellow-500 text-dk-darker-bg font-bold shadow-lg' 
                    : 'hover:bg-white/5 text-white/50 border border-transparent'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${currentPageId === page.id ? 'text-dk-darker-bg' : 'text-white/20'}`} />
                <span className="text-[11px] whitespace-nowrap tracking-wide">{page.name}</span>
                {pages.length > 1 && (
                  <button 
                    onClick={(e) => deletePage(page.id, e)} 
                    className={`ml-1 p-0.5 rounded hover:bg-black/20 transition-all ${
                      currentPageId === page.id ? 'hover:text-red-600' : 'hover:text-red-400'
                    }`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={() => addPage()}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 transition-all ml-1 border border-dashed border-white/10 flex items-center gap-1 px-3"
              title="Nueva Página"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Nueva</span>
            </button>
          </div>
          
          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 bg-dk-dark-bg/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl z-20">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Zoom</span>
            <input 
              type="range" 
              min="25" 
              max="200" 
              value={zoom} 
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="w-32 accent-yellow-500"
            />
            <span className="text-xs font-mono w-10 text-right">{zoom}%</span>
          </div>
        </main>
      </div>

      <TruthTableModal 
        isOpen={isTruthTableOpen} 
        onClose={() => setIsTruthTableOpen(false)} 
        onExportToCanvas={exportTruthTableToCanvas}
        data={truthTableData} 
      />

      {/* Create Block Modal */}
      {isCreateBlockModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-dk-dark-bg border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlusSquare className="text-purple-500" /> Create Custom Block
            </h2>
            <p className="text-white/60 text-sm mb-6">
              This will group the selected components into a reusable block. 
              InputL and OutPutL components will become the block's pins.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Block Name</label>
                <input 
                  type="text" 
                  value={newBlockName}
                  onChange={(e) => setNewBlockName(e.target.value)}
                  placeholder="e.g., Half Adder"
                  className="w-full bg-dk-darker-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  autoFocus
                />
              </div>

              {validationWarnings.length > 0 && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm">
                    <Scissors className="w-4 h-4" /> 
                    <span>Logic Warnings ({validationWarnings.length})</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto text-xs text-white/60 space-y-1 pr-2 thin-scrollbar">
                    {validationWarnings.map((warning, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-orange-500/50">•</span>
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40 italic pt-1">
                    Unconnected components inside a block may not function as expected.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setIsCreateBlockModalOpen(false)}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={createCustomBlock}
                disabled={!newBlockName.trim()}
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors shadow-lg shadow-purple-900/20"
              >
                Create Block
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
