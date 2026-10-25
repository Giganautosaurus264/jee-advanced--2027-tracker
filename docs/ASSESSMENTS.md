# Assessment files and ChatGPT recording

## What works now

1. Open a subtopic and choose **Prepare assessment**. The copied prompt includes its stable ID and neighbouring IDs.
2. Agree on the time limit and marking scheme before the assessment; solve without hints.
3. Ask the assessor for a graded JSON file. The Assessments page provides a downloadable example and an export of every PCM topic ID.
4. Import the file, inspect question references, grading and any distribution source, then explicitly confirm the evidence review.
5. Scoped statistics, calendar, deadlines and burndown update from the saved attempt.

The file may omit `benchmark`. Marks are then saved, but calibration is pending. Do not fabricate distributions, sources, question references or performance claims to make completion rise.

## Format

```json
{
  "schemaVersion": 1,
  "attemptId": "unique-retake-id",
  "assessmentId": "exact-assessment-and-version",
  "date": "2026-10-25",
  "durationMinutes": 30,
  "unaided": true,
  "results": [
    {
      "topicId": "oc-01-11",
      "score": 0,
      "maxScore": 8,
      "questions": [
        {
          "reference": "Replace with actual year, paper and PYQ question number",
          "kind": "PYQ",
          "challenging": true,
          "dependencies": ["oc-01-11", "oc-01-02"]
        },
        {
          "reference": "Replace with actual integrated Advanced question reference",
          "kind": "Advanced",
          "challenging": true,
          "dependencies": ["oc-01-11", "oc-01-12"]
        }
      ]
    }
  ]
}
```

The example has no calibration and cannot grant completion. `score` is raw marks, including negative marking where applicable; it is not simply correct answers divided by attempts. The reviewer checks marks and dependencies against the actual evidence. A new attemptId is required for each retake. Dates use IST calendar days. Known IDs, finite marks, valid dates and valid dependency IDs are enforced; imported `reviewed` flags are ignored.

Optional `benchmark`, within each result:

| Field | Meaning |
|---|---|
| `assessmentId` | Must match the attempt's exact assessment version |
| `topicId` | Must match the result's subtopic |
| `maxScore` | Must match the result's marking scale |
| `sourceUrl` | HTTPS link to inspect the actual distribution evidence |
| `cohort` | Identify the tested population and why it is representative |
| `conditions` | Document matching timing, assistance, questions and marking rules |
| `scores` | Array of at least 100 actual numeric marks on that same assessment/subtopic |

A source link plus JSON flags does not establish external truth. The review checkbox is a user attestation; there is no trusted issuer, signature or independent verification service. No official JEE percentile is produced. Subtopic-specific assessments generally lack an official national distribution. A valid full-exam distribution cannot simply be applied to a ChatGPT subtopic quiz.

Imported benchmarks above or below the threshold are displayed as empirical cohort statistics, not national rankings. A lower retake, an assisted retake or a retake lacking calibration can reopen a previously complete subtopic. Completion uses the latest attempt by assessment date, with recorded timestamp breaking ties; the full history is retained.

## Automatic recording: not configured

[GitHub Pages is static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). It does not provide an authenticated endpoint for ordinary ChatGPT conversations to write private browser localStorage or receive graded results.

[GPT Actions](https://developers.openai.com/api/docs/actions/introduction) can connect a configured GPT to an external API. To enable actual automatic recording, a separate authenticated integration would need:

- A receiving HTTPS API with user authentication and per-user authorization.
- A database for attempts, immutable audit history, stable syllabus IDs and validated benchmark provenance.
- A configured ChatGPT Action or other authenticated tool connected to that API.
- A signed-in PWA that reads the same user's records and resolves offline conflicts.
- Server-side grading/provenance checks if results are intended to be independently trusted.

No such backend, identity provider or credentials were supplied or created. No secrets are placed in the public repository, and no unauthenticated public write endpoint is simulated. The supported mechanism in this release is user-reviewed file import and local recording. Backend/provider choice and authentication setup remain future integration work.
