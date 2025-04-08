"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface InterviewValue {
  title: string;
  date: string;
  candidateName?: string;
  status: "scheduled" | "completed" | "cancelled" | "pending";
  description?: string;
}

interface Interview {
  ID: string;
  value: InterviewValue;
}

interface InterviewCardProps {
  interview: Interview;
  onViewDetails?: (id: string) => void;
}

export function InterviewCard({
  interview,
  onViewDetails = () => {},
}: InterviewCardProps) {
  const { ID, value } = interview;
  const { title, date, candidateName, status, description } = value;

  // Format the date if it's a valid date string
  const formattedDate = (() => {
    try {
      return format(new Date(date), "PPP 'at' p");
    } catch (e) {
      return date;
    }
  })();

  // Determine badge color based on status
  const getBadgeVariant = () => {
    switch (status) {
      case "completed":
        return "success";
      case "scheduled":
        return "default";
      case "cancelled":
        return "destructive";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        {candidateName ? (
          <div className="flex items-center gap-2 text-secondary-900">
            <User className="h-4 w-4" />
            <span className="font-medium">{candidateName}</span>
          </div>
        ) : (
          <div className="text-muted-foreground italic">
            No candidate assigned
          </div>
        )}

        {description && (
          <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <Badge variant={getBadgeVariant() as any} className="capitalize">
          {status}
        </Badge>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-primary hover:text-primary-600"
          onClick={() => onViewDetails(ID)}
        >
          View Details
          <ExternalLink className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
