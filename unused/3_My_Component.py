import streamlit as st
from mycomponent import mycomponent

value = mycomponent()

print(value)
if value:
    print(f"Value: {value}")
    for i, line in enumerate(value):
        st.write(f"Value {i+1}: {line}\n")