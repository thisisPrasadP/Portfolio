"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("sorting")
  const [algorithm, setAlgorithm] = useState("bubble")
  const [isRunning, setIsRunning] = useState(false)
  const [array, setArray] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [steps, setSteps] = useState<number[][]>([])
  const animationRef = useRef<number>()

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 10)
    setArray(newArray)
    setSteps([newArray])
    setCurrentStep(0)
    setIsRunning(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Initialize array on mount
  useEffect(() => {
    generateArray()
  }, [])

  // Reset animation when algorithm changes
  useEffect(() => {
    generateArray()
  }, [algorithm])

  // Bubble sort algorithm
  const bubbleSort = (arr: number[]) => {
    const animations: number[][] = [arr.slice()]
    const n = arr.length
    const sortedArray = arr.slice()

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap elements
          ;[sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]]
          animations.push(sortedArray.slice())
        }
      }
    }

    return animations
  }

  // Quick sort algorithm
  const quickSort = (arr: number[]) => {
    const animations: number[][] = [arr.slice()]
    const sortedArray = arr.slice()

    const partition = (arr: number[], low: number, high: number) => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          animations.push(arr.slice())
        }
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      animations.push(arr.slice())

      return i + 1
    }

    const quickSortHelper = (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pi = partition(arr, low, high)
        quickSortHelper(arr, low, pi - 1)
        quickSortHelper(arr, pi + 1, high)
      }
    }

    quickSortHelper(sortedArray, 0, sortedArray.length - 1)
    return animations
  }

  // Start animation
  const startAnimation = () => {
    setIsRunning(true)

    // Generate steps if not already generated
    if (steps.length <= 1) {
      const sortSteps = algorithm === "bubble" ? bubbleSort(array) : quickSort(array)
      setSteps(sortSteps)
    }

    let step = currentStep

    const animate = () => {
      if (step < steps.length - 1) {
        step++
        setCurrentStep(step)
        setArray(steps[step])
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsRunning(false)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Pause animation
  const pauseAnimation = () => {
    setIsRunning(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Reset animation
  const resetAnimation = () => {
    setCurrentStep(0)
    setArray(steps[0])
    setIsRunning(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Algorithm Visualizer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch sorting algorithms in action with this interactive visualization tool.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <Tabs defaultValue="sorting" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sorting">Sorting Algorithms</TabsTrigger>
                  <TabsTrigger value="data" disabled>
                    Data Structures (Coming Soon)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sorting" className="space-y-6 mt-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <Button
                      variant={algorithm === "bubble" ? "default" : "outline"}
                      onClick={() => setAlgorithm("bubble")}
                    >
                      Bubble Sort
                    </Button>
                    <Button
                      variant={algorithm === "quick" ? "default" : "outline"}
                      onClick={() => setAlgorithm("quick")}
                    >
                      Quick Sort
                    </Button>
                  </div>

                  <div className="h-64 flex items-end justify-center gap-1 mb-6 border rounded-lg p-4">
                    {array.map((value, index) => (
                      <div
                        key={index}
                        className="bg-primary w-4 rounded-t-sm transition-all duration-200"
                        style={{ height: `${value}%` }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button onClick={generateArray} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      New Array
                    </Button>
                    {isRunning ? (
                      <Button onClick={pauseAnimation}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button onClick={startAnimation}>
                        <Play className="h-4 w-4 mr-2" />
                        {currentStep > 0 ? "Resume" : "Start"}
                      </Button>
                    )}
                    <Button onClick={resetAnimation} variant="outline" disabled={currentStep === 0}>
                      Reset
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="data">
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Data structure visualizations coming soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent>{/* CardContent is now empty since we moved the content into the TabsContent */}</CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

