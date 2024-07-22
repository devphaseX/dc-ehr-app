import { useQuery } from "@tanstack/react-query";

export const useSecurityQuestionQuery = () => {
  useQuery({
    queryKey: ["security-questions"],
    queryFn: () => {},
  });
};
