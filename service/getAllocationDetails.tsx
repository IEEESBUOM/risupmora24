import toast from "react-hot-toast";

export const getAllocationDetails = async (panelistId: string) => {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/v1/candidate/getAllocations?panelistId=${panelistId}`
    );

    const data = await response.json();
    

   
    if (!response.ok) {
      throw new Error(data.message || "Error fetching allocation details");
    }

    
    return data;
  } catch (error) {
    
    console.error("Error fetching allocation details:", error);
    toast.error("Error fetching allocation details");
    return null;
  }
};
