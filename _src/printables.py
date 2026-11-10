"""One list of printables, used by the student Printable Library (chapters/printables/)
and the Instructor Guide's Printables Library. Files live in downloads/printables/.

BY_MODULE: module number -> [(file stem, label)], Trail Tools first in the order students use them, then the Mile Marker.
STAR: the four STAR(T) Stories fillable forms (built by star_forms.py), used for final submissions.
DOCS: (file stem, label, student note, instructor note, students?) for other course documents.
Never add answer keys: the book is public.
"""
BY_MODULE = {
 1: [('Mile-Marker-1-My-Starting-Point', 'Mile Marker #1: My Starting Point')],
 2: [('Mile-Marker-2-My-Support-Team', 'Mile Marker #2: My Support Team')],
 3: [('Trail-Tool-Where-My-Time-Goes', 'Trail Tool: Where My Time Goes'),
     ('Trail-Tool-My-Week-at-a-Glance', 'Trail Tool: My Week at a Glance'),
     ('Mile-Marker-3-Managing-My-Time-and-Energy', 'Mile Marker #3: Managing My Time &amp; Energy')],
 4: [('Mile-Marker-4-My-Academic-Toolkit', 'Mile Marker #4: My Academic Toolkit')],
 5: [('Trail-Tool-Dollar-Tracker', 'Trail Tool: Dollar Tracker'),
     ('Trail-Tool-Budget-Builder', 'Trail Tool: Budget Builder'),
     ('Mile-Marker-5-Understanding-My-Money', 'Mile Marker #5: Understanding My Money')],
 6: [('Trail-Tool-Academic-Planner', 'Trail Tool: Academic Planner'),
     ('Mile-Marker-6-My-Academic-Plan', 'Mile Marker #6: My Academic Plan')],
 7: [('Mile-Marker-7-My-Strengths-Snapshot', 'Mile Marker #7: My Strengths Snapshot')],
 8: [('Trail-Tool-Career-Research-Guide', 'Trail Tool: Career Research Guide'),
     ('Mile-Marker-8-My-Career-Snapshot', 'Mile Marker #8: My Career Snapshot')],
 9: [('Trail-Tool-4C-Check', 'Trail Tool: 4C Check'),
     ('Mile-Marker-9-Think-It-Through', 'Mile Marker #9: Think It Through')],
 10: [('Trail-Tool-My-Collaboration-Snapshot', 'Trail Tool: Collaboration Snapshot'),
      ('Mile-Marker-10-My-Collaboration-Profile', 'Mile Marker #10: My Collaboration Profile')],
 11: [('Trail-Tool-My-Community-Snapshot', 'Trail Tool: Community Snapshot'),
      ('Mile-Marker-11-My-Community-Impact', 'Mile Marker #11: My Community Impact')],
 12: [('Trail-Tool-My-Look-Back', 'Trail Tool: Look Back'),
      ('Mile-Marker-12-My-Story-to-Share', 'Mile Marker #12: My Story to Share')],
}
STAR = [
 ('STAR-Fillable-Form-Adaptability-and-Leadership', 'Fillable Form: Adaptability &amp; Leadership (#5)'),
 ('STAR-Fillable-Form-Professionalism', 'Fillable Form: Professionalism (#6)'),
 ('STAR-Fillable-Form-Knowledge-Application', 'Fillable Form: Knowledge Application (#9)'),
 ('STAR-Fillable-Form-Your-Choice', 'Fillable Form: Your Choice'),
]
DOCS = [
 ('Discussion-and-Journal-Guidelines', 'Discussion and Journal Guidelines',
  'how discussions and journals work in this course', 'how discussions and journals work, for Module 1', True),
 ('Trail-Tip-Whats-Actually-Happening-in-That-AI-Chat', "Trail Tip: What's Actually Happening in That AI Chat?",
  'a printable copy of the Module 2 Trail Tip', 'a printable copy of the Module 2 Trail Tip', True),
 ('Practice-Source-Is-This-Legit-Article', 'Practice source for the Is This Legit? AI Chat',
  'the fictional research brief you evaluate in Module 4. It is not a real publication.',
  'a fictional research brief students evaluate in Module 4. It is not a real publication.', True),
]
