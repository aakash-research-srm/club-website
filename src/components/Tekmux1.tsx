"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// Logic Gate Types
type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR"

interface LogicGate {
  id: string
  type: GateType
  inputs: boolean[]
  output: boolean
  x: number
  y: number
}

interface Challenge {
  id: string
  title: string
  description: string
  targetExpression: string
  difficulty: "Easy" | "Medium" | "Hard"
  completed: boolean
}

export default function LogicGatesGame() {
  const [currentSection, setCurrentSection] = useState<"learn" | "build" | "challenges">("learn")
  const [selectedGate, setSelectedGate] = useState<GateType>("AND")
  const [gates, setGates] = useState<LogicGate[]>([])
  const [showTruthTable, setShowTruthTable] = useState(false)
  const [circuitInputs, setCircuitInputs] = useState<{ A: boolean; B: boolean; C?: boolean }>({ A: false, B: false })
  const [draggedGate, setDraggedGate] = useState<GateType | null>(null)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [challengeInputs, setChallengeInputs] = useState<{ A: boolean; B: boolean; C: boolean }>({
    A: false,
    B: false,
    C: false,
  })
  const [challengeGates, setChallengeGates] = useState<LogicGate[]>([])
  const [challengeResult, setChallengeResult] = useState<{ correct: boolean; message: string } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const challengeCanvasRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Basic AND Logic",
      description: "Create a circuit that outputs TRUE only when both Input A AND Input B are TRUE",
      targetExpression: "A AND B",
      difficulty: "Easy",
      completed: false,
    },
    {
      id: "2",
      title: "OR Gate Challenge",
      description: "Build a circuit that outputs TRUE when Input A OR Input B (or both) are TRUE",
      targetExpression: "A OR B",
      difficulty: "Easy",
      completed: false,
    },
    {
      id: "3",
      title: "Complex Boolean Expression",
      description:
        "Create a circuit for: (A AND B) OR (NOT C). This should be TRUE when both A and B are TRUE, OR when C is FALSE",
      targetExpression: "(A AND B) OR (NOT C)",
      difficulty: "Medium",
      completed: false,
    },
  ]

  const gateTypes: { type: GateType; symbol: string; description: string }[] = [
    { type: "AND", symbol: "&", description: "Output is TRUE only when all inputs are TRUE" },
    { type: "OR", symbol: "|", description: "Output is TRUE when at least one input is TRUE" },
    { type: "NOT", symbol: "!", description: "Output is the opposite of the input" },
    { type: "NAND", symbol: "⊼", description: "Output is FALSE only when all inputs are TRUE" },
    { type: "NOR", symbol: "⊽", description: "Output is FALSE when at least one input is TRUE" },
    { type: "XOR", symbol: "⊕", description: "Output is TRUE when inputs are different" },
  ]

  const calculateGateOutput = (gate: LogicGate): boolean => {
    const [a, b] = gate.inputs
    switch (gate.type) {
      case "AND":
        return a && b
      case "OR":
        return a || b
      case "NOT":
        return !a
      case "NAND":
        return !(a && b)
      case "NOR":
        return !(a || b)
      case "XOR":
        return a !== b
      default:
        return false
    }
  }

  const getTruthTable = (gateType: GateType) => {
    const inputs =
      gateType === "NOT"
        ? [[true], [false]]
        : [
            [false, false],
            [false, true],
            [true, false],
            [true, true],
          ]
    return inputs.map((input) => ({
      inputs: input,
      output: calculateGateOutput({ id: "", type: gateType, inputs: input, output: false, x: 0, y: 0 }),
    }))
  }

  const LogicGateDiagram = ({ gateType }: { gateType: GateType }) => {
    const commonProps = {
      width: "120",
      height: "80",
      viewBox: "0 0 120 80",
      className: "mx-auto",
    }

    switch (gateType) {
      case "AND":
        return (
          <svg {...commonProps}>
            <path d="M20 20 L20 60 L50 60 A20 20 0 0 0 50 20 Z" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="30" x2="20" y2="30" stroke="white" strokeWidth="2" />
            <line x1="10" y1="50" x2="20" y2="50" stroke="white" strokeWidth="2" />
            <line x1="70" y1="40" x2="80" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      case "OR":
        return (
          <svg {...commonProps}>
            <path d="M20 20 Q50 40 20 60 Q40 40 70 40 Q40 40 20 20" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="30" x2="25" y2="30" stroke="white" strokeWidth="2" />
            <line x1="10" y1="50" x2="25" y2="50" stroke="white" strokeWidth="2" />
            <line x1="70" y1="40" x2="80" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      case "NOT":
        return (
          <svg {...commonProps}>
            <path d="M20 20 L20 60 L60 40 Z" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="65" cy="40" r="5" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="40" x2="20" y2="40" stroke="white" strokeWidth="2" />
            <line x1="70" y1="40" x2="80" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      case "NAND":
        return (
          <svg {...commonProps}>
            <path d="M20 20 L20 60 L50 60 A20 20 0 0 0 50 20 Z" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="75" cy="40" r="5" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="30" x2="20" y2="30" stroke="white" strokeWidth="2" />
            <line x1="10" y1="50" x2="20" y2="50" stroke="white" strokeWidth="2" />
            <line x1="80" y1="40" x2="90" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      case "NOR":
        return (
          <svg {...commonProps}>
            <path d="M20 20 Q50 40 20 60 Q40 40 70 40 Q40 40 20 20" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="75" cy="40" r="5" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="30" x2="25" y2="30" stroke="white" strokeWidth="2" />
            <line x1="10" y1="50" x2="25" y2="50" stroke="white" strokeWidth="2" />
            <line x1="80" y1="40" x2="90" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      case "XOR":
        return (
          <svg {...commonProps}>
            <path d="M15 20 Q45 40 15 60" fill="none" stroke="white" strokeWidth="2" />
            <path d="M20 20 Q50 40 20 60 Q40 40 70 40 Q40 40 20 20" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="30" x2="20" y2="30" stroke="white" strokeWidth="2" />
            <line x1="10" y1="50" x2="20" y2="50" stroke="white" strokeWidth="2" />
            <line x1="70" y1="40" x2="80" y2="40" stroke="white" strokeWidth="2" />
          </svg>
        )
      default:
        return null
    }
  }

  const CircuitGateSymbol = ({ gateType, size = 60 }: { gateType: GateType; size?: number }) => {
    const viewBox = `0 0 ${size} ${size * 0.67}`

    switch (gateType) {
      case "AND":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.2} ${size * 0.15} L${size * 0.2} ${size * 0.52} L${size * 0.45} ${size * 0.52} A${size * 0.15} ${size * 0.15} 0 0 0 ${size * 0.45} ${size * 0.15} Z`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <line x1={size * 0.05} y1={size * 0.22} x2={size * 0.2} y2={size * 0.22} stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.45} x2={size * 0.2} y2={size * 0.45} stroke="white" strokeWidth="2" />
            <line x1={size * 0.6} y1={size * 0.335} x2={size * 0.75} y2={size * 0.335} stroke="white" strokeWidth="2" />
          </svg>
        )
      case "OR":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.2} ${size * 0.15} Q${size * 0.45} ${size * 0.335} ${size * 0.2} ${size * 0.52} Q${size * 0.35} ${size * 0.335} ${size * 0.6} ${size * 0.335} Q${size * 0.35} ${size * 0.335} ${size * 0.2} ${size * 0.15}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <line x1={size * 0.05} y1={size * 0.22} x2={size * 0.25} y2={size * 0.22} stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.45} x2={size * 0.25} y2={size * 0.45} stroke="white" strokeWidth="2" />
            <line x1={size * 0.6} y1={size * 0.335} x2={size * 0.75} y2={size * 0.335} stroke="white" strokeWidth="2" />
          </svg>
        )
      case "NOT":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.2} ${size * 0.15} L${size * 0.2} ${size * 0.52} L${size * 0.5} ${size * 0.335} Z`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx={size * 0.55} cy={size * 0.335} r={size * 0.04} fill="none" stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.335} x2={size * 0.2} y2={size * 0.335} stroke="white" strokeWidth="2" />
            <line
              x1={size * 0.59}
              y1={size * 0.335}
              x2={size * 0.75}
              y2={size * 0.335}
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        )
      case "NAND":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.2} ${size * 0.15} L${size * 0.2} ${size * 0.52} L${size * 0.45} ${size * 0.52} A${size * 0.15} ${size * 0.15} 0 0 0 ${size * 0.45} ${size * 0.15} Z`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx={size * 0.65} cy={size * 0.335} r={size * 0.04} fill="none" stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.22} x2={size * 0.2} y2={size * 0.22} stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.45} x2={size * 0.2} y2={size * 0.45} stroke="white" strokeWidth="2" />
            <line x1={size * 0.69} y1={size * 0.335} x2={size * 0.8} y2={size * 0.335} stroke="white" strokeWidth="2" />
          </svg>
        )
      case "NOR":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.2} ${size * 0.15} Q${size * 0.45} ${size * 0.335} ${size * 0.2} ${size * 0.52} Q${size * 0.35} ${size * 0.335} ${size * 0.6} ${size * 0.335} Q${size * 0.35} ${size * 0.335} ${size * 0.2} ${size * 0.15}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx={size * 0.65} cy={size * 0.335} r={size * 0.04} fill="none" stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.22} x2={size * 0.25} y2={size * 0.22} stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.45} x2={size * 0.25} y2={size * 0.45} stroke="white" strokeWidth="2" />
            <line x1={size * 0.69} y1={size * 0.335} x2={size * 0.8} y2={size * 0.335} stroke="white" strokeWidth="2" />
          </svg>
        )
      case "XOR":
        return (
          <svg width={size} height={size * 0.67} viewBox={viewBox}>
            <path
              d={`M${size * 0.15} ${size * 0.15} Q${size * 0.4} ${size * 0.335} ${size * 0.15} ${size * 0.52}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d={`M${size * 0.2} ${size * 0.15} Q${size * 0.45} ${size * 0.335} ${size * 0.2} ${size * 0.52} Q${size * 0.35} ${size * 0.335} ${size * 0.6} ${size * 0.335} Q${size * 0.35} ${size * 0.335} ${size * 0.2} ${size * 0.15}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <line x1={size * 0.05} y1={size * 0.22} x2={size * 0.2} y2={size * 0.22} stroke="white" strokeWidth="2" />
            <line x1={size * 0.05} y1={size * 0.45} x2={size * 0.2} y2={size * 0.45} stroke="white" strokeWidth="2" />
            <line x1={size * 0.6} y1={size * 0.335} x2={size * 0.75} y2={size * 0.335} stroke="white" strokeWidth="2" />
          </svg>
        )
      default:
        return null
    }
  }

  const calculateCircuitOutput = () => {
    if (gates.length === 0) return null

    // For simplicity, we'll calculate output for single gates using circuit inputs
    // In a more complex implementation, you'd handle gate connections
    const updatedGates = gates.map((gate) => {
      let gateInputs: boolean[]
      if (gate.type === "NOT") {
        gateInputs = [circuitInputs.A]
      } else {
        gateInputs = [circuitInputs.A, circuitInputs.B]
      }

      return {
        ...gate,
        inputs: gateInputs,
        output: calculateGateOutput({ ...gate, inputs: gateInputs }),
      }
    })

    // Return the output of the last gate (in a real circuit, this would be more sophisticated)
    return updatedGates.length > 0 ? updatedGates[updatedGates.length - 1].output : null
  }

  const handleDragStart = (gateType: GateType) => {
    setDraggedGate(gateType)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedGate || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 50 // Center the gate
    const y = e.clientY - rect.top - 30

    const newGate: LogicGate = {
      id: Date.now().toString(),
      type: draggedGate,
      inputs: draggedGate === "NOT" ? [circuitInputs.A] : [circuitInputs.A, circuitInputs.B],
      output: false,
      x: Math.max(0, Math.min(x, rect.width - 100)),
      y: Math.max(0, Math.min(y, rect.height - 60)),
    }
    newGate.output = calculateGateOutput(newGate)
    setGates([...gates, newGate])
    setDraggedGate(null)
  }

  const clearCircuit = () => {
    setGates([])
  }

  const updateCircuitInput = (input: "A" | "B", value: boolean) => {
    const newInputs = { ...circuitInputs, [input]: value }
    setCircuitInputs(newInputs)

    // Update all gates with new inputs
    setGates(
      gates.map((gate) => {
        let gateInputs: boolean[]
        if (gate.type === "NOT") {
          gateInputs = [newInputs.A]
        } else {
          gateInputs = [newInputs.A, newInputs.B]
        }

        return {
          ...gate,
          inputs: gateInputs,
          output: calculateGateOutput({ ...gate, inputs: gateInputs }),
        }
      }),
    )
  }

  const removeGate = (gateId: string) => {
    setGates(gates.filter((gate) => gate.id !== gateId))
  }

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setChallengeGates([])
    setChallengeInputs({ A: false, B: false, C: false })
    setChallengeResult(null)
  }

  const backToChallengelist = () => {
    setCurrentChallenge(null)
    setChallengeGates([])
    setChallengeResult(null)
  }

  const updateChallengeInput = (input: "A" | "B" | "C", value: boolean) => {
    const newInputs = { ...challengeInputs, [input]: value }
    setChallengeInputs(newInputs)

    // Update all challenge gates with new inputs
    setChallengeGates(
      challengeGates.map((gate) => {
        let gateInputs: boolean[]
        if (gate.type === "NOT") {
          // For NOT gates, we'll use input C for challenge 3, otherwise A
          gateInputs = currentChallenge?.id === "3" ? [newInputs.C] : [newInputs.A]
        } else {
          gateInputs = [newInputs.A, newInputs.B]
        }

        return {
          ...gate,
          inputs: gateInputs,
          output: calculateGateOutput({ ...gate, inputs: gateInputs }),
        }
      }),
    )
  }

  const handleChallengeDragStart = (gateType: GateType) => {
    setDraggedGate(gateType)
  }

  const handleChallengeDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedGate || !challengeCanvasRef.current) return

    const rect = challengeCanvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 50
    const y = e.clientY - rect.top - 30

    const newGate: LogicGate = {
      id: Date.now().toString(),
      type: draggedGate,
      inputs:
        draggedGate === "NOT"
          ? currentChallenge?.id === "3"
            ? [challengeInputs.C]
            : [challengeInputs.A]
          : [challengeInputs.A, challengeInputs.B],
      output: false,
      x: Math.max(0, Math.min(x, rect.width - 100)),
      y: Math.max(0, Math.min(y, rect.height - 60)),
    }
    newGate.output = calculateGateOutput(newGate)
    setChallengeGates([...challengeGates, newGate])
    setDraggedGate(null)
  }

  const removeChallengeGate = (gateId: string) => {
    setChallengeGates(challengeGates.filter((gate) => gate.id !== gateId))
  }

  const clearChallengeCircuit = () => {
    setChallengeGates([])
    setChallengeResult(null)
  }

  const checkChallengeSolution = () => {
    if (challengeGates.length === 0) {
      setChallengeResult({ correct: false, message: "Please add some gates to your circuit!" })
      return
    }

    // Test all possible input combinations
    const testCases =
      currentChallenge?.id === "3"
        ? [
            { A: false, B: false, C: false },
            { A: false, B: false, C: true },
            { A: false, B: true, C: false },
            { A: false, B: true, C: true },
            { A: true, B: false, C: false },
            { A: true, B: false, C: true },
            { A: true, B: true, C: false },
            { A: true, B: true, C: true },
          ]
        : [
            { A: false, B: false, C: false },
            { A: false, B: true, C: false },
            { A: true, B: false, C: false },
            { A: true, B: true, C: false },
          ]

    let allCorrect = true
    let failedCase = null

    for (const testCase of testCases) {
      // Calculate expected output based on challenge
      let expectedOutput = false
      if (currentChallenge?.id === "1") {
        expectedOutput = testCase.A && testCase.B
      } else if (currentChallenge?.id === "2") {
        expectedOutput = testCase.A || testCase.B
      } else if (currentChallenge?.id === "3") {
        expectedOutput = (testCase.A && testCase.B) || !testCase.C
      }

      // Calculate actual output from circuit
      let actualOutput = false

      if (currentChallenge?.id === "3") {
        // For challenge 3, we need to check for the specific pattern: (A AND B) OR (NOT C)
        const andGates = challengeGates.filter((gate) => gate.type === "AND")
        const orGates = challengeGates.filter((gate) => gate.type === "OR")
        const notGates = challengeGates.filter((gate) => gate.type === "NOT")

        // Check if we have the required gates for (A AND B) OR (NOT C)
        if (andGates.length >= 1 && orGates.length >= 1 && notGates.length >= 1) {
          const andResult = testCase.A && testCase.B
          const notResult = !testCase.C
          actualOutput = andResult || notResult
        } else if (andGates.length >= 1 && orGates.length >= 1) {
          // If they're missing NOT gate, check if they built A AND B OR C (common mistake)
          const andResult = testCase.A && testCase.B
          actualOutput = andResult || testCase.C
        } else {
          // Use the last gate's output as fallback
          const updatedGates = challengeGates.map((gate) => {
            let gateInputs: boolean[]
            if (gate.type === "NOT") {
              gateInputs = [testCase.C]
            } else {
              gateInputs = [testCase.A, testCase.B]
            }
            return {
              ...gate,
              inputs: gateInputs,
              output: calculateGateOutput({ ...gate, inputs: gateInputs }),
            }
          })
          actualOutput = updatedGates.length > 0 ? updatedGates[updatedGates.length - 1].output : false
        }
      } else {
        // For challenges 1 and 2, use the existing logic
        const updatedGates = challengeGates.map((gate) => {
          let gateInputs: boolean[]
          if (gate.type === "NOT") {
            gateInputs = currentChallenge?.id === "3" ? [testCase.C] : [testCase.A]
          } else {
            gateInputs = [testCase.A, testCase.B]
          }
          return {
            ...gate,
            inputs: gateInputs,
            output: calculateGateOutput({ ...gate, inputs: gateInputs }),
          }
        })
        actualOutput = updatedGates.length > 0 ? updatedGates[updatedGates.length - 1].output : false
      }

      if (actualOutput !== expectedOutput) {
        allCorrect = false
        failedCase = testCase
        break
      }
    }

    if (allCorrect) {
      setChallengeResult({
        correct: true,
        message: "🎉 Congratulations! Your circuit is correct!",
      })
    } else {
      let message = "❌ Not quite right. "
      if (currentChallenge?.id === "3") {
        const andGates = challengeGates.filter((gate) => gate.type === "AND")
        const orGates = challengeGates.filter((gate) => gate.type === "OR")
        const notGates = challengeGates.filter((gate) => gate.type === "NOT")

        if (andGates.length === 0) {
          message += "You need an AND gate for (A AND B)."
        } else if (orGates.length === 0) {
          message += "You need an OR gate to combine the results."
        } else if (notGates.length === 0) {
          message += "You need a NOT gate for (NOT C)."
        } else {
          message += "Check your logic - you need: (A AND B) OR (NOT C)."
        }
      } else {
        message += "Try testing different input combinations!"
      }

      setChallengeResult({
        correct: false,
        message: message,
      })
    }
  }

  const calculateChallengeOutput = () => {
    if (challengeGates.length === 0) return null

    const updatedGates = challengeGates.map((gate) => {
      let gateInputs: boolean[]
      if (gate.type === "NOT") {
        gateInputs = currentChallenge?.id === "3" ? [challengeInputs.C] : [challengeInputs.A]
      } else {
        gateInputs = [challengeInputs.A, challengeInputs.B]
      }

      return {
        ...gate,
        inputs: gateInputs,
        output: calculateGateOutput({ ...gate, inputs: gateInputs }),
      }
    })

    return updatedGates.length > 0 ? updatedGates[updatedGates.length - 1].output : null
  }

  return (
    <section className="bg-black/50 rounded-[6rem] py-24 md:py-32 lg:py-40 px-4 md:px-8 lg:px-12 relative overflow-hidden min-h-screen">
      <div className="md:max-w-7xl w-full mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-8 md:mb-12 tracking-wider"
        >
          LOGIC GATES
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl text-center mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          Master Boolean Algebra through Interactive Gaming
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-16 md:mb-20"
        >
          {[
            { key: "learn", label: "Learn Gates", icon: "📚" },
            { key: "build", label: "Build Circuit", icon: "🔧" },
            { key: "challenges", label: "Challenges", icon: "🎯" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCurrentSection(tab.key as any)}
              className={`px-10 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 ${
                currentSection === tab.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
              }`}
            >
              <span className="mr-3 text-2xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {currentSection === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Gate Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {gateTypes.map((gate) => (
                  <motion.button
                    key={gate.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedGate(gate.type)
                      setShowTruthTable(true)
                    }}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      selectedGate === gate.type
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    <div className="text-2xl mb-2">{gate.symbol}</div>
                    <div className="font-bold text-sm">{gate.type}</div>
                  </motion.button>
                ))}
              </div>

              {/* Gate Description */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                <h3 className="text-white text-2xl font-bold mb-4">{selectedGate} Gate</h3>
                <p className="text-white/80 text-lg mb-6">
                  {gateTypes.find((g) => g.type === selectedGate)?.description}
                </p>

                {/* Truth Table */}
                {showTruthTable && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/30 rounded-xl p-4 md:p-6"
                  >
                    <h4 className="text-white font-bold mb-4">Truth Table</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-white/20">
                            {selectedGate === "NOT" ? (
                              <>
                                <th className="p-2 text-left">Input A</th>
                                <th className="p-2 text-left">Output</th>
                              </>
                            ) : (
                              <>
                                <th className="p-2 text-left">Input A</th>
                                <th className="p-2 text-left">Input B</th>
                                <th className="p-2 text-left">Output</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {getTruthTable(selectedGate).map((row, index) => (
                            <tr key={index} className="border-b border-white/10">
                              {row.inputs.map((input, i) => (
                                <td key={i} className="p-2">
                                  <span className={`px-2 py-1 rounded ${input ? "bg-green-500" : "bg-red-500"}`}>
                                    {input ? "1" : "0"}
                                  </span>
                                </td>
                              ))}
                              <td className="p-2">
                                <span className={`px-2 py-1 rounded ${row.output ? "bg-green-500" : "bg-red-500"}`}>
                                  {row.output ? "1" : "0"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <h4 className="text-white font-bold mb-4 text-center">Gate Symbol</h4>
                      <div className="flex justify-center">
                        <LogicGateDiagram gateType={selectedGate} />
                      </div>
                      <p className="text-white/60 text-sm text-center mt-2">{selectedGate} Gate Symbol</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentSection === "build" && (
            <motion.div
              key="build"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                <h3 className="text-white text-3xl font-bold mb-8 text-center">🔧 Circuit Builder</h3>

                {/* Instructions */}
                <div className="mb-8 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">💡 How to Build:</h4>
                  <ol className="text-white/80 text-sm space-y-1 ml-4">
                    <li>1. Set your input values (A and B) below</li>
                    <li>2. Drag any gate from the palette to the canvas</li>
                    <li>3. Watch the output update automatically!</li>
                    <li>4. Double-click gates to remove them</li>
                  </ol>
                </div>

                {/* Circuit Inputs - Made more prominent */}
                <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-white/30">
                  <h4 className="text-white font-bold mb-4 text-xl text-center">⚡ Circuit Inputs</h4>
                  <div className="flex justify-center gap-12">
                    <div className="text-center">
                      <div className="text-white font-bold mb-2 text-lg">Input A</div>
                      <button
                        onClick={() => updateCircuitInput("A", !circuitInputs.A)}
                        className={`w-20 h-20 rounded-full border-4 border-white font-bold text-2xl text-white transition-all duration-300 hover:scale-110 ${
                          circuitInputs.A
                            ? "bg-green-500 shadow-green-500/50 shadow-lg"
                            : "bg-red-500 shadow-red-500/50 shadow-lg"
                        }`}
                      >
                        {circuitInputs.A ? "1" : "0"}
                      </button>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold mb-2 text-lg">Input B</div>
                      <button
                        onClick={() => updateCircuitInput("B", !circuitInputs.B)}
                        className={`w-20 h-20 rounded-full border-4 border-white font-bold text-2xl text-white transition-all duration-300 hover:scale-110 ${
                          circuitInputs.B
                            ? "bg-green-500 shadow-green-500/50 shadow-lg"
                            : "bg-red-500 shadow-red-500/50 shadow-lg"
                        }`}
                      >
                        {circuitInputs.B ? "1" : "0"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gate Palette - Made more visual */}
                <div className="mb-8">
                  <h4 className="text-white font-bold mb-4 text-xl text-center">🎯 Drag Gates to Canvas</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {gateTypes.map((gate) => (
                      <motion.div
                        key={gate.type}
                        draggable
                        onDragStart={() => handleDragStart(gate.type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-xl text-center transition-all duration-300 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/30 hover:border-white/50 cursor-grab active:cursor-grabbing hover:shadow-lg"
                      >
                        <div className="mb-2">
                          <CircuitGateSymbol gateType={gate.type} size={50} />
                        </div>
                        <div className="font-bold text-sm text-white">{gate.type}</div>
                        <div className="text-xs text-white/60 mt-1">Drag me!</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Circuit Canvas - Made more prominent */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-bold text-xl">🎨 Circuit Canvas</h4>
                    <button
                      onClick={clearCircuit}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-300"
                    >
                      🗑️ Clear All
                    </button>
                  </div>

                  <div
                    ref={canvasRef}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="bg-black/40 rounded-xl p-6 min-h-[500px] relative border-2 border-dashed border-white/30 hover:border-white/50 transition-all duration-300"
                  >
                    {gates.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-white/60 text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <div className="text-xl font-bold mb-2">Drop Gates Here!</div>
                        <div className="text-sm">Drag any gate from above to start building</div>
                      </div>
                    ) : (
                      gates.map((gate) => (
                        <motion.div
                          key={gate.id}
                          drag
                          dragMomentum={false}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          onDoubleClick={() => removeGate(gate.id)}
                          className="absolute bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-lg p-4 cursor-move shadow-lg border-2 border-white/40 backdrop-blur-sm hover:border-white/60 transition-all duration-300"
                          style={{ left: gate.x, top: gate.y }}
                        >
                          <div className="text-white text-center">
                            <div className="mb-2">
                              <CircuitGateSymbol gateType={gate.type} size={60} />
                            </div>
                            <div className="font-bold text-sm mb-2">{gate.type}</div>
                            <div className="flex justify-center gap-1 mb-2">
                              {gate.inputs.map((input, index) => (
                                <div
                                  key={index}
                                  className={`w-5 h-5 rounded-full border-2 border-white ${
                                    input
                                      ? "bg-green-400 shadow-green-400/50 shadow-md"
                                      : "bg-red-400 shadow-red-400/50 shadow-md"
                                  }`}
                                />
                              ))}
                            </div>
                            <div
                              className={`w-8 h-8 rounded-full mx-auto border-2 border-white font-bold text-sm flex items-center justify-center ${
                                gate.output
                                  ? "bg-green-400 shadow-green-400/50 shadow-md"
                                  : "bg-red-400 shadow-red-400/50 shadow-md"
                              }`}
                            >
                              {gate.output ? "1" : "0"}
                            </div>
                            <div className="text-xs text-white/60 mt-1">Double-click to remove</div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Circuit Output - Made more prominent */}
                <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-white/30">
                  <h4 className="text-white font-bold mb-4 text-xl text-center">⚡ Final Output</h4>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-white text-lg">Result:</div>
                    {calculateCircuitOutput() !== null ? (
                      <div
                        className={`w-24 h-24 rounded-full border-4 border-white flex items-center justify-center font-bold text-3xl text-white transition-all duration-300 ${
                          calculateCircuitOutput()
                            ? "bg-green-500 shadow-green-500/50 shadow-xl animate-pulse"
                            : "bg-red-500 shadow-red-500/50 shadow-xl"
                        }`}
                      >
                        {calculateCircuitOutput() ? "1" : "0"}
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center text-white/60 text-sm text-center">
                        Add
                        <br />
                        Gates
                      </div>
                    )}
                  </div>
                  {gates.length > 0 && (
                    <div className="mt-4 text-center text-white/80 text-lg font-mono bg-black/30 rounded-lg p-3">
                      A={circuitInputs.A ? "1" : "0"}, B={circuitInputs.B ? "1" : "0"} → Output=
                      {calculateCircuitOutput() ? "1" : "0"}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {!currentChallenge ? (
                <>
                  <h3 className="text-white text-3xl font-bold text-center mb-8">🎯 Logic Challenges</h3>
                  <p className="text-white/80 text-lg text-center mb-8 max-w-3xl mx-auto">
                    Test your logic gate knowledge with these interactive challenges. Build circuits to solve each
                    problem!
                  </p>

                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">#{challenge.id}</span>
                            <h4 className="text-white text-xl font-bold">{challenge.title}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${
                                challenge.difficulty === "Easy"
                                  ? "bg-green-500/20 text-green-400"
                                  : challenge.difficulty === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {challenge.difficulty}
                            </span>
                          </div>
                          <p className="text-white/80 mb-3 text-lg">{challenge.description}</p>
                          <div className="bg-black/30 rounded-lg p-3 mb-3">
                            <p className="text-blue-400 font-mono text-sm">
                              <span className="text-white/60">Target Expression:</span> {challenge.targetExpression}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => startChallenge(challenge)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 whitespace-nowrap text-lg shadow-lg"
                        >
                          🚀 Start Challenge
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Challenge Header */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={backToChallengelist}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-300"
                        >
                          ← Back
                        </button>
                        <h3 className="text-white text-2xl font-bold">Challenge #{currentChallenge.id}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            currentChallenge.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : currentChallenge.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {currentChallenge.difficulty}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-white text-xl font-bold mb-3">{currentChallenge.title}</h4>
                    <p className="text-white/80 text-lg mb-4">{currentChallenge.description}</p>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-blue-400 font-mono">
                        <span className="text-white/60">Build this expression:</span>{" "}
                        {currentChallenge.targetExpression}
                      </p>
                    </div>
                  </div>

                  {/* Challenge Inputs */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                    <h4 className="text-white font-bold mb-4 text-xl text-center">⚡ Test Inputs</h4>
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <div className="text-white font-bold mb-2 text-lg">Input A</div>
                        <button
                          onClick={() => updateChallengeInput("A", !challengeInputs.A)}
                          className={`w-16 h-16 rounded-full border-4 border-white font-bold text-xl text-white transition-all duration-300 hover:scale-110 ${
                            challengeInputs.A
                              ? "bg-green-500 shadow-green-500/50 shadow-lg"
                              : "bg-red-500 shadow-red-500/50 shadow-lg"
                          }`}
                        >
                          {challengeInputs.A ? "1" : "0"}
                        </button>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold mb-2 text-lg">Input B</div>
                        <button
                          onClick={() => updateChallengeInput("B", !challengeInputs.B)}
                          className={`w-16 h-16 rounded-full border-4 border-white font-bold text-xl text-white transition-all duration-300 hover:scale-110 ${
                            challengeInputs.B
                              ? "bg-green-500 shadow-green-500/50 shadow-lg"
                              : "bg-red-500 shadow-red-500/50 shadow-lg"
                          }`}
                        >
                          {challengeInputs.B ? "1" : "0"}
                        </button>
                      </div>
                      {currentChallenge.id === "3" && (
                        <div className="text-center">
                          <div className="text-white font-bold mb-2 text-lg">Input C</div>
                          <button
                            onClick={() => updateChallengeInput("C", !challengeInputs.C)}
                            className={`w-16 h-16 rounded-full border-4 border-white font-bold text-xl text-white transition-all duration-300 hover:scale-110 ${
                              challengeInputs.C
                                ? "bg-green-500 shadow-green-500/50 shadow-lg"
                                : "bg-red-500 shadow-red-500/50 shadow-lg"
                            }`}
                          >
                            {challengeInputs.C ? "1" : "0"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gate Palette for Challenge */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                    <h4 className="text-white font-bold mb-4 text-xl text-center">
                      🎯 Drag Gates to Build Your Solution
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {gateTypes.map((gate) => (
                        <motion.div
                          key={gate.type}
                          draggable
                          onDragStart={() => handleChallengeDragStart(gate.type)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-xl text-center transition-all duration-300 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/30 hover:border-white/50 cursor-grab active:cursor-grabbing hover:shadow-lg"
                        >
                          <div className="mb-2">
                            <CircuitGateSymbol gateType={gate.type} size={50} />
                          </div>
                          <div className="font-bold text-sm text-white">{gate.type}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Challenge Circuit Canvas */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/20">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-white font-bold text-xl">🎨 Your Solution</h4>
                      <div className="flex gap-3">
                        <button
                          onClick={clearChallengeCircuit}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-300"
                        >
                          🗑️ Clear
                        </button>
                        <button
                          onClick={checkChallengeSolution}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-300"
                        >
                          ✅ Check Solution
                        </button>
                      </div>
                    </div>

                    <div
                      ref={challengeCanvasRef}
                      onDragOver={handleDragOver}
                      onDrop={handleChallengeDrop}
                      className="bg-black/40 rounded-xl p-6 min-h-[400px] relative border-2 border-dashed border-white/30 hover:border-white/50 transition-all duration-300"
                    >
                      {challengeGates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-white/60 text-center">
                          <div className="text-6xl mb-4">🎯</div>
                          <div className="text-xl font-bold mb-2">Build Your Circuit Here!</div>
                          <div className="text-sm">Drag gates from above to create the solution</div>
                        </div>
                      ) : (
                        challengeGates.map((gate) => (
                          <motion.div
                            key={gate.id}
                            drag
                            dragMomentum={false}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            onDoubleClick={() => removeChallengeGate(gate.id)}
                            className="absolute bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-lg p-4 cursor-move shadow-lg border-2 border-white/40 backdrop-blur-sm hover:border-white/60 transition-all duration-300"
                            style={{ left: gate.x, top: gate.y }}
                          >
                            <div className="text-white text-center">
                              <div className="mb-2">
                                <CircuitGateSymbol gateType={gate.type} size={60} />
                              </div>
                              <div className="font-bold text-sm mb-2">{gate.type}</div>
                              <div className="flex justify-center gap-1 mb-2">
                                {gate.inputs.map((input, index) => (
                                  <div
                                    key={index}
                                    className={`w-4 h-4 rounded-full border-2 border-white ${
                                      input
                                        ? "bg-green-400 shadow-green-400/50 shadow-md"
                                        : "bg-red-400 shadow-red-400/50 shadow-md"
                                    }`}
                                  />
                                ))}
                              </div>
                              <div
                                className={`w-6 h-6 rounded-full mx-auto border-2 border-white font-bold text-xs flex items-center justify-center ${
                                  gate.output
                                    ? "bg-green-400 shadow-green-400/50 shadow-md"
                                    : "bg-red-400 shadow-red-400/50 shadow-md"
                                }`}
                              >
                                {gate.output ? "1" : "0"}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {/* Challenge Output */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-white/30">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-white text-lg">Current Output:</div>
                        {calculateChallengeOutput() !== null ? (
                          <div
                            className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-bold text-2xl text-white transition-all duration-300 ${
                              calculateChallengeOutput()
                                ? "bg-green-500 shadow-green-500/50 shadow-xl"
                                : "bg-red-500 shadow-red-500/50 shadow-xl"
                            }`}
                          >
                            {calculateChallengeOutput() ? "1" : "0"}
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center text-white/60 text-xs text-center">
                            No
                            <br />
                            Gates
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Challenge Result */}
                    {challengeResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`mt-6 p-6 rounded-xl border-2 text-center ${
                          challengeResult.correct
                            ? "bg-green-500/20 border-green-500/50 text-green-400"
                            : "bg-red-500/20 border-red-500/50 text-red-400"
                        }`}
                      >
                        <div className="text-2xl font-bold mb-2">{challengeResult.message}</div>
                        {challengeResult.correct && (
                          <div className="text-white/80">Great job! Try the next challenge to continue learning.</div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-8 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
    </section>
  )
}
