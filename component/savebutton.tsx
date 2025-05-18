import { Bookmark } from "lucide-react";
import { useState } from "react";

export function SaveButton({
  id,
  onSaved,
}: {
  id: string;
  onSaved: () => void;
}) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleClick = async () => {
    await updatedSaved();
    onSaved();
  };

  const updatedSaved = async () => {
    const res: Response = await fetch(`/api/recipes/save/${id}`);

    if (res.ok) {
      alert("Berhasil Menyimpan Resep!");
      setIsSaved(true);
    } else {
      alert("Gagal Menyimpan Resep");
    }
  };

  return (
    <button onClick={handleClick}>
      <Bookmark className={isSaved ? "fill-yellow-500" : ""} />
    </button>
  );
}
