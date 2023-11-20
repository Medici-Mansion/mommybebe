# sullivan-Ai

![ai표지](https://github.com/Medici-Mansion/sullivan-ai/assets/106373580/90a4cf7a-495c-4e87-b19a-43c107987e6b)

<br/>

## Introduction
Language learning word game service for infants using image cards that are generated differently each time using generative AI.

<br/>

## Built With

This application was created using the following libraries and frameworks. 

### Backend

![drizzle_orm](https://img.shields.io/badge/drizzle_orm-2320232a?style=for-the-badge&logo=drizzle-orm&logoColor=white)
<img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">


### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/Next.js-3776AB?style=for-the-badge&logo=Next.js&logoColor=#000000">
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

<br/>

## Proposal Background

![image](https://github.com/Medici-Mansion/sullivan-ai/assets/106373580/43435257-839e-4a0c-8dd3-c80c22debb73)

The idea began with the mission of having children study English words in a three-dimensional way. When children study through real objects, they sometimes encounter objects from various perspectives with greater curiosity and observation than adults. 
<br/>
However, in an indoor study environment using word cards, there are some limitations due to its special characteristics. 
In particular, through card games in physical form, children are exposed to the picture represented by the word as a 2D image drawn in only one style. To solve these problems, Sullivan-AI was designed based on Open-AI's deep learning model and early childhood pedagogy.

<br />

## Features

### 1. Make the categories and words you(or your kids) want

![image](https://github.com/Medici-Mansion/sullivan-ai/assets/106373580/a0432bcb-22d9-4ea4-a303-9f875ec7f2d5)


In the first stage, you learn the pronunciation of the word by looking at the given picture.

The generated picture is created with DALL-E's image generation, and you can select the word category and prompt style to determine the group of words you want and the picture style that can most effectively show the word. One category consists of 5 words, which were designed considering the child's attention span of 'age * 1 minute'.

<br />

### 2. Learn words using sight and hearing with DALL·E 2

![image](https://github.com/Medici-Mansion/sullivan-ai/assets/106373580/bed85d13-fd7e-49c6-b856-22f5dd3be0a0)


The second stage is the review stage.

The pictures learned in step 1 are tested with similar, but slightly different images each time through DALL-E's image variation. The test is conducted using voice, and the child's voice is converted into text through Open-Al's whisper model. Let’s explain the learning process in step 2 in deep learning terms: This is to ensure that children learn robustly through data-augmenting to prevent them from over-fitting only the given data.

<br />

### 3. Review with images regenerated differently

![image](https://github.com/Medici-Mansion/sullivan-ai/assets/106373580/37115892-5fed-4a28-a9ef-e7f3e0375143)

Audio-visual review step while checking incorrect and correct answers


