---
description: Transform raw thoughts into a polished blog post using ghostwriter and AI detector agents
argument-hint: [title] [optional: raw-text-file]
---

You are orchestrating a two-stage writing process to create authentic, human-sounding blog posts.

## Process

### Stage 1: Transform with Ghostwriter

Use the Task tool to launch the `ghostwriter` subagent with the following instructions:

"Transform the provided raw text/transcript into a polished blog post following the ghostwriting principles.

**Input**: $ARGUMENTS

**Output**: Return the complete drafted blog post with appropriate frontmatter."

### Stage 2: AI Detection Review

After the ghostwriter agent completes, use the Task tool to launch the `ai-detector` subagent:

"Review the drafted blog post for AI-sounding patterns and provide specific fixes.

**Input**: [The blog post created by ghostwriter]

**Output**: Return the analysis with specific suggestions and a revised version of any problematic sections."

### Stage 3: Finalize and Save

1. Review the AI detector's feedback
2. Apply the suggested fixes to the ghostwritten draft
3. Ensure proper MDX frontmatter:
   ```yaml
   ---
   title: [Title from arguments or derived from content]
   summary: [One sentence summary]
   date: [Today's date in YYYY-MM-DD format]
   image: [Appropriate image path]
   imageAlt: [Image alt text]
   tags: [relevant, tags]
   ---
   ```
4. Save the final post to `content/posts/[slug].mdx` where slug is kebab-case version of title
5. Confirm completion with the file path

## Notes

- If the user provides a file path in arguments, read that file first
- If the user provides raw text inline, use that directly
- The two subagents should run sequentially, not in parallel
- The final output should be publication-ready
- Trust the subagents' outputs but apply your own judgment on the final edits
