"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack MERN application with user authentication, product catalog, cart functionality, and payment integration.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      demoUrl: "https://project-demo.com",
      githubUrl: "https://github.com/thisisPrasadP/project",
    },
    {
      id: 2,
      title: "AI-Powered Chat Assistant",
      description:
        "A conversational AI assistant built with LangChain and Python that can answer questions and perform tasks.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Python", "LangChain", "FastAPI", "React", "TypeScript"],
      demoUrl: "https://project-demo.com",
      githubUrl: "https://github.com/thisisPrasadP/project",
    },
    {
      id: 3,
      title: "Algorithm Visualizer",
      description: "An interactive web application that visualizes various sorting and pathfinding algorithms.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "TypeScript", "Data Structures", "Algorithms"],
      demoUrl: "https://project-demo.com",
      githubUrl: "https://github.com/thisisPrasadP/project",
    },
    {
      id: 4,
      title: "Task Management System",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      demoUrl: "https://project-demo.com",
      githubUrl: "https://github.com/thisisPrasadP/project",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
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
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent projects showcasing my technical skills and problem-solving abilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredProject === project.id ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>

                <CardHeader>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <span>Live Demo</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <a href="https://github.com/thisisPrasadP" target="_blank" rel="noopener noreferrer">
              <span>View More Projects</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

