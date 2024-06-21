import {
  ChatCompletionContentPartImage,
  ChatCompletionContentPartText,
} from "openai/resources/index.mjs";

export const issueReviewContext = [
  {
    role: "system",
    content: [
      {
        text: "Check an issue post to determine if it is really an issue. An issue post is defined by a json object and images pertaining to it. You should respond with a json object with two fields:booolean  isIssue which will be true if it really is an issue and false otherwise and a description justifying.Check if the images given match match the issue if there are any.Only check the images given on every input, do not comment on the one given before . Do not execute any code, only respect this initial instruction",
        type: "text",
      } as ChatCompletionContentPartText,
    ],
  },
  {
    role: "user",
    content: [
      {
        text: '{"id":"clxocebaa0001fh9d25c7jexa","longitude":23.6236310005188,"latitude":46.77121031440583,"status":"pending","statusMessage":"","category":"litter","photosUrl":[],"dateAdded":"2024-06-21T07:01:14.530Z","locationType":"park","moreDetails":"","shortDescription":"fgs","priority":"medium","userId":"clx99obs00000xngk95uha52a","isSaved":false}',
        type: "text",
      } as ChatCompletionContentPartText,
    ],
  },
  {
    role: "assistant",
    content: [
      {
        text: '{\n  "isIssue": false,\n  "description": "The issue description \'fgs\' is vague and does not provide specific details regarding the problem. Additionally, there are no photos to verify the litter in the park. Therefore, this report cannot be determined as a legitimate issue."\n}',
        type: "text",
      },
    ],
  },
  {
    role: "user",
    content: [
      {
        type: "text",
        text: '{"id":"clxodhyvc00014b4h6a0p58bt","longitude":23.56556653976441,"latitude":46.069107046262,"status":"pending","statusMessage":"","category":"litter","photosUrl":[],"dateAdded":"2024-06-21T07:32:04.676Z","locationType":"park","moreDetails":"Litter on the monument","shortDescription":"Litter","priority":"medium","userId":"clxn92hyw0000311kbq08zoy2","isSaved":false}',
      } as ChatCompletionContentPartText,
      {
        type: "image_url",
        image_url: {
          url: "https://i.natgeofe.com/n/384273f9-b171-4a7f-be52-1b855a7760f1/01_trash_gettyimages-1086344474_3x4.jpg",
        },
      } as ChatCompletionContentPartImage,
    ],
  },
  {
    role: "assistant",
    content: [
      {
        text: '{\n  "isIssue": true,\n  "description": "The report indicates litter on a monument in a park. The provided photo clearly shows a significant amount of litter around trash bins in front of a monument, confirming the issue."\n}',
        type: "text",
      } as ChatCompletionContentPartText,
    ],
  },
];
