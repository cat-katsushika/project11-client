import { useState, useEffect } from "react";
import axios from "axios";
import { Slide } from "@/app/types/pc";

const useSlides = (trialId: string) => {
  const [slides, setSlides] = useState<Slide[]>([]);

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/api/trial/projector/discussion/`,
          {
            trial_id: trialId,
          }
        );
        const data = response.data;

        const formattedSlides: Slide[] = [
          {
            title: data.subject,
            header: "Aさんの主張",
            content: data.plaintiff_claim,
          },
          {
            title: data.subject,
            header: "Bさんの主張",
            content: data.defendant_claim,
          },
          {
            title: data.subject,
            header: "AI裁判官の主張",
            content: data.provisional_judgment,
          },
        ];

        setSlides(formattedSlides);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData();
  }, [trialId]);

  return slides;
};

export default useSlides;
