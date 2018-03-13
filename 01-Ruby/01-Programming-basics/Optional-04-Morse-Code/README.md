## Background and Objectives

(From [Wikipedia](https://en.wikipedia.org/wiki/Morse_code)) Beginning in 1836, the American artist Samuel F. B. Morse, the American physicist Joseph Henry, and Alfred Vail developed an electrical telegraph system. This system sent pulses of electric current along wires which controlled an electromagnet that was located at the receiving end of the telegraph system. A code was needed to transmit natural language using only these pulses, and the silence between them. Around 1837, Morse, therefore, developed an early forerunner to the modern **International Morse code**.

In this exercise, we'll write a morse code **encoder** and **decoder**. We'll just consider the 26 letters of the English alphabet, ("A" -> "Z") and ignore all other characters (numbers, punctuation, etc.).

### Specs

First, implement the `encode` method which will take text as a parameter and return the Morse sequence for it. Letters of the same word will be separated by a space and words will be separated by a pipe character `|`.

For example, the sentence `"Hi Guys"` should be encoded into `".... ..|--. ..- -.-- ..."`

Once the encoder is working, you can start working on the `decode` method which will do the opposite!

