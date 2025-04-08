"use client";

import React from "react";
import { InterviewList } from "@/components/interviewlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  // Mock interview data
  const mockInterviews = [
    {
      ID: "int-001",
      value: {
        title: "Software Engineer - Front End",
        date: "2023-08-15T13:00:00",
        candidateName: "Alex Johnson",
        status: "completed",
        description:
          "Interview for senior front-end position focusing on React and TypeScript experience.",
      },
    },
    {
      ID: "int-002",
      value: {
        title: "UX Designer",
        date: "2023-08-18T10:30:00",
        candidateName: "Sarah Williams",
        status: "scheduled",
        description:
          "Reviewing portfolio and discussing past projects in the fintech industry.",
      },
    },
    {
      ID: "int-003",
      value: {
        title: "DevOps Engineer",
        date: "2023-08-10T15:00:00",
        candidateName: "Michael Chen",
        status: "completed",
        description:
          "Technical interview covering CI/CD pipelines, Kubernetes, and cloud infrastructure.",
      },
    },
    {
      ID: "int-004",
      value: {
        title: "Product Manager",
        date: "2023-08-22T14:00:00",
        candidateName: "Emily Rodriguez",
        status: "scheduled",
        description:
          "Discussion about product vision, roadmap planning, and stakeholder management.",
      },
    },
    {
      ID: "int-005",
      value: {
        title: "Backend Developer",
        date: "2023-08-05T11:00:00",
        candidateName: "David Kim",
        status: "cancelled",
        description:
          "Technical assessment for Node.js expertise and database design principles.",
      },
    },
    {
      ID: "int-006",
      value: {
        title: "Data Scientist",
        date: "2023-08-25T09:00:00",
        candidateName: "Priya Patel",
        status: "pending",
        description:
          "Discussion on machine learning models and data analysis techniques.",
      },
    },
  ];

  // Calculate statistics
  const totalInterviews = mockInterviews.length;
  const completedInterviews = mockInterviews.filter(
    (i) => i.value.status === "completed",
  ).length;
  const scheduledInterviews = mockInterviews.filter(
    (i) => i.value.status === "scheduled",
  ).length;
  const pendingInterviews = mockInterviews.filter(
    (i) => i.value.status === "pending" || i.value.status === "scheduled",
  ).length;

  const handleViewDetails = (id: string) => {
    console.log(`Viewing interview details for: ${id}`);
    // Navigation would be implemented here
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
            AI Interview Manager
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Streamline your recruiting process with AI-powered interviews.
            Schedule, manage, and review candidate performance all in one place.
          </p>
        </div>
        <Button className="gap-2" size="lg">
          <Plus className="h-5 w-5" />
          Create New Interview
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-secondary-800 flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Total Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary-700">
              {totalInterviews}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Interviews scheduled to date
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-secondary-800 flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success-700">
              {completedInterviews}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Interviews successfully completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 border-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-secondary-800 flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-warning" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-warning-700">
              {pendingInterviews}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Interviews awaiting completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Interview List */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold font-serif mb-2">
            Interview Schedule
          </h2>
          <p className="text-muted-foreground">
            Manage and monitor all your scheduled interviews.
          </p>
        </div>

        <InterviewList
          interviews={mockInterviews}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
}
