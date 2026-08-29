import pytest
from nexus_backend.services.language_detector import language_detector
from nexus_backend.services.intent_detector import intent_detector
from nexus_backend.services.context_manager import context_manager
from nexus_backend.services.response_validator import response_validator
from nexus_backend.ai.smart_responder import smart_responder


def test_language_detection():
    # 1. English
    res_en = language_detector.detect_language("I want to book an appointment for tomorrow.")
    assert res_en.language == "english"

    # 2. Tanglish (Romanized Telugu)
    res_tan = language_detector.detect_language("Naku appointment book cheyyali please")
    assert res_tan.language == "tanglish"

    # 3. Telugu Script
    res_te = language_detector.detect_language("నాకు appointment book చేయాలి")
    assert res_te.language == "telugu"


def test_intent_detection():
    # 1. Greeting
    res_g = intent_detector.detect_intent("hi ! how r u")
    assert res_g.intent == "greeting"

    # 2. Appointment Booking
    res_b = intent_detector.detect_intent("Naku appointment book cheyyali")
    assert res_b.intent == "appointment_booking"

    # 3. Code Request
    res_c = intent_detector.detect_intent("write a python async function")
    assert res_c.intent == "code_request"

    # 4. Follow Up Memory
    history = [{"role": "user", "content": "Explain React"}, {"role": "assistant", "content": "React is a JS library for UI."}]
    res_f = intent_detector.detect_intent("give me an example", past_messages=history)
    assert res_f.intent == "follow_up"


def test_smart_responder_multilingual():
    # 1. Tanglish Appointment Query
    reply_tan = smart_responder.generate_smart_response("Naku appointment book cheyyali")
    assert "Appointment Book" in reply_tan or "Appointment" in reply_tan
    assert "NexusAI Assistant powered by gpt-4o... You can ask me to" not in reply_tan

    # 2. Tanglish Greeting Query
    reply_greet = smart_responder.generate_smart_response("hi ! how r u")
    assert "NexusAI Assistant powered by gpt-4o... You can ask me to" not in reply_greet
    assert "bagunnanu" in reply_greet.lower() or "doing great" in reply_greet.lower()

    # 3. Follow Up Query with Memory
    history = [{"role": "user", "content": "Explain React"}, {"role": "assistant", "content": "React is a UI framework."}]
    reply_followup = smart_responder.generate_smart_response("give me an example", messages_history=history)
    assert "React" in reply_followup or "Component" in reply_followup


def test_response_validation():
    lang_res = language_detector.detect_language("hi ! how r u")
    intent_res = intent_detector.detect_intent("hi ! how r u")

    # Generic template dump on greeting query should fail validation
    bad_template = "Hello! I am **NexusAI Assistant** powered by gpt-4o. How can I help you today? You can ask me to: - Write Code & Refactor"
    val = response_validator.validate_response("hi ! how r u", bad_template, lang_res, intent_res)
    assert val.is_valid is False
    assert val.suggested_fix == "conversational_greeting"
