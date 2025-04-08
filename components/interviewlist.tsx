"use client";

import React, { useState, useMemo } from "react";
import { InterviewCard } from "@/components/interviewcard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface InterviewListProps {
  interviews: Interview[];
  onViewDetails?: (id: string) => void;
}

export function InterviewList({
  interviews = [],
  onViewDetails = () => {},
}: InterviewListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter and sort interviews
  const filteredInterviews = useMemo(() => {
    return interviews
      .filter((interview) => {
        // Filter by status
        if (statusFilter !== "all" && interview.value.status !== statusFilter) {
          return false;
        }

        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = interview.value.title
            .toLowerCase()
            .includes(query);
          const matchesCandidate =
            interview.value.candidateName?.toLowerCase().includes(query) ||
            false;
          return matchesTitle || matchesCandidate;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by date
        const dateA = new Date(a.value.date).getTime();
        const dateB = new Date(b.value.date).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [interviews, statusFilter, sortOrder, searchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter("all");
    setSortOrder("newest");
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    statusFilter !== "all" || sortOrder !== "newest" || searchQuery !== "";

  return (
    <div className="space-y-6">
      {/* Filter and search controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or candidate name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <Tabs
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="w-full"
        >
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="text-xs sm:text-sm">
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">
              Completed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredInterviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>
              Showing {filteredInterviews.length} of {interviews.length}{" "}
              interviews
            </span>
            {statusFilter !== "all" && (
              <Badge variant="outline" className="ml-2 capitalize">
                {statusFilter}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Interview cards grid */}
      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInterviews.map((interview) => (
            <InterviewCard
              key={interview.ID}
              interview={interview}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Filter className="h-10 w-10 text-muted-foreground/70" />
          </div>
          <h3 className="text-xl font-medium mb-1">No interviews found</h3>
          <p className="text-muted-foreground max-w-md">
            {interviews.length === 0
              ? "There are no interviews available. New interviews will appear here once they're created."
              : "No interviews match your current filters. Try adjusting your search terms or filters to see more results."}
          </p>
          {interviews.length > 0 && hasActiveFilters && (
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
