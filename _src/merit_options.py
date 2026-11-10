"""Merit on-demand options, shown on chapters/merit/on-demand.html.

EDIT THIS LIST EACH TERM. Keep entries timeless (no dates or points). Each entry:
  title    - name of the option
  who      - who offers it
  what     - one sentence on what it is
  how      - how a student finds or starts it
  proof    - what the student attaches to their Merit submission
  link     - (optional) URL; the title becomes the link and opens in a new tab
  linktext - (unused now; kept for reference)
  topic    - group heading the card sits under (cards group in the order topics first appear)
  time     - (optional) rough length, e.g. 'About 2 hours'
Keep 'what' to one sentence so the list stays scannable; 'how' and 'proof' sit behind a toggle.
"""
OPTIONS = [
    dict(title='Career Services workshops', topic='Career readiness',
         who='OCTC Career Services',
         what='Workshops each semester on resumes, interviewing, and career readiness. Some are virtual or on demand.',
         how="Check the current Merit listing your instructor posts in Blackboard for this semester's workshops and how to join them.",
         proof='A screenshot, confirmation email, or certificate of completion.',
         link='https://owensboro.kctcs.edu/current-students/experiential-learning-center/index.aspx',
         linktext='OCTC Career Services'),
    dict(title='KOOL Online Orientation', topic='Learning online',
         who='KCTCS',
         what='A self-paced orientation to learning online, built for students across KCTCS.',
         how='It\'s inside Blackboard, so sign in to Blackboard first. Then select the orientation\'s name to open it and work through it start to finish.',
         proof='A screenshot of the last screen of the orientation.',
         link='https://alt-5beddfe10b70f.blackboard.com/bbcswebdav/institution/KOOL_Training/Student%20Orientation/content/index.html?one_hash=ACD7EA11670AA61E8BE57DCCCDFC0042&amp;f_hash=13455CECB6D1CBCDC3FF1CAE187CD407#/',
         linktext='Start the KOOL Online Orientation'),
    dict(title='GenAI Literacy 101 for Students', topic='AI literacy', time='About 2 hours',
         who='AI for Education',
         what='Five short, free lessons on how generative AI works, prompting it well, spotting its mistakes, and writing your own code for using it.',
         how='Select the course name to open its page, then select Enroll Now. It is free.',
         proof='A screenshot of your completed course, or your certificate if one is offered.',
         link='https://www.aiforeducation.io/genai-literacy-101-for-students-course',
         linktext='Go to GenAI Literacy 101 for Students'),
]
