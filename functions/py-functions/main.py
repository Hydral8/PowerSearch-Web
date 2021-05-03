import requests
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from bs4 import BeautifulSoup, SoupStrainer
from nltk.tokenize import word_tokenize, sent_tokenize
from google.oauth2 import service_account
from google.cloud import language_v1
def hello_world(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    
    ## Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        ## Allows GET requests from any origin with the Content-Type
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    ## Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
   
    request_json = request.get_json()
    if request.args and 'message' in request.args:
        text = scrape_important_words(request.args.get('message'))
        # 1 Create the word frequency table
        freq_table = _create_frequency_table(text)
        # 2 Tokenize the sentences
        sentences = sent_tokenize(text)
        # 3 Important Algorithm: score the sentences
        sentence_scores = _score_sentences(sentences, freq_table)
        # 4 Find the threshold
        threshold = _find_average_score(sentence_scores)
        # 5 Important Algorithm: Generate the summary
        summary = _generate_summary(sentences, sentence_scores, 1.5 * threshold)

        response, entittiesList = sample_analyze_entities(text)

        wiki = findAllWikiLinks(response)
        wikiString = ""
        for i in wiki:
            wikiString+=str(i)+";"

        entitiesString = ""
        for i in entittiesList:
            entitiesString+=str(i)+";"


        language, score, magnitude = sample_analyze_entity_sentiment(text)
        
        
        res = summary + "---" + wikiString + "---" + str(entitiesString) + "---" + str(language) + "---" + str(score) + "---" +  str(magnitude)
        return (res, 200, headers)
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return f'Hello World!'


def findAllWikiLinks(a):
    wikiLIST = []
    for i in a.entities:
        for value, key in i.metadata.items():
            if value == "wikipedia_url":
                wikiLIST.append(key)
    return wikiLIST


def scrape_important_words(url):
    """Soups HTML from given url.
    Args:
        url (str): Url to scrape web content from.
    """
    req = requests.get(url=url)
    bs = BeautifulSoup(markup=req.text)
    # print(bs)
    
    # tags to consider that may contain important words in website
    important_tags = list(['title', 'head', 'thead', 'h1', 'h2', 'h3', 'h4', 'p'])
    
    important_tags_text = [tag.text for tag in bs.find_all(name=important_tags)]
    important_tags_textblock = '\n'.join(important_tags_text)
    print(important_tags_textblock)
    return important_tags_textblock
def _find_average_score(sentenceValue) -> int:
    sumValues = 0
    for entry in sentenceValue:
        sumValues += sentenceValue[entry]

    # Average value of a sentence from original text
    average = int(sumValues / len(sentenceValue))

    return average
def _generate_summary(sentences, sentenceValue, threshold):
    sentence_count = 0
    summary = ''
    for sentence in sentences:
        if sentence[:10] in sentenceValue and sentenceValue[sentence[:10]] > (threshold):
            summary += " " + sentence
            sentence_count += 1

    return summary
def _score_sentences(sentences, freqTable) -> dict:
    sentenceValue = dict()

    for sentence in sentences:
        word_count_in_sentence = (len(word_tokenize(sentence)))
        for wordValue in freqTable:
            if wordValue in sentence.lower():
                if sentence[:10] in sentenceValue:
                    sentenceValue[sentence[:10]] += freqTable[wordValue]
                else:
                    sentenceValue[sentence[:10]] = freqTable[wordValue]

        sentenceValue[sentence[:10]] = sentenceValue[sentence[:10]] // word_count_in_sentence

    return sentenceValue
def _create_frequency_table(text_string) -> dict:

    stopWords = set(stopwords.words("english"))
    words = word_tokenize(text_string)
    ps = PorterStemmer()

    freqTable = dict()
    for word in words:
        word = ps.stem(word)
        if word in stopWords:
            continue
        if word in freqTable:
            freqTable[word] += 1
        else:
            freqTable[word] = 1

    return freqTable
def sample_analyze_entity_sentiment(text_content):

    keyDIR = "key.json"
    credentials = service_account.Credentials.from_service_account_file(keyDIR)
    client = language_v1.LanguageServiceClient(credentials=credentials)

    # text_content = 'Grapes are good. Bananas are bad.'

    # Available types: PLAIN_TEXT, HTML
    type_ = language_v1.Document.Type.PLAIN_TEXT

    # Optional. If not specified, the language is automatically detected.
    # For list of supported languages:
    # https://cloud.google.com/natural-language/docs/languages
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_entity_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    # Loop through entitites returned from the API
    magnitude = 0.0
    score = 0.0
    
    for entity in response.entities:
        sentiment = entity.sentiment
        score =  sentiment.score
        magnitude = sentiment.magnitude
        
    return response.language, score, magnitude

def sample_analyze_entities(text_content):
    keyDIR = "key.json"
    credentials = service_account.Credentials.from_service_account_file(keyDIR)
    client = language_v1.LanguageServiceClient(credentials=credentials)
    # Available types: PLAIN_TEXT, HTML
    type_ = language_v1.Document.Type.PLAIN_TEXT

    # Optional. If not specified, the language is automatically detected.
    # For list of supported languages:
    # https://cloud.google.com/natural-language/docs/languages
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_entities(request = {'document': document, 'encoding_type': encoding_type})
    entittiesList = []
    # Loop through entitites returned from the API
    for entity in response.entities:
        entittiesList.append(entity.name)

    # Get the language of the text, which will be the same as
    # the language specified in the request or, if not specified,
    # the automatically-detected language.
    #print(u"Language of the text: {}".format(response.language))
    return response, entittiesList