import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import fitz  # PyMuPDF

def extract_text(path):
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return text

jd_path = sys.argv[1]
resume_paths = sys.argv[2:]

jd_text = extract_text(jd_path)
resumes = [extract_text(path) for path in resume_paths]

vectorizer = TfidfVectorizer(stop_words="english")
vectors = vectorizer.fit_transform([jd_text] + resumes)
similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

results = []
for i, score in enumerate(similarities):
    results.append({
        "name": resume_paths[i].split("/")[-1],
        "score": round(score * 100, 2)
    })

results = sorted(results, key=lambda x: x["score"], reverse=True)

print(json.dumps(results))
