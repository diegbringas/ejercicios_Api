from flask import Flask, jsonify, request, abort
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Función para conectarse a la base de datos
def connect_db():
    conn = sqlite3.connect('exercises.db')
    return conn

def init_db():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            patron TEXT NOT NULL,
            dificultad TEXT NOT NULL,
            musculos TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Ruta para obtener todos los ejercicios (GET)
@app.route('/exercises', methods=['GET'])
def get_exercises():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM exercises')
    exercises = cursor.fetchall()
    conn.close()

    # Convertir los resultados a JSON
    exercises_list = []
    for exercise in exercises:
        exercise_data = {
            'id': exercise[0],
            'nombre': exercise[1],
            'patron': exercise[2],
            'dificultad': exercise[3],
            'musculos': exercise[4]
        }
        exercises_list.append(exercise_data)
    
    return jsonify(exercises_list)

# Ruta para obtener un ejercicio específico (GET)
@app.route('/exercises/<int:exercise_id>', methods=['GET'])
def get_exercise(exercise_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM exercises WHERE id = ?', (exercise_id,))
    exercise = cursor.fetchone()
    conn.close()
    
    if exercise is None:
        abort(404)

    exercise_data = {
        'id': exercise[0],
        'nombre': exercise[1],
        'patron': exercise[2],
        'dificultad': exercise[3],
        'musculos': exercise[4]
    }
    
    return jsonify(exercise_data)

# Ruta para añadir un nuevo ejercicio (POST)
@app.route('/exercises', methods=['POST'])
def add_exercise():
    if not request.json or not 'nombre' in request.json:
        abort(400)
    
    new_exercise = {
        'nombre': request.json['nombre'],
        'patron': request.json.get('patron', ""),
        'dificultad': request.json.get('dificultad', ""),
        'musculos': request.json.get('musculos', "")
    }

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO exercises (nombre, patron, dificultad, musculos) 
        VALUES (?, ?, ?, ?)
    ''', (new_exercise['nombre'], new_exercise['patron'], 
          new_exercise['dificultad'], new_exercise['musculos']))
    
    conn.commit()
    new_exercise_id = cursor.lastrowid
    conn.close()

    new_exercise['id'] = new_exercise_id
    return jsonify(new_exercise), 201

# Ruta para actualizar un ejercicio (PUT)
@app.route('/exercises/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    if not request.json:
        abort(400)

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM exercises WHERE id = ?', (exercise_id,))
    exercise = cursor.fetchone()
    if exercise is None:
        abort(404)
    
    updated_exercise = {
        'nombre': request.json.get('nombre', exercise[1]),
        'patron': request.json.get('patron', exercise[2]),
        'dificultad': request.json.get('dificultad', exercise[3]),
        'musculos': request.json.get('musculos', exercise[4])
    }

    cursor.execute('''
        UPDATE exercises 
        SET nombre = ?, patron = ?, dificultad = ?, musculos = ? 
        WHERE id = ?
    ''', (updated_exercise['nombre'], updated_exercise['patron'], 
          updated_exercise['dificultad'], updated_exercise['musculos'], exercise_id))

    conn.commit()
    conn.close()

    return jsonify(updated_exercise)

# Ruta para eliminar un ejercicio (DELETE)
@app.route('/exercises/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM exercises WHERE id = ?', (exercise_id,))
    exercise = cursor.fetchone()
    if exercise is None:
        abort(404)

    cursor.execute('DELETE FROM exercises WHERE id = ?', (exercise_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Ejercicio eliminado exitosamente'})

# Manejo del error 404 - No encontrado
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'No encontrado'}), 404

# Manejo del error 400 - Solicitud incorrecta
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Solicitud incorrecta'}), 400

# Iniciar la base de datos y correr la app
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
