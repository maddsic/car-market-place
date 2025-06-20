import { useNavigate } from "@remix-run/react";

export const handleNavigateToListings = (carId: string) => {
  const navigate = useNavigate();

  return navigate(`/listings/${carId}`);
};
