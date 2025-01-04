export const formatForGoogleDocs = (text: string) => {
  // Split into sections based on headers
  const sections = text.split(/(?=^[A-Z][^a-z\n]*$)/m);
  let sectionCounter = 1;

  return sections
    .map((section) => {
      // Handle section headers
      const lines = section.trim().split("\n");
      let formatted = "";

      if (/^[A-Z][^a-z]*$/.test(lines[0])) {
        // Format header with numbering and proper spacing
        formatted += `${sectionCounter}. ${lines[0].trim()}\n\n`;
        sectionCounter++;
        lines.shift();
      }

      // Process remaining lines
      const content = lines.join("\n").trim();

      // Split into numbered lists, bullet points, and paragraphs
      const parts = content.split(/(?=^\s*(?:[0-9]+\.|[•-]|\t))/m);

      formatted += parts
        .map((part) => {
          const trimmedPart = part.trim();

          // Handle numbered lists (e.g., "1.", "2.")
          if (/^[0-9]+\./.test(trimmedPart)) {
            // Remove the number but keep the content
            return ` ${trimmedPart.replace(/^[0-9]+\.\s*/, "")}\n`;
          }
          // Handle bullet points and dashes
          else if (trimmedPart.startsWith("•") || trimmedPart.startsWith("-")) {
            // Remove the bullet/dash and add a space
            return ` ${trimmedPart.substring(1).trim()}\n`;
          }
          // Handle sub-bullets (indented)
          else if (trimmedPart.startsWith("\t")) {
            // Add double space for sub-items
            return `  ${trimmedPart.substring(1).trim()}\n`;
          } else if (trimmedPart) {
            // Format paragraphs with proper spacing
            return `${trimmedPart}\n\n`;
          }
          return "";
        })
        .join("");

      return formatted;
    })
    .join("\n")
    .trim();
};
