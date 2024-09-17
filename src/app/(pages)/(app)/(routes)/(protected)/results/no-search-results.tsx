"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchX, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface NoResultProps {
  title?: string;
  message?: string;
  searchTerm?: string;
  onSearch?: (term: string) => void;
  onReset?: () => void;
  onShowAll?: () => void;
}

export default function NoSearchResult({
  title = "No results found",
  message = "We couldn't find any results matching your search. Try adjusting your search terms or filters.",
  searchTerm = "",
  onSearch,
  onReset,
  onShowAll,
}: NoResultProps = {}) {
  const [showTips, setShowTips] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto  border-none shadow-none">
      <CardHeader className="text-center">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto mb-4 text-primary"
        >
          <SearchX className="w-full h-full" />
        </motion.div>
        <CardTitle className="text-3xl font-bold mb-2">{title}</CardTitle>
        <p className="text-muted-foreground">{message}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-2">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
          <Button variant="secondary" onClick={onShowAll}>
            Show All Results
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          variant="ghost"
          onClick={() => setShowTips(!showTips)}
          className="text-sm"
        >
          {showTips ? "Hide" : "Show"} Search Tips
          {showTips ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </Button>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            <ul className="list-disc list-inside space-y-1">
              <li>Check for spelling errors</li>
              <li>Try using more general terms</li>
              <li>Reduce the number of search terms</li>
              <li>Check your filters and categories</li>
            </ul>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  );
}
