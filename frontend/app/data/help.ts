import { FaCar, FaShieldAlt, FaStore } from "react-icons/fa";
import { FaqItem } from "~/interfaces";

export const FAQS: FaqItem[] = [
  // Buyers
  {
    id: "buyer-1",
    category: "buyers",
    tag: "Inspections & Contact",
    question: "How do I inspect a car or contact the seller?",
    answer:
      "Every vehicle listing displays the verified seller or dealership card, including their phone line, location, and direct messaging channel. We recommend calling ahead to schedule a daytime visual inspection and test drive before discussing final payment.",
  },
  {
    id: "buyer-2",
    category: "buyers",
    tag: "Payments & Escrow",
    question: "Does Gamautos handle direct cash or wire payments?",
    answer:
      "Gamautos connects buyers and dealers directly. Payments, financing agreements, and title ownership transfers are conducted directly between buyer and seller. Gamautos never asks you to wire money to third-party offshore accounts.",
  },
  {
    id: "buyer-3",
    category: "buyers",
    tag: "Due Diligence",
    question: "What paperwork should I verify before paying?",
    answer:
      "Always inspect the vehicle's original logbook / registration documentation, check that the VIN on the chassis matches the paperwork, verify customs duty clearance if imported, and obtain a signed bill of sale with the seller's verified ID.",
  },

  // Dealers
  {
    id: "dealer-1",
    category: "dealers",
    tag: "Listing Inventory",
    question: "How do I list vehicles from my dealership lot?",
    answer:
      "Log into your Dealer Portal, navigate to 'Add Listing', upload clear photos of your car (exterior, interior, odometer), enter your Dalasi pricing and specifications, and hit publish. Listings are synced across Gamautos instantly.",
  },
  {
    id: "dealer-2",
    category: "dealers",
    tag: "Status Management",
    question: "How do I mark inventory as Sold or update pricing?",
    answer:
      "Go to your 'Inventory Manager' in the dashboard. Click on any car row to toggle between 'Available', 'Pending', or 'Sold', or adjust the listing price. Your showroom inventory updates live for prospective buyers.",
  },
  {
    id: "dealer-3",
    category: "dealers",
    tag: "Photo Guidelines",
    question: "What are the recommended vehicle photo standards?",
    answer:
      "High-resolution, well-lit photos taken in daylight generate 3x more buyer inquiries. We recommend at least 4 photos: front 3/4 angle, rear angle, clean dashboard/interior, and engine bay. Avoid excessive watermarks or low-resolution scans.",
  },

  // Safety
  {
    id: "safety-1",
    category: "safety",
    tag: "Scam Prevention",
    question: "How do I stay protected against fraudulent car deals?",
    answer:
      "Never send advance deposits, shipping fees, or down payments before physically verifying the car in person. Always meet sellers in safe, public commercial areas or at their registered dealership lot during business hours.",
  },
  {
    id: "safety-2",
    category: "safety",
    tag: "Fraud Reports",
    question: "How can I report a suspicious or duplicate listing?",
    answer:
      "If you notice an inaccurate odometer reading, stolen vehicle report, or suspicious pricing, email support@gamautos.com with the stock number or listing link. Our moderation team reviews flagged listings promptly.",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Topics", count: FAQS.length },
  {
    id: "buyers",
    label: "Car Buyers",
    icon: FaCar,
    count: FAQS.filter((f) => f.category === "buyers").length,
  },
  {
    id: "dealers",
    label: "Dealers & Sellers",
    icon: FaStore,
    count: FAQS.filter((f) => f.category === "dealers").length,
  },
  {
    id: "safety",
    label: "Trust & Safety",
    icon: FaShieldAlt,
    count: FAQS.filter((f) => f.category === "safety").length,
  },
] as const;
