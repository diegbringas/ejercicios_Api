from flask import Flask, flash, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
app.secret_key = 'clavesecretaflash'  


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

    # Ruta principal para mostrar ejercicios y el formulario
@app.route('/')
def index():
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM exercises')
        exercises = cursor.fetchall()
        conn.close()
        return render_template('index.html', exercises=exercises)

    # Ruta para añadir un nuevo ejercicio
@app.route('/add', methods=['POST'])
def add_exercise():
        nombre = request.form['nombre']
        patron = request.form['patron']
        dificultad = request.form['dificultad']
        musculos = ','.join(request.form.getlist('musculos'))

        # Validación en el servidor
        if not nombre or len(nombre) < 3 or len(nombre) > 100:
            flash('El nombre del ejercicio debe tener entre 3 y 100 caracteres.', 'error')
            return redirect(url_for('index'))
        
        if not patron :
            flash('Por favor, selecciona un patron valido.', 'error')
            return redirect(url_for('index'))
        
        if not dificultad:
            flash('Por favor, selecciona una dificultad válida.', 'error')
            return redirect(url_for('index'))
        
        if not musculos:
            flash('Por favor, selecciona una opcion válida.', 'error')
            return redirect(url_for('index'))
        
        musculos_str = ', '.join(musculos)


        # Guardar en la base de datos si la validación es exitosa
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO exercises (nombre, patron, dificultad, musculos) VALUES (?, ?, ?, ?)', 
                    (nombre, patron, dificultad, musculos))
        conn.commit()
        conn.close()
        
        flash('Ejercicio añadido con éxito!', 'success')
        return redirect(url_for('index'))
        
    #ruta para editar 
@app.route('/edit/<int:exercise_id>', methods=['GET', 'POST'])
def edit_exercise(exercise_id):
        conn = connect_db()
        cursor = conn.cursor()

        # Si el formulario se envía con el método POST, actualiza el ejercicio
        if request.method == 'POST':
            nombre = request.form['nombre']
            patron = request.form['patron']
            dificultad = request.form['dificultad']
            musculos = request.form['musculos']

            cursor.execute('''
                UPDATE exercises 
                SET nombre = ?, patron = ?, dificultad = ?, musculos = ? 
                WHERE id = ?
            ''', (nombre, patron, dificultad, musculos,exercise_id))
            conn.commit()
            conn.close()
            return redirect(url_for('index'))
        
        cursor.execute('SELECT * FROM exercises WHERE id = ?', (exercise_id,))
        exercise = cursor.fetchone()
        conn.close()
        return render_template('edit.html', exercise=exercise)

#Get para un ejercicio especifico
    
@app.route('/exercises/<int:exercise_id>', methods=['GET'])
def get_exercise(exercise_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM exercises WHERE id = ?', (exercise_id,))
    exercise = cursor.fetchone()
    conn.close()
    if exercise:
        return render_template('exercise.html', exercise=exercise)
    else:
        flash('Ejercicio no encontrado', 'error')
        return redirect(url_for('index'))


    #ruta para eliminar 
@app.route('/delete/<int:exercise_id>')
def delete_exercise(exercise_id):
        conn = connect_db()
        cursor = conn.cursor()  
        cursor.execute('DELETE FROM exercises where id =?', (exercise_id,))
        
        conn.commit()
        conn.close()

        return redirect(url_for('index'))

    # Manejo del error 404 - Página no encontrada
@app.errorhandler(404)
def page_not_found(e):
        return render_template('404.html'), 404

    # Manejo del error 500 - Error interno del servidor
@app.errorhandler(500)
def internal_server_error(e):
        return render_template('500.html'), 500



    #crear tabla
if __name__ == '__main__':
    init_db()  
    app.run(debug=True)
