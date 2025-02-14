import { getSession } from "next-auth/react";
import { getLike } from "@/app/pages/api/likesPage";
import { likeMovie, unlikeMovie } from "@/app/features/dbSlice";


async function handleLikeBtn(
  dispatch: any,
  setIsLiked: any,
  isLiked: boolean,
  id: number,
  mediaType: string
) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User not logged in!");
    return;
  }

  if (isLiked === true) {
    try {
      const res = await fetch("/api/likes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, like: id, mediaType }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsLiked(false);
        const data = await getLike(id, mediaType);
        const likedContent = await data.json();
        dispatch(unlikeMovie(likedContent)); 
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  } else {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, like: id, mediaType }),
      });

      if (res.status === 400) {
        console.log("Error");
      }

      if (res.status === 200) {
        setIsLiked(true);
        const data = await getLike(id, mediaType);
        const likedContent = await data.json();
        dispatch(likeMovie(likedContent)); 
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }
}

export default handleLikeBtn;
